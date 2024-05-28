import { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Stack,
    Typography,
    Pagination,
    CircularProgress,
    TextField,
    Box,
    Grid,
} from '@mui/material'
// import Grid from '@mui/material/Unstable_Grid2'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ImageIcon from '@mui/icons-material/Image'
import NavBar from '../../components/NavBar'
import PluginCardChart from '../../components/PluginCardChart'
import { pluginList } from '../../data/plugins'
import { Link } from 'react-router-dom'

interface Plugin {
    id: string
    chartData?: {
        name: string
        installations: { [timestamp: string]: number }
        installationsPercentage: { [timestamp: string]: number }
        installationsPerVersion: { [version: string]: number }
        installationsPercentagePerVersion: { [version: string]: number }
    }
}

const PluginTrends: React.FC = () => {
    const [plugins, setPlugins] = useState<Plugin[]>([])
    const [filteredPlugins, setFilteredPlugins] = useState<Plugin[]>([])
    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(true)
    const [searchTerm, setSearchTerm] = useState<string>('')

    const itemsPerPage = 12

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

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    const paginatedPlugins = filteredPlugins.slice((page - 1) * itemsPerPage, page * itemsPerPage)

    return (
        <Stack
            sx={{
                backgroundColor: '#f0f0f0',
                minHeight: '100vh',
                minWidth: '100vw',
            }}
        >
            <NavBar />
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <TextField
                    label="Search Plugins"
                    variant="standard"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ width: '50%' }}
                />
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
                            marginTop: '0',
                        }}
                    >
                        {paginatedPlugins.map((plugin) => (
                            <Grid item xs={12} sm={6} md={4} xl={3} key={plugin.id}>
                                <Card
                                    elevation={12}
                                    sx={{
                                        borderRadius: '1rem',
                                        backgroundColor: 'white',
                                        // display: 'flex',
                                        // flexDirection: 'column',
                                        // justifyContent: 'space-between',
                                        // height: '100%',
                                        // width: '100%',
                                    }}
                                >
                                    <CardActionArea
                                        component={Link}
                                        to={`/plugin/${plugin.id}`}
                                        state={{ chartData: plugin.chartData }}
                                    >
                                        <CardContent>
                                            <Typography
                                                // gutterBottom
                                                // component="div"
                                                sx={{
                                                    fontSize: '1.2rem',
                                                    textAlign: 'center',
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    color: '#212529',
                                                    marginBottom: '1rem',
                                                }}
                                            >
                                                {plugin.id}
                                            </Typography>
                                            <CardMedia>
                                                {plugin.chartData ? (
                                                    <PluginCardChart
                                                        data={{ installations: plugin.chartData.installations }}
                                                    />
                                                ) : (
                                                    <Typography variant="body2" color="textSecondary" align="center">
                                                        No Data Available
                                                    </Typography>
                                                )}
                                            </CardMedia>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Button size="small" color="primary">
                                            <InsertDriveFileIcon style={{ marginRight: '0.5rem' }} />
                                        </Button>
                                        <Button size="small" color="primary">
                                            <ImageIcon style={{ marginRight: '0.5rem' }} />
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination
                        count={Math.ceil(filteredPlugins.length / itemsPerPage)}
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
