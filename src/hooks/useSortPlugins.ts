import { useState } from 'react'
import { IPluginData } from '../data/plugins'
import { SortOption } from '../data/types'

const useSortPlugins = (plugins: IPluginData[]) => {
    const [sortOption, setSortOption] = useState<SortOption>('alphabetical')

    const sortedPlugins = plugins.sort((a, b) => {
        if (sortOption === 'alphabetical') {
            return a.id.localeCompare(b.id)
        } else if (sortOption === 'downloadsHighToLow') {
            const aDownloads = a.chartData
                ? Object.values(a.chartData.installations).reduce((acc, val) => acc + val, 0)
                : 0
            const bDownloads = b.chartData
                ? Object.values(b.chartData.installations).reduce((acc, val) => acc + val, 0)
                : 0
            return bDownloads - aDownloads
        } else if (sortOption === 'downloadsLowToHigh') {
            const aDownloads = a.chartData
                ? Object.values(a.chartData.installations).reduce((acc, val) => acc + val, 0)
                : 0
            const bDownloads = b.chartData
                ? Object.values(b.chartData.installations).reduce((acc, val) => acc + val, 0)
                : 0
            return aDownloads - bDownloads
        }
        return 0
    })

    return { sortedPlugins, sortOption, setSortOption }
}

export default useSortPlugins
