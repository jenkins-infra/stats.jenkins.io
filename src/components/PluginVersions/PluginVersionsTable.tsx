import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Autocomplete,
    Box,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { pluginList } from '../../data/plugins'

interface PluginVersionsTableProps {
    searchTerm: string
    // eslint-disable-next-line no-unused-vars
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
    // eslint-disable-next-line no-unused-vars
    handleAutocompleteChange: (_event: unknown, value: string | null) => void
    filteredPlugins: Array<{ id: string }>
}

const PluginVersionsTable: React.FC<PluginVersionsTableProps> = ({
    searchTerm,
    handleSearch,
    handleAutocompleteChange,
    filteredPlugins,
}) => {
    const navigate = useNavigate()

    return (
        <TableContainer component={Paper} sx={{ width: '100%', height: '100%', borderRadius: '1rem' }}>
            <Table stickyHeader aria-label="plugins table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            colSpan={2}
                            sx={{
                                fontWeight: 'bold',
                                color: 'white',
                                backgroundColor: '#212529',
                                textAlign: 'center',
                            }}
                        >
                            <Autocomplete
                                freeSolo
                                options={pluginList.map((plugin) => plugin.id)}
                                onChange={handleAutocompleteChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search Plugins"
                                        variant="standard"
                                        margin="none"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        sx={{
                                            color: 'white',
                                            backgroundColor: '#212529',
                                        }}
                                        InputLabelProps={{
                                            style: { color: 'white' },
                                        }}
                                        InputProps={{
                                            ...params.InputProps,
                                            style: { color: 'white' },
                                            disableUnderline: true,
                                            startAdornment: (
                                                <Box
                                                    sx={{
                                                        height: '2px',
                                                        backgroundColor: 'white',
                                                        position: 'absolute',
                                                        bottom: '0px',
                                                        left: '0',
                                                        right: '0',
                                                    }}
                                                />
                                            ),
                                        }}
                                    />
                                )}
                                PaperComponent={({ children }) => (
                                    <Paper
                                        sx={{
                                            backgroundColor: '#212529',
                                            color: 'white',
                                            '& .MuiAutocomplete-option': {
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: '#b0b0b0',
                                                },
                                            },
                                        }}
                                    >
                                        {children}
                                    </Paper>
                                )}
                                sx={{
                                    width: '100%',
                                }}
                            />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody
                    sx={{
                        '& td': {
                            padding: '12px',
                            fontSize: '0.875rem',
                        },
                        '& tr:nth-of-type(odd)': {
                            backgroundColor: '#f9f9f9',
                        },
                        '& tr:hover': {
                            backgroundColor: '#f1f1f1',
                            '& .MuiTableCell-root': {
                                color: '#1976d2',
                            },
                        },
                    }}
                >
                    {filteredPlugins.map((plugin) => (
                        <TableRow
                            key={plugin.id}
                            onClick={() => navigate(`/plugin/${plugin.id}`)}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: '#e0f7fa',
                                    transition: '0.2s',
                                },
                            }}
                        >
                            <TableCell>{plugin.id}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PluginVersionsTable
