// PluginTrends.tsx
import { useState, useEffect } from 'react'
import axios from 'axios'
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
import NavBar from '../../components/NavBar'
import { pluginList, IPluginData } from '../../data/plugins'
import useSortPlugins from '../../hooks/useSortPlugins'
import usePagination from '../../hooks/usePagination'
import PluginCard from '../../components/PluginCard'

const PluginTrends: React.FC = () => {
    const [plugins, setPlugins] = useState<IPluginData[]>([])
    const [filteredPlugins, setFilteredPlugins] = useState<IPluginData[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [searchTerm, setSearchTerm] = useState<string>('')

    const { sortOption, setSortOption } = useSortPlugins(filteredPlugins)
    const itemsPerPage = 12

    const { page, handlePageChange, paginatedData, totalPages } = usePagination(filteredPlugins, itemsPerPage)

    useEffect(() => {
        const fetchPluginList = async () => {
            try {
                const pluginDataPromises = pluginList.map((plugin) =>
                    axios
                        .get(
                            `https://raw.githubusercontent.com/jenkins-infra/infra-statistics/gh-pages/plugin-installation-trend/${plugin.id}.stats.json`
                        )
                        .then((response) => ({ ...plugin, chartData: response.data }))
                )
                const pluginData = await Promise.all(pluginDataPromises)
                setPlugins(pluginData)
                setFilteredPlugins(pluginData)
            } catch (error) {
                console.error('Error fetching plugin data', error)
            } finally {
                setLoading(false)
            }
        }
        fetchPluginList()
    }, [])

    useEffect(() => {
        const filtered = plugins.filter((plugin) => plugin.id.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredPlugins(filtered)
    }, [searchTerm, plugins])

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
                            onChange={(e) => setSortOption(e.target.value as 'alphabetical' | 'downloads')}
                            label="Sort By"
                        >
                            <MenuItem value="alphabetical">A - Z</MenuItem>
                            <MenuItem value="downloads">Installs High to Low</MenuItem>
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
                        spacing={4}
                        sx={{
                            padding: '4rem',
                            paddingTop: '2rem',
                            marginTop: '0',
                        }}
                    >
                        {paginatedData.map((plugin) => (
                            <Grid item xs={12} sm={6} md={4} xl={3} key={plugin.id}>
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
