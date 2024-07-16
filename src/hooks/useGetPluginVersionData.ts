import { useState, useEffect } from 'react'
<<<<<<< HEAD
import { jsonFileMapping } from '../utils/dataLoader'
import { PluginVersionData, VersionData } from '../types/types'
=======
import { PluginVersionData, VersionData } from '../types/types'
import rawPluginVersionData from '../data/infra-statistics/plugin-installation-trend/jenkins-version-per-plugin-version.json'

>>>>>>> 87bf2144f3da362b0e127ab227849e407ca11067

// Casting jsonFileMapping entry to PluginVersionData
const pluginVersionData = JSON.parse(jsonFileMapping['jenkins-version-per-plugin-version.json']) as PluginVersionData

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
