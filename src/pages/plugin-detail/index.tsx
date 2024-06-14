import React from 'react'
import { useLocation } from 'react-router-dom'
import { Stack, Typography, Card, Grid, Link, Box, Breadcrumbs } from '@mui/material'
import { styled } from '@mui/system'
import LinkIcon from '@mui/icons-material/Link'

// import Grid from '@mui/material/Unstable_Grid2'
import NavBar from '../../components/Layout/NavBar'
import PluginInstallationsChart from '../../components/PluginTrends/Charts/PluginInstallationsChart'
import PluginInstallationsPerVersion from '../../components/PluginTrends/Charts/PluginInstallationsPerVersionChart'
import PluginInstallationsPercentageChart from '../../components/PluginTrends/Charts/PluginInstallationsPercentageChart'
import PluginInstallationsPercentagePerVersionChart from '../../components/PluginTrends/Charts/PluginInstallationsPercentagePerVersionPieChart'

// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
// import ImageIcon from '@mui/icons-material/Image'

const GraphCard = styled(Card)({
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '1rem',
    width: '100%',
    height: '38vh',
    minHeight: '350px',
    boxSizing: 'border-box',
})

const PluginDetail: React.FC = () => {
    const location = useLocation()
    const { chartData } = location.state || {} // Destructure chartData from location.state
    const pluginUrl = chartData ? `https://plugins.jenkins.io/${chartData.name}/` : '#'

    return (
        <Stack
            sx={{
                backgroundColor: '#f0f0f0',
                alignItems: 'center',
                minHeight: '100vh',
                width: '100vw',
            }}
        >
            <NavBar />
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    padding: '1rem',
                    marginTop: '1rem',
                    justifyContent: 'center',
                }}
            >
                <Breadcrumbs aria-label="breadcrumb" separator="›" sx={{ zIndex: '999' }}>
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" href="/plugin-trends">
                        Plugins
                    </Link>
                    {/* <Typography color="textPrimary">{chartData ? chartData.name : 'Plugin Detail'}</Typography> */}
                    <Link underline="hover" color="text.primary" href={pluginUrl} target="_blank" aria-current="page">
                        {chartData ? chartData.name : 'No Plugin ID'}{' '}
                        <LinkIcon sx={{ fontSize: 'small', verticalAlign: 'middle' }} />
                    </Link>
                </Breadcrumbs>
            </Box>
            {/* <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Button size="small" color="primary">
                        <InsertDriveFileIcon style={{}} />
                    </Button>
                    <Button size="small" color="primary">
                        <ImageIcon style={{}} />
                    </Button>
                </Box>{' '} */}
            {chartData ? (
                <Grid
                    container
                    spacing={4}
                    sx={{
                        padding: '6em',
                        paddingTop: '1rem',
                    }}
                >
                    <Grid item xs={12} lg={6}>
                        <GraphCard elevation={10}>
                            <PluginInstallationsChart data={chartData} />
                        </GraphCard>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <GraphCard elevation={10}>
                            <PluginInstallationsPercentageChart data={chartData} />
                        </GraphCard>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <GraphCard elevation={10}>
                            <PluginInstallationsPerVersion data={chartData} />
                        </GraphCard>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <GraphCard elevation={10}>
                            <PluginInstallationsPercentagePerVersionChart data={chartData} />
                        </GraphCard>
                    </Grid>
                </Grid>
            ) : (
                <Typography variant="body2" color="textSecondary" align="center">
                    No Data Available
                </Typography>
            )}
        </Stack>
    )
}

export default PluginDetail
