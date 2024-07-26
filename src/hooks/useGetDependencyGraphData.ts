import { useState, useEffect } from 'react'
import pluginData from '../data/infra-statistics/update-center.actual.json'
import { PluginData, Plugin } from '../types/types'

const usePluginData = () => {
    const [plugins, setPlugins] = useState<Plugin[]>([])

    useEffect(() => {
        const fetchPlugins = () => {
            const data: PluginData = pluginData as PluginData
            const pluginArray = Object.keys(data.plugins).map((key) => ({ ...data.plugins[key] }))
            setPlugins(pluginArray)
        }

        fetchPlugins()
    }, [])

    return plugins
}

export default usePluginData
