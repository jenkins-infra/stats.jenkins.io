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

export const pluginList: Plugin[] = [
    {
        id: '42crunch-security-audit',
    },
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
]
