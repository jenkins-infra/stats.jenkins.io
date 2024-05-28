import React from 'react'
import { useLocation } from 'react-router-dom'
import { Stack, Typography, Card, styled } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import NavBar from '../../components/NavBar'
import PluginInstallationsChart from '../../components/PluginInstallationsChart'
import PluginInstallationsPerVersion from '../../components/PluginInstallationsPerVersion'
import PluginInstallationsPercentageChart from '../../components/PluginInstallationsPercentageChart'
import PluginInstallationsPercentagePerVersionChart from '../../components/PluginInstallationsPercentagePerVersionChart'

const GraphCard = styled(Card)({
    backgroundColor: '#f0f0f0',
    borderRadius: '1rem',
    padding: '1rem',
})

const PluginDetail: React.FC = () => {
    const location = useLocation()
    const { chartData } = location.state || {} // Destructure chartData from location.state

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
            <Typography
                variant="h4"
                sx={{
                    color: 'black',
                    marginTop: '4rem',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    '@media (max-width: 1024px)': {
                        fontSize: '1.5rem',
                    },
                }}
            >
                {chartData ? chartData.name : 'No Plugin ID'}
            </Typography>
            {chartData ? (
                <Grid
                    container
                    spacing={4}
                    sx={{
                        padding: '6em',
                        // marginTop: '0',
                    }}
                >
                    <Grid xs={12} sm={6}>
                        <GraphCard elevation={16}>
                            <PluginInstallationsChart data={{ installations: chartData.installations }} />
                        </GraphCard>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <GraphCard elevation={16}>
                            <PluginInstallationsPerVersion
                                data={{ installationsPerVersion: chartData.installationsPerVersion }}
                            />
                        </GraphCard>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <GraphCard elevation={16}>
                            <PluginInstallationsPercentageChart
                                data={{ installationsPercentage: chartData.installationsPercentage }}
                            />
                        </GraphCard>
                    </Grid>
                    <Grid xs={12} sm={6}>
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
        </Stack>
    )
}

export default PluginDetail
