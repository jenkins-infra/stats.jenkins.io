import React from 'react'
import { useLocation } from 'react-router-dom'
import { Stack, Typography, Card, Grid, Link } from '@mui/material'
import { styled } from '@mui/system'

// import Grid from '@mui/material/Unstable_Grid2'
import NavBar from '../../components/NavBar'
import PluginInstallationsChart from '../../components/PluginInstallationsChart'
import PluginInstallationsPerVersion from '../../components/PluginInstallationsPerVersion'
import PluginInstallationsPercentageChart from '../../components/PluginInstallationsPercentageChart'
import PluginInstallationsPercentagePerVersionChart from '../../components/PluginInstallationsPercentagePerVersionChart'

const GraphCard = styled(Card)({
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '1rem',
    // minWidth: '300px',
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
                minWidth: '100vw',
            }}
        >
            <NavBar />
            {/* <Paper */}
            {/* elevation={16}
                sx={{
                    height: '100%',
                    width: '95%',
                    margin: '2rem',
                    borderRadius: '1rem',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            > */}
            <Card
                elevation={4}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    borderRadius: '1rem',
                    backgroundColor: 'white',
                    marginTop: '4rem',
                    width: '60%',
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
            </Card>
            {chartData ? (
                <Grid
                    container
                    spacing={4}
                    sx={{
                        padding: '6em',
                        paddingTop: '4em',
                        // marginTop: '0',
                    }}
                >
                    <Grid item xs={12} sm={6}>
                        <GraphCard elevation={16}>
                            <PluginInstallationsChart data={{ installations: chartData.installations }} />
                        </GraphCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <GraphCard elevation={16}>
                            <PluginInstallationsPerVersion
                                data={{ installationsPerVersion: chartData.installationsPerVersion }}
                            />
                        </GraphCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <GraphCard elevation={16}>
                            <PluginInstallationsPercentageChart
                                data={{ installationsPercentage: chartData.installationsPercentage }}
                            />
                        </GraphCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <GraphCard elevation={16}>
                            <PluginInstallationsPercentagePerVersionChart
                                data={{
                                    installationsPercentagePerVersion: chartData.installationsPercentagePerVersion,
                                }}
                            />
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
