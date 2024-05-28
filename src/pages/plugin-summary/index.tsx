import React from 'react'
import { useLocation } from 'react-router-dom'
import { Grid, Stack, Typography, Card, styled } from '@mui/material'
import PluginCardChart from '../../components/PluginCardChart'
import NavBar from '../../components/NavBar'
import PluginInstallationsChart from '../../components/PluginInstallationsChart'

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
            <Typography variant="h4" sx={{ color: 'black' }}>
                Plugin Details
            </Typography>
            {chartData ? (
                <Grid
                    container
                    spacing={4}
                    sx={{
                        padding: '4rem',
                        marginTop: '0',
                    }}
                >
                    <Grid item xs={12} sm={6}>
                        <GraphCard elevation={16}>
                            <PluginInstallationsChart data={{ installations: chartData.installations }} />
                        </GraphCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <GraphCard elevation={16}>
                            <PluginCardChart data={{ installations: chartData.installationsPerVersion }} />
                        </GraphCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <GraphCard elevation={16}>
                            <PluginCardChart data={{ installations: chartData.installationsPercentage }} />
                        </GraphCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <GraphCard elevation={16}>
                            <PluginCardChart data={{ installations: chartData.installationsPercentagePerVersion }} />
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
