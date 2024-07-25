export type GraphType =
    | 'jenkins'
    | 'jobs'
    | 'nodes'
    | 'nodesPie'
    | 'plugins'
    | 'top-plugins1000'
    | 'top-plugins2500'
    | 'top-plugins500'
    | 'total-executors'

export type SortOption = 'alphabetical' | 'downloadsHighToLow' | 'downloadsLowToHigh'

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
export interface AllPluginVersionData {
    [pluginId: string]: VersionData
}

export interface Plugin {
    id: string
}

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
            opacity: number
        }[]
        total: number
        totalTitle: string
    }[]
    totalInstalls: number
}
