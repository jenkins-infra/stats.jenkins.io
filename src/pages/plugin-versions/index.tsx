import React, { useState, useEffect } from 'react'
import { Stack, Paper, Box } from '@mui/material'
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
                alignItems: 'center',
                justifyContent: 'flex-start',
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
                    flexGrow: 1,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '16px',
                }}
            >
                <Paper
                    elevation={16}
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        borderRadius: '1.5rem',
                    }}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            padding: '1rem',
                            overflow: 'auto',
                        }}
                    >
                        <PluginVersionsTable
                            parsedData={parsedData!}
                            loading={loading}
                            selectedPlugin={selectedPlugin}
                        />
                    </Box>
                </Paper>
            </Box>
        </Stack>
    )
}

export default PluginTable
