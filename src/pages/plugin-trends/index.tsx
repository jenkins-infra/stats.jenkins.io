import { useState } from 'react'
import {
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
} from '@mui/material'
import NavBar from '../../components/Layout/NavBar'
import useFetchAndFilterPlugins from '../../hooks/useFetchAndFilterPlugins'
import useSortPlugins from '../../hooks/useSortPlugins'
import usePagination from '../../hooks/usePagination'
import PluginCard from '../../components/PluginTrends/Layout/PluginCard'
import { SortOption } from '../../data/types'

const PluginTrends: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const { filteredPlugins, loading } = useFetchAndFilterPlugins(searchTerm)
    const { sortOption, setSortOption } = useSortPlugins(filteredPlugins)
    const itemsPerPage = 64

    const { page, handlePageChange, paginatedData, totalPages } = usePagination(filteredPlugins, itemsPerPage)

    return (
        <Stack
            sx={{
                backgroundColor: '#f0f0f0',
                minHeight: '100vh',
                minWidth: '100vw',
            }}
        >
            <NavBar />
            <Box
                sx={{
                    marginTop: '2.5rem',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '2rem',
                    width: '100%',
                }}
            >
                <Box>
                    <TextField
                        label="Search Plugins"
                        variant="standard"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>
                <Box>
                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value as SortOption)}
                            label="Sort By"
                        >
                            <MenuItem value="alphabetical">A - Z</MenuItem>
                            <MenuItem value="downloadsHighToLow">Installs High to Low</MenuItem>
                            <MenuItem value="downloadsLowToHigh">Installs Low to High</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <Grid
                        container
                        spacing={3}
                        sx={{
                            padding: '4rem',
                            paddingTop: '1rem',
                            marginTop: '0',
                        }}
                    >
                        {paginatedData.map((plugin) => (
                            <Grid item xs={6} sm={4} md={3} key={plugin.id}>
                                <PluginCard plugin={plugin} />
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination
                        count={totalPages}
                        page={page}
                        shape="rounded"
                        onChange={handlePageChange}
                        color="primary"
                        sx={{ marginTop: '2rem', marginBottom: '4rem', display: 'flex', justifyContent: 'center' }}
                    />
                </>
            )}
        </Stack>
    )
}

export default PluginTrends
