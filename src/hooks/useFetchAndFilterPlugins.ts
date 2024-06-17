// useSearchPlugins.ts
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { pluginList, IPluginData } from '../data/plugins'

const useSearchPlugins = (searchTerm: string) => {
    const [plugins, setPlugins] = useState<IPluginData[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchPluginList = async () => {
            try {
                const pluginDataPromises = pluginList.map((plugin) => {
                    const url = `https://raw.githubusercontent.com/jenkins-infra/infra-statistics/gh-pages/plugin-installation-trend/${plugin.id}.stats.json`
                    return axios.get(url).then((response) => ({ ...plugin, chartData: response.data }))
                })
                const pluginData = await Promise.all(pluginDataPromises)
                setPlugins(pluginData)
            } catch (error) {
                console.error('Error fetching plugin data', error)
            } finally {
                setLoading(false)
            }
        }
        fetchPluginList()
    }, [])

    const filteredPlugins = useMemo(() => {
        return plugins.filter((plugin) => plugin.id.toLowerCase().includes(searchTerm.toLowerCase()))
    }, [searchTerm, plugins])

    return { filteredPlugins, loading }
}

export default useSearchPlugins
