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

  environment {
    INFRASTATISTICS_LOCATION = 'src/data/infra-statistics'
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

    stage('Retrieve data from infra-statistics') {
      steps {
        sh './retrieve-infra-statistics-data.sh'
      }
    }

    stage('Build') {
      steps {
        sh '''
        npm run build
        '''
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
