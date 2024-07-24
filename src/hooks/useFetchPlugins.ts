import { useState, useEffect } from 'react'
import { IPluginData } from '../types/types'
import useGetPluginNames from './useGetPluginNamesAndCount'

const BATCH_SIZE = 100

const useFetchPlugins = () => {
    const [plugins, setPlugins] = useState<IPluginData[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const { pluginNames } = useGetPluginNames()

    useEffect(() => {
        const fetchPluginsInBatch = async (batch: string[]) => {
            const pluginData = await Promise.all(
                batch.map(async (name) => {
                    const fileUrl = new URL(
                        `../data/infra-statistics/plugin-installation-trend/${name}.stats.json`,
                        import.meta.url
                    ).href
                    const response = await fetch(fileUrl)
                    if (!response.ok) {
                        throw new Error(`JSON file for plugin with id "${name}" not found`)
                    }
                    const chartData = await response.json()
                    return { id: name, chartData }
                })
            )
            return pluginData
        }

        const fetchAllPlugins = async () => {
            setLoading(true)
            try {
                const allPlugins: IPluginData[] = []
                const fetchedIds = new Set<string>()
                for (let i = 0; i < pluginNames.length; i += BATCH_SIZE) {
                    const batch = pluginNames.slice(i, i + BATCH_SIZE)
                    const batchData = await fetchPluginsInBatch(batch)
                    batchData.forEach((plugin) => {
                        if (!fetchedIds.has(plugin.id)) {
                            fetchedIds.add(plugin.id)
                            allPlugins.push(plugin)
                        }
                    })
                    setPlugins([...allPlugins])
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error fetching plugin data', error)
            } finally {
                setLoading(false)
            }
        }

        if (pluginNames.length > 0) {
            fetchAllPlugins()
        } else {
            setLoading(false)
        }
    }, [pluginNames])

    return { plugins, loading }
}

export default useFetchPlugins
