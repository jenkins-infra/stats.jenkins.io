import React from 'react'
import { useLocation } from 'react-router-dom'
import { Stack, Typography, Card, Grid, Link, Button, Box } from '@mui/material'
import { styled } from '@mui/system'

// import Grid from '@mui/material/Unstable_Grid2'
import NavBar from '../../components/Layout/NavBar'
import PluginInstallationsChart from '../../components/PluginTrends/Charts/PluginInstallationsChart'
import PluginInstallationsPerVersion from '../../components/PluginTrends/Charts/PluginInstallationsPerVersionChart'
import PluginInstallationsPercentageChart from '../../components/PluginTrends/Charts/PluginInstallationsPercentageChart'
import PluginInstallationsPercentagePerVersionChart from '../../components/PluginTrends/Charts/PluginInstallationsPercentagePerVersionPieChart'

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ImageIcon from '@mui/icons-material/Image'

const GraphCard = styled(Card)({
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '1rem',
    width: '100%',
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
            <Card
                elevation={8}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    borderRadius: '1rem',
                    backgroundColor: 'white',
                    marginTop: '3rem',
                    width: '60%',
                    gap: '2rem',
                }}
            >
                <Link href={pluginUrl} target="_blank" underline="none" sx={{ zIndex: '999' }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontFamily: 'Georgia, serif',
                            color: 'black',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            '&:hover': {
                                textDecoration: 'underline',
                                cursor: 'pointer',
                            },
                            '@media (max-width: 1024px)': {
                                fontSize: '1.5rem',
                            },
                        }}
                    >
                        {chartData ? chartData.name : 'No Plugin ID'}
                    </Typography>
                </Link>
                <Box
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
                </Box>
            </Card>
            {chartData ? (
                <Grid
                    container
                    spacing={4}
                    sx={{
                        padding: '6em',
                        paddingTop: '2em',
                    }}
                >
                    <Grid item xs={12} lg={6}>
                        <GraphCard elevation={16}>
                            <PluginInstallationsChart data={chartData} />
                        </GraphCard>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <GraphCard elevation={16}>
                            <PluginInstallationsPercentageChart data={chartData} />
                        </GraphCard>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <GraphCard elevation={16}>
                            <PluginInstallationsPerVersion data={chartData} />
                        </GraphCard>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <GraphCard elevation={16}>
                            <PluginInstallationsPercentagePerVersionChart data={chartData} />
                        </GraphCard>
                    </Grid>
                </Grid>
            ) : (
                <Typography variant="body2" color="textSecondary" align="center">
                    No Data Available
                </Typography>
            )}
            {/* </Paper> */}
        </Stack>
    )
}

export default PluginDetail
