import { useState, useEffect } from 'react'
import { IPluginData } from '../data/plugins'
import { jsonFileMapping } from '../utils/dataLoader'
import useGetPluginNames from './useGetPluginNames'

const useFetchPlugins = () => {
    const [plugins, setPlugins] = useState<IPluginData[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const { pluginNames } = useGetPluginNames()

    useEffect(() => {
        const fetchPluginList = async () => {
            try {
                const pluginData = pluginNames.map((name) => {
                    const jsonText = jsonFileMapping[name]
                    if (!jsonText) {
                        throw new Error(`JSON file for plugin with id "${name}" not found`)
                    }
                    const chartData = JSON.parse(jsonText)
                    return { id: name, chartData }
                })
                setPlugins(pluginData)
            } catch (error) {
                console.error('Error fetching plugin data', error)
            } finally {
                setLoading(false)
            }
        }

        if (pluginNames.length > 0) {
            fetchPluginList()
        }
    }, [pluginNames])

    return { plugins, loading }
}

export default useFetchPlugins
