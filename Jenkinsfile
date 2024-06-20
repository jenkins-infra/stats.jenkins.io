pipeline {
  options {
    timeout(time: 60, unit: 'MINUTES')
    ansiColor('xterm')
    disableConcurrentBuilds(abortPrevious: true)
    buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '5', numToKeepStr: '5')
  }

  agent {
    label 'linux-arm64-docker || arm64linux'
  }

  stages {
    stage('Check for typos') {
      steps {
        sh 'typos --format json | typos-checkstyle - > checkstyle.xml || true'
      }
      post {
        always {
          recordIssues(tools: [checkStyle(id: 'typos', name: 'Typos', pattern: 'checkstyle.xml')])
        }
      }
    }

    stage('Install dependencies') {
      steps {
        sh '''
        asdf install
        npm install
        '''
      }
    }

    stage('Lint') {
      steps {
        sh '''
        npm run lint
        '''
      }
    }

    stage('Build') {
      steps {
        sh '''
        npm run build
        '''
      }
    }

    stage('Deploy PR to preview site') {
      when {
        allOf{
          changeRequest target: 'main'
          // Only deploy from infra.ci.jenkins.io
          expression { infra.isInfra() }
        }
      }
      environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-auth-token')
      }
      steps {
        sh 'netlify-deploy --draft=true --siteName "stats-jenkins-io" --title "Preview deploy for ${CHANGE_ID}" --alias "deploy-preview-${CHANGE_ID}" -d ./dist'
      }
      post {
        success {
          recordDeployment('jenkins-infra', 'stats.jenkins.io', pullRequest.head, 'success', "https://deploy-preview-${CHANGE_ID}--stats-jenkins-io.netlify.app")
        }
        failure {
          recordDeployment('jenkins-infra', 'stats.jenkins.io', pullRequest.head, 'failure', "https://deploy-preview-${CHANGE_ID}--stats-jenkins-io.netlify.app")
        }
      }
    }

    stage('Deploy to production') {
      when {
        allOf{
          expression { env.BRANCH_IS_PRIMARY }
          // Only deploy from infra.ci.jenkins.io
          expression { infra.isInfra() }
        }
      }
      steps {
        script {
          infra.withFileShareServicePrincipal([
            servicePrincipalCredentialsId: 'infraci-stats-jenkins-io-fileshare-service-principal-writer',
            fileShare: 'stats-jenkins-io',
            fileShareStorageAccount: 'statsjenkinsio'
          ]) {
            sh '''
            # Synchronize the File Share content
            set +x
            azcopy sync \
              --skip-version-check \
              --recursive=true \
              --delete-destination=true \
              ./dist/ "${FILESHARE_SIGNED_URL}"
            '''
          }
        }
      }
    }
  }
}
