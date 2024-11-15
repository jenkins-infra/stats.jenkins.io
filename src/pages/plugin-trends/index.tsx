import { useState, useMemo, useRef, useEffect } from 'react'
import {
    Paper,
    Stack,
    Pagination,
    CircularProgress,
    TextField,
    Box,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
} from '@mui/material'
import useSortPlugins from '../../hooks/useSortPlugins'
import { SortOption } from '../../types/types'
import useFetchPlugins from '../../hooks/useFetchPlugins'
import useSearchPlugins from '../../hooks/useSearchPlugins'
import usePagination from '../../hooks/usePagination'
import usePaginationState from '../../hooks/usePaginationState'
import PluginCard from '../../components/PluginTrends/Layout/PluginCard'
import BackToHome from '../../components/Layout/BackToHome'
import useSystemTheme from '../../hooks/useSystemTheme'
const PluginTrends: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const { page, setPage, handlePageChange } = usePaginationState()
    const [lastPage, setLastPage] = useState<number>(1)
    const { plugins, loading } = useFetchPlugins()
    const { filteredPlugins } = useSearchPlugins(plugins, searchTerm)
    const { sortOption, setSortOption } = useSortPlugins(filteredPlugins)
    const { systemTheme } = useSystemTheme()
    const itemsPerPage = 72

    const { paginatedData, totalPages } = usePagination(filteredPlugins, itemsPerPage, page)

    const pluginOptions = useMemo(() => filteredPlugins.map((plugin) => plugin.id), [filteredPlugins])
    const filterOptions = (options: string[], { inputValue }: { inputValue: string }) => {
        return inputValue.length === 0 ? [] : options
    }

    const prevSearchTerm = useRef<string>('')

    useEffect(() => {
        if (prevSearchTerm.current === '' && searchTerm !== '') {
            setLastPage(page)
            setPage(1)
        } else if (prevSearchTerm.current !== '' && searchTerm === '') {
            setPage(lastPage)
        }

        prevSearchTerm.current = searchTerm
    }, [lastPage, page, searchTerm, setPage])

    return (
        <>
            <Stack
                sx={{
                    backgroundColor: '#f0f0f0',
                    alignItems: 'center',
                    width: '100vw',
                    height: '100vh',
                    overflow: 'auto',
                    position: 'relative',
                    '@media (prefers-color-scheme: dark)': {
                        backgroundColor: '#333333',
                    },
                }}
            >
                <Box
                    sx={{
                        position: 'fixed',
                        top: '4rem',
                        left: '1rem',
                        zIndex: 1000,
                    }}
                >
                    <BackToHome color={systemTheme === 'dark' ? 'white' : 'black'} />
                </Box>

                <Paper
                    elevation={12}
                    sx={{
                        position: 'fixed',
                        top: '5.5rem',
                        zIndex: 10,
                        backgroundColor: '#ffffff',
                        opacity: 0.9,
                        padding: '1rem 2rem',
                        borderRadius: '1rem',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1rem',
                        width: '50%',
                        maxWidth: '800px',
                        minWidth: '260px',
                        margin: '0 auto',
                        '@media (max-width: 600px)': {
                            alignItems: 'stretch',
                            gap: '1rem',
                            padding: '1rem',
                        },
                        '@media (prefers-color-scheme: dark)': {
                            backgroundColor: '#212529',
                        },
                    }}
                >
                    <Box sx={{ width: '100%', minWidth: '120px' }}>
                        <Autocomplete
                            freeSolo
                            options={pluginOptions}
                            filterOptions={filterOptions}
                            onInputChange={(_event, value) => setSearchTerm(value)}
                            renderInput={(params) => (
                                <TextField {...params} label="Search Plugins" variant="outlined" />
                            )}
                        />
                    </Box>
                    <Box>
                        <FormControl variant="outlined" sx={{ width: '100%', minWidth: '120px' }}>
                            <InputLabel>Sort By</InputLabel>
                            <Select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value as SortOption)}
                                label="Sort By"
                            >
                                <MenuItem value="alphabetical">A - Z</MenuItem>
                                <MenuItem value="downloadsHighToLow">Installations: High to Low</MenuItem>
                                <MenuItem value="downloadsLowToHigh">Installations: Low to High</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Paper>
                <Box sx={{ marginTop: '7rem', width: '100%' }}>
                    {plugins.length === 0 ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <CircularProgress
                                sx={{
                                    marginTop: '10rem',
                                }}
                            />
                        </Box>
                    ) : (
                        <>
                            <Grid
                                container
                                spacing={3}
                                sx={{
                                    padding: '4rem',
                                    paddingTop: '1rem',
                                    marginTop: '0',
                                    '@media (max-width: 600px)': {
                                        padding: '2rem',
                                    },
                                }}
                            >
                                {paginatedData.map((plugin) => (
                                    <Grid item xs={6} sm={4} md={3} xl={2} key={plugin.id}>
                                        <PluginCard plugin={plugin} />
                                    </Grid>
                                ))}
                            </Grid>
                            {loading && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: '2rem',
                                    }}
                                >
                                    <CircularProgress />
                                </Box>
                            )}
                            <Pagination
                                count={totalPages}
                                page={page}
                                shape="rounded"
                                onChange={handlePageChange}
                                color="primary"
                                sx={{
                                    marginTop: '2rem',
                                    marginBottom: '4rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            />
                        </>
                    )}
                </Box>
            </Stack>
        </>
    )
}

export default PluginTrends
