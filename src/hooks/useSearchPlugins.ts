import { useMemo } from 'react'
import { IPluginData } from '../types/types'

const useSearchPlugins = (plugins: IPluginData[], searchTerm: string) => {
    const filteredPlugins = useMemo(() => {
        return plugins.filter((plugin) => plugin.id.toLowerCase().includes(searchTerm.toLowerCase()))
    }, [searchTerm, plugins])

    return { filteredPlugins }
}

export default useSearchPlugins
