import React, { useCallback } from 'react'
import { Modal, Typography, Grid, Link, IconButton, Tooltip, Card, Paper, Box } from '@mui/material'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { styled } from '@mui/system'
import PluginInstallationsChart from '../Charts/PluginInstallationsChart'
import PluginInstallationsPercentageChart from '../Charts/PluginInstallationsPercentageChart'
import PluginInstallationsPerVersion from '../Charts/PluginInstallationsPerVersionChart'
import PluginInstallationsPercentagePerVersionChart from '../Charts/PluginInstallationsPercentagePerVersionPieChart'
import { handleJSONDownload } from '../../../utils/jsonUtils'
import { IPluginData } from '../../../types/types'
import CloseIcon from '@mui/icons-material/Close'

interface PluginDetailModalProps {
    open: boolean
    handleClose: () => void
    plugin: IPluginData
}

const GraphCard = styled(Card)({
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '1rem',
    width: '100%',
    height: '35vh',
    boxSizing: 'border-box',
})

const HeaderBox = styled(Paper)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    backgroundColor: '#ffffff',
    marginBottom: '1rem',
})

const PluginDetailModal: React.FC<PluginDetailModalProps> = ({ open, handleClose, plugin }) => {
    const downloadJSON = useCallback(() => {
        if (plugin.chartData) {
            handleJSONDownload(plugin.chartData || {}, plugin.chartData.name)
        }
    }, [plugin.chartData])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'auto',
            }}
        >
            <Paper
                elevation={16}
                sx={{
                    width: '90%',
                    maxWidth: '1400px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 6,
                    borderRadius: 5,
                    backgroundColor: '#f0f0f0',
                    maxHeight: '90vh',
                    margin: 'auto',
                    boxSizing: 'border-box',
                }}
            >
                {plugin.chartData ? (
                    <>
                        <HeaderBox elevation={8}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Link
                                    underline="hover"
                                    color="text.primary"
                                    href={`https://plugins.jenkins.io/${plugin.chartData.name}/`}
                                    target="_blank"
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                        fontFamily: 'Monospace',
                                    }}
                                >
                                    {plugin.chartData.name}
                                </Link>
                                <Tooltip title="Download Data (JSON)">
                                    <IconButton
                                        onClick={downloadJSON}
                                        sx={{
                                            p: 0,
                                            ml: 1,
                                            transition: 'transform 0.2s, color 0.2s',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                                color: 'blue',
                                            },
                                        }}
                                    >
                                        <FileDownloadOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton
                                    onClick={handleClose}
                                    sx={{
                                        p: 0,
                                        ml: 1,
                                        transition: 'transform 0.2s, color 0.2s',
                                        '&:hover': {
                                            transform: 'rotate(90deg)',
                                            color: 'red',
                                        },
                                    }}
                                >
                                    <CloseIcon sx={{ fontSize: 'xl', verticalAlign: 'middle' }} />
                                </IconButton>
                            </Box>
                        </HeaderBox>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <GraphCard elevation={8}>
                                    <PluginInstallationsChart data={plugin.chartData} />
                                </GraphCard>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <GraphCard elevation={8}>
                                    <PluginInstallationsPercentageChart data={plugin.chartData} />
                                </GraphCard>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <GraphCard elevation={8}>
                                    <PluginInstallationsPerVersion data={plugin.chartData} />
                                </GraphCard>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <GraphCard elevation={8}>
                                    <PluginInstallationsPercentagePerVersionChart data={plugin.chartData} />
                                </GraphCard>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <Typography variant="body2" color="textSecondary" align="center">
                        No Data Available
                    </Typography>
                )}
            </Paper>
        </Modal>
    )
}

export default PluginDetailModal
