import { useState, useEffect } from 'react'
import latestNumbers from '../data/infra-statistics/plugin-installation-trend/latestNumbers.json'

const usePluginCount = () => {
    const [pluginCount, setPluginCount] = useState<number>(0)

    useEffect(() => {
        const fetchPluginCount = () => {
            try {
                const plugins = latestNumbers.plugins
                if (plugins) {
                    const count = Object.keys(plugins).length
                    setPluginCount(count)
                } else {
                    console.error('Plugins data not found')
                }
            } catch (error) {
                console.error('Error processing plugin data', error)
            }
        }
        fetchPluginCount()
    }, [])

    return { pluginCount }
}

export default usePluginCount

// import { useState, useEffect } from 'react'
// import axios from 'axios'

// const usePluginCount = () => {
//     const [pluginCount, setPluginCount] = useState<number>(0)

//     useEffect(() => {
//         const fetchPluginCount = async () => {
//             try {
//                 const url = `https://stats.jenkins.io/plugin-installation-trend/latestNumbers.json`
//                 const response = await axios.get(url)

//                 const plugins = response.data.plugins
//                 if (plugins) {
//                     const count = Object.keys(plugins).length
//                     setPluginCount(count)
//                 } else {
//                     console.error('Plugins data not found')
//                 }
//             } catch (error) {
//                 console.error('Error fetching plugin data', error)
//             }
//         }
//         fetchPluginCount()
//     }, [])

//     return { pluginCount }
// }

// export default usePluginCount
