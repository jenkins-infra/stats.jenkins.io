export interface IPluginData {
    id: string
    chartData?: {
        name: string
        installations: { [timestamp: string]: number }
        installationsPercentage: { [timestamp: string]: number }
        installationsPerVersion: { [version: string]: number }
        installationsPercentagePerVersion: { [version: string]: number }
    }
}

export interface PluginChartProps {
    data?: IPluginData['chartData']
}

export interface VersionData {
    [pluginVersion: string]: {
        [coreVersion: string]: number
    }
}

export interface Plugin {
    id: string
}

// data/plugins.ts

export interface ParsedData {
    name: string
    pluginVersions: string[]
    coreVersions: string[]
    rows: {
        coreVersion: string
        cells: {
            version: string
            count: number
            title: string
            opacity: number // Make sure to include opacity in the type
        }[]
        total: number
        totalTitle: string // Add totalTitle property
    }[]
    totalInstalls: number
}

export const pluginList: { id: string }[] = [
    { id: '42crunch-security-audit' },
    { id: 'AdaptivePlugin' },
    { id: 'AnchorChain' },
    { id: 'AntepediaReporter-CI-plugin' },
    { id: 'ApicaLoadtest' },
    { id: 'BlameSubversion' },
    { id: 'BlazeMeterJenkinsPlugin' },
    { id: 'CFLint' },
    { id: 'ChatRoom' },
    { id: 'ColumnPack-plugin' },
    { id: 'ColumnsPlugin' },
    { id: 'ConfigurationSlicing' },
    { id: 'CustomHistory' },
    { id: 'DotCi-DockerPublish' },
    { id: 'DotCi-Fig-template' },
    { id: 'DotCi-InstallPackages' },
    { id: 'DotCi-Plugins-Starter-Pack' },
    { id: 'cloudbees-bitbucket-branch-source' },
    { id: 'Exclusion' },
    { id: 'GatekeeperPlugin' },
    { id: 'HiddenParameter' },
    { id: 'JDK_Parameter_Plugin' },
    { id: 'JiraTestResultReporter' },
    { id: 'Matrix-sorter-plugin' },
    { id: 'NegotiateSSO' },
    { id: 'Office-365-Connector' },
    { id: 'Parameterized-Remote-Trigger' },
    { id: 'PrioritySorter' },
    { id: 'SBuild' },
    { id: 'SCTMExecutor' },
    { id: 'SSSCM' },
    { id: 'StashBranchParameter' },
    { id: 'Surround-SCM-plugin' },
    { id: 'TestComplete' },
    { id: 'TestFairy' },
    { id: 'TestResultsAnalyzer' },
    { id: 'TwilioNotifier' },
    { id: 'URLSCM' },
    { id: 'abap-ci' },
    { id: 'absint-a3' },
    { id: 'absint-astree' },
    { id: 'accelerated-build-now-plugin' },
    { id: 'accelq-ci-connect' },
    { id: 'accurev' },
    { id: 'ace-editor' },
    { id: 'active-directory' },
    { id: 'acunetix' },
    { id: 'acunetix-360-scan' },
    { id: 'adaptive-disconnector' },
    { id: 'add-changes-to-build-changelog' },
    { id: 'additional-identities-plugin' },
    { id: 'additional-metrics' },
    { id: 'adobe-cloud-manager' },
    { id: 'adoptopenjdk' },
    { id: 'advanced-installer-msi-builder' },
    { id: 'agent-loadbalance' },
    { id: 'agent-maintenance' },
    { id: 'agent-server-parameter' },
]
