import React, { useState } from 'react'
import { Stack, Paper, Box } from '@mui/material'
import { pluginList } from '../../data/plugins'
import PluginVersionsTable from '../../components/PluginVersions/PluginVersionsTable'

const PluginTable: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleAutocompleteChange = (_event: unknown, value: string | null) => {
        setSearchTerm(value || '')
    }

    const filteredPlugins = pluginList.filter((plugin) => plugin.id.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <Stack
            sx={{
                backgroundColor: '#f0f0f0',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                overflow: 'hidden',
            }}
        >
            <Paper
                elevation={16}
                sx={{
                    width: '500px',
                    height: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    borderRadius: '1.5rem',
                }}
            >
                <Stack
                    sx={{
                        height: '100%',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxSizing: 'border-box',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <PluginVersionsTable
                            searchTerm={searchTerm}
                            handleSearch={handleSearch}
                            handleAutocompleteChange={handleAutocompleteChange}
                            filteredPlugins={filteredPlugins}
                        />
                    </Box>
                </Stack>
            </Paper>
        </Stack>
    )
}

export default PluginTable
