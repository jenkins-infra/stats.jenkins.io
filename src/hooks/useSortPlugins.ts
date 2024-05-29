import { useState } from 'react'
import { IPluginData } from '../data/plugins'

type SortOption = 'alphabetical' | 'downloads'

const useSortPlugins = (plugins: IPluginData[]) => {
    const [sortOption, setSortOption] = useState<SortOption>('alphabetical')

    const sortedPlugins = plugins.sort((a, b) => {
        if (sortOption === 'alphabetical') {
            return a.id.localeCompare(b.id)
        } else if (sortOption === 'downloads') {
            const aDownloads = a.chartData
                ? Object.values(a.chartData.installations).reduce((acc, val) => acc + val, 0)
                : 0
            const bDownloads = b.chartData
                ? Object.values(b.chartData.installations).reduce((acc, val) => acc + val, 0)
                : 0
            return bDownloads - aDownloads
        }
        return 0
    })

    return { sortedPlugins, sortOption, setSortOption }
}

export default useSortPlugins
