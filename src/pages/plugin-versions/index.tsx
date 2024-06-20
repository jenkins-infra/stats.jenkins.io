import React, { useState, useEffect } from 'react'
import { Stack, Paper, Box } from '@mui/material'
import { pluginList, Plugin, ParsedData } from '../../data/plugins'
import PluginsTable from '../../components/PluginVersions/PluginsTable'
import PluginVersionsTable from '../../components/PluginVersions/PluginVersionsTable'
import { parseData } from './parseData'
import useGetPluginVersionData from '../../hooks/useGetPluginVersionData'

const PluginTable: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null)
    const [parsedData, setParsedData] = useState<ParsedData | null>(null)
    const { versionData, loading } = useGetPluginVersionData(selectedPlugin ? selectedPlugin.id : null)

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                gap: '2rem',
                overflow: 'hidden',
            }}
        >
            <Paper
                elevation={16}
                sx={{
                    width: '20%',
                    height: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    borderRadius: '1.5rem',
                }}
            >
                <PluginsTable
                    searchTerm={searchTerm}
                    handleSearch={handleSearch}
                    handleAutocompleteChange={handleAutocompleteChange}
                    filteredPlugins={filteredPlugins}
                    onPluginSelect={handlePluginSelect}
                />
            </Paper>
            <Paper
                elevation={16}
                sx={{
                    width: '75%',
                    height: '90%',
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
                    <PluginVersionsTable parsedData={parsedData!} loading={loading} selectedPlugin={selectedPlugin} />
                </Box>
            </Paper>
        </Stack>
    )
}

export default PluginTable
