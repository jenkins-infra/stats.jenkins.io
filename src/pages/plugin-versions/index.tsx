import React, { useState, useEffect } from 'react'
import { Stack, Box, Paper } from '@mui/material'
import { pluginList, Plugin, ParsedData } from '../../data/plugins'
import PluginSidebar from '../../components/PluginVersions/PluginSidebar'
import PluginVersionsTable from '../../components/PluginVersions/PluginVersionsTable'
import { parseData } from './parseData'
import useGetPluginVersionData from '../../hooks/useGetPluginVersionData'

const PluginTable: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null)
    const [parsedData, setParsedData] = useState<ParsedData | null>(null)
    const { versionData, loading } = useGetPluginVersionData(selectedPlugin ? selectedPlugin.id : null)

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleAutocompleteChange = (_event: unknown, value: string | null) => {
        setSearchTerm(value || '')
    }

    const handlePluginSelect = (pluginId: string) => {
        const plugin = pluginList.find((p) => p.id === pluginId) || null
        setSelectedPlugin(plugin)
    }

    useEffect(() => {
        if (selectedPlugin && versionData) {
            const data = parseData(versionData, selectedPlugin.id)
            setParsedData(data)
        } else {
            setParsedData(null)
        }
    }, [selectedPlugin, versionData])

    const filteredPlugins = pluginList.filter((plugin) => plugin.id.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <Stack
            sx={{
                backgroundColor: '#f0f0f0',
                flexDirection: 'row',
                height: '100vh',
                width: '100vw',
                overflow: 'hidden',
            }}
        >
            <PluginSidebar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                handleAutocompleteChange={handleAutocompleteChange}
                filteredPlugins={filteredPlugins}
                onPluginSelect={handlePluginSelect}
            />
            <Box
                sx={{
                    padding: '2rem',
                    overflow: 'hidden',
                }}
            >
                <Paper elevation={16}>
                    <PluginVersionsTable parsedData={parsedData!} loading={loading} selectedPlugin={selectedPlugin} />
                </Paper>
            </Box>
        </Stack>
    )
}

export default PluginTable

// import React, { useState, useEffect } from 'react'
// import { Stack, Box } from '@mui/material'
// import { pluginList, Plugin, ParsedData } from '../../data/plugins'
// import PluginSidebar from '../../components/PluginVersions/PluginSidebar'
// import PluginVersionsTable from '../../components/PluginVersions/PluginVersionsTable'
// import { parseData } from './parseData'
// import useGetPluginVersionData from '../../hooks/useGetPluginVersionData'

// const PluginTable: React.FC = () => {
//     const [searchTerm, setSearchTerm] = useState('')
//     const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null)
//     const [parsedData, setParsedData] = useState<ParsedData | null>(null)
//     const { versionData, loading } = useGetPluginVersionData(selectedPlugin ? selectedPlugin.id : null)

//     const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         setSearchTerm(event.target.value)
//     }

//     const handleAutocompleteChange = (_event: unknown, value: string | null) => {
//         setSearchTerm(value || '')
//     }

//     const handlePluginSelect = (pluginId: string) => {
//         const plugin = pluginList.find((p) => p.id === pluginId) || null
//         setSelectedPlugin(plugin)
//     }

//     useEffect(() => {
//         if (selectedPlugin && versionData) {
//             const data = parseData(versionData, selectedPlugin.id)
//             setParsedData(data)
//         } else {
//             setParsedData(null)
//         }
//     }, [selectedPlugin, versionData])

//     const filteredPlugins = pluginList.filter((plugin) => plugin.id.toLowerCase().includes(searchTerm.toLowerCase()))

//     return (
//         <Stack
//             sx={{
//                 backgroundColor: '#f0f0f0',
//                 flexDirection: 'row',
//                 height: '100vh',
//                 width: '100vw',
//                 overflow: 'hidden',
//             }}
//         >
//             <PluginSidebar
//                 searchTerm={searchTerm}
//                 setSearchTerm={setSearchTerm}
//                 handleSearch={handleSearch}
//                 handleAutocompleteChange={handleAutocompleteChange}
//                 filteredPlugins={filteredPlugins}
//                 onPluginSelect={handlePluginSelect}
//             />
//             <Box
//                 sx={{
//                     flexGrow: 1,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     padding: '2rem',
//                     overflow: 'hidden',
//                 }}
//             >
//                 <Box
//                     sx={{
//                         overflow: 'scroll',
//                     }}
//                 >
//                     <PluginVersionsTable parsedData={parsedData!} loading={loading} selectedPlugin={selectedPlugin} />
//                 </Box>
//             </Box>
//         </Stack>
//     )
// }

// export default PluginTable
