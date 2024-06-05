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

export type Plugin = {
    id: string
}

export const pluginList: Plugin[] = [
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
]
