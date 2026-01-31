import { useState, useEffect } from 'react'
import { PluginData, PluginNode } from '../types/types'

const usePluginData = () => {
    const [plugins, setPlugins] = useState<PluginNode[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPlugins = async () => {
            try {
                const fileUrl = `/infra-statistics/update-center.actual.json`
                const response = await fetch(fileUrl)
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data: PluginData = (await response.json()) as PluginData

                const pluginArray = Object.keys(data.plugins).map((key) => {
                    const plugin = data.plugins[key]
                    return {
                        ...plugin,
                        defaultBranch: plugin.defaultBranch || 'N/A',
                        scm: plugin.scm || 'N/A',
                        issueTrackers: plugin.issueTrackers || [],
                    }
                })

                setPlugins(pluginArray)
            } catch (error) {
                setError((error as Error).message)
            } finally {
                setLoading(false)
            }
        }

        fetchPlugins()
    }, [])

    return { plugins, loading, error }
}

export default usePluginData
