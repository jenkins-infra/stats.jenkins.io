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

// dependency graph types

export interface Dependency {
    name: string
    optional: boolean
    version: string
}

export interface Developer {
    developerId: string
    name: string
}

export interface IssueTracker {
    reportUrl: string
    type: string
    viewUrl: string
}

export interface PluginNode {
    buildDate: string
    defaultBranch?: string
    dependencies: Dependency[]
    developers: Developer[]
    excerpt: string
    gav: string
    issueTrackers?: IssueTracker[]
    labels: string[]
    name: string
    popularity: number
    previousTimestamp?: string
    previousVersion?: string
    releaseTimestamp: string
    requiredCore: string
    scm?: string
    sha1: string
    sha256: string
    size: number
    title: string
    url: string
    version: string
    wiki: string
}

export interface PluginData {
    plugins: {
        [key: string]: PluginNode
    }
}
