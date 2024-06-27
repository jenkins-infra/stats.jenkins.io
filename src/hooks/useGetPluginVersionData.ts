import { useState, useEffect } from 'react'
import axios from 'axios'
import { VersionData } from '../data/plugins'

const fetchVersionData = async (pluginId: string): Promise<VersionData | null> => {
    const url = `https://raw.githubusercontent.com/jenkins-infra/infra-statistics/gh-pages/pluginversions/${pluginId}.html`
    try {
        const response = await axios.get(url)
        const htmlContent = response.data

        const parser = new DOMParser()
        const doc = parser.parseFromString(htmlContent, 'text/html')
        const scriptTags = doc.querySelectorAll('script')

        for (const script of scriptTags) {
            const scriptContent = script.textContent
            if (scriptContent) {
                const match = scriptContent.match(/var\s+versionData\s*=\s*(\{[\s\S]*?\});/)
                if (match) {
                    console.log(`Version data found for plugin ${pluginId}.`)
                    return JSON.parse(match[1])
                }
            }
        }

        console.log(`Version data not found for plugin ${pluginId}.`)
        return null
    } catch (error) {
        console.error(`Error fetching version data for plugin ${pluginId}:`, error)
        return null
    }
}

const useGetPluginVersionData = (pluginId: string | null) => {
    const [versionData, setVersionData] = useState<VersionData | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (pluginId) {
            const fetchData = async () => {
                setLoading(true)
                try {
                    const data = await fetchVersionData(pluginId)
                    setVersionData(data)
                } catch (error) {
                    console.error(`Error fetching plugin version data: ${error}`)
                } finally {
                    setLoading(false)
                }
            }

            fetchData()
        } else {
            setVersionData(null) // Clear version data when no plugin is selected
        }
    }, [pluginId])

    return { versionData, loading }
}

export default useGetPluginVersionData
