import { useState, useEffect } from 'react'
import latestNumbers from '../data/infra-statistics/plugin-installation-trend/latestNumbers.json'

const useGetPluginNames = () => {
    const [pluginNames, setPluginNames] = useState<string[]>([])

    useEffect(() => {
        const fetchPluginNames = () => {
            try {
                const plugins = latestNumbers.plugins
                if (plugins) {
                    const names = Object.keys(plugins)
                    setPluginNames(names)
                } else {
                    console.error('Plugins data not found')
                }
            } catch (error) {
                console.error('Error processing plugin data', error)
            }
        }
        fetchPluginNames()
    }, [])

    return { pluginNames }
}

export default useGetPluginNames
