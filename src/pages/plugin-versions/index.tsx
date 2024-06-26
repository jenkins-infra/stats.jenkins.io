import React, { useState, useEffect } from 'react'
import { Stack, Box, Typography, SelectChangeEvent } from '@mui/material'
import { pluginList, Plugin, ParsedData } from '../../data/plugins'
import PluginVersionsTable from '../../components/PluginVersions/PluginVersionsTable'
import { parseData } from './parseData'
import useGetPluginVersionData from '../../hooks/useGetPluginVersionData'
import SearchBar from '../../components/PluginVersions/SearchPlugins'
import BackToSearch from '../../components/PluginVersions/BackToSearchButton'

const PluginTable: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null)
    const [parsedData, setParsedData] = useState<ParsedData | null>(null)
    const { versionData, loading } = useGetPluginVersionData(selectedPlugin ? selectedPlugin.id : null)

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleAutocompleteChange = (_event: unknown, value: string | null) => {

        setSelectedPlugin(pluginList.find((p) => p.id === value) || null)
    }

    const handleDropdownChange = (event: SelectChangeEvent<string>) => {
        setSelectedPlugin(pluginList.find((p) => p.id === event.target.value) || null)
    }

    const handleBackToSearch = () => {
        setSelectedPlugin(null)
        setSearchTerm('')
        setParsedData(null)

    }

    useEffect(() => {
        if (selectedPlugin && versionData) {
            setParsedData(parseData(versionData, selectedPlugin.id))

        } else {
            setParsedData(null)
        }
    }, [selectedPlugin, versionData])

    return (
        <Stack sx={{ backgroundColor: '#f0f0f0', height: '100vh', width: '100vw', overflow: 'hidden' }}>
            <Box
                sx={{
                    padding: '3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: selectedPlugin ? '1rem' : '3rem',
                }}
            >
                {!selectedPlugin ? (
                    <>
                        <Box sx={{ marginBottom: '2rem' }}>
                            <Typography
                                sx={{
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    color: '#333',
                                    fontFamily: 'monospace',
                                    marginBottom: '0.3rem',
                                }}
                            >
                                Plugin Versions
                            </Typography>
                            <Typography sx={{ fontSize: '1rem', color: '#333', fontFamily: 'monospace' }}>
                                Search for a plugin or select one from the dropdown menu
                            </Typography>
                        </Box>
                        <SearchBar
                            searchTerm={searchTerm}
                            selectedPlugin={selectedPlugin}
                            onSearchChange={handleSearch}
                            onAutocompleteChange={handleAutocompleteChange}
                            onDropdownChange={handleDropdownChange}
                        />
                    </>
                ) : (
                    <Box
                        sx={{
                            maxHeight: 'calc(100vh - 124px)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            overflow: 'hidden',
                        }}
                    >
                        <BackToSearch onClick={handleBackToSearch} />
                        <PluginVersionsTable
                            parsedData={parsedData!}
                            loading={loading}
                            selectedPlugin={selectedPlugin}
                        />
                    </Box>
                )}
            </Box>
        </Stack>
    )
}

export default PluginTable
