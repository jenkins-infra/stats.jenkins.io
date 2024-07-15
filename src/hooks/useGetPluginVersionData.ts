import { useState, useEffect } from 'react'
import { PluginVersionData, VersionData } from '../types/types'
import rawPluginVersionData from '../data/infra-statistics/plugin-installation-trend/jenkins-version-per-plugin-version.json'

const pluginVersionData = rawPluginVersionData as PluginVersionData

const useGetPluginVersionData = (pluginId: string | null) => {
    const [versionData, setVersionData] = useState<VersionData | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (pluginId) {
            const fetchData = async () => {
                setLoading(true)
                try {
                    const data = pluginVersionData[pluginId]
                    if (!data) {
                        throw new Error(`Version data not found for plugin "${pluginId}"`)
                    }
                    setVersionData(data)
                } catch (error) {
                    console.error(`Error fetching version data for plugin ${pluginId}:`, error)
                    setVersionData(null)
                } finally {
                    setLoading(false)
                }
            }

            fetchData()
        } else {
            setVersionData(null)
        }
    }, [pluginId])

    return { versionData, loading }
}

export default useGetPluginVersionData
