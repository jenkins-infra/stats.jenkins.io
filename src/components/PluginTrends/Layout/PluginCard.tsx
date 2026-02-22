import React, { useState, useMemo } from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, Tooltip } from '@mui/material'
import PluginCardChart from '../Charts/PluginCardChart'
import PluginDetailModal from './PluginDetailModal'
import { IPluginData } from '../../../types/types'

interface PluginCardProps {
    plugin: IPluginData
}

const PluginCard: React.FC<PluginCardProps> = React.memo(({ plugin }) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const totalInstallationsK = useMemo(() => {
        if (!plugin.chartData || !plugin.chartData.installations) return '0K'
        const totalInstallations = Object.values(plugin.chartData.installations).reduce(
            (sum, installations) => sum + installations,
            0
        )
        return (
            (totalInstallations / 1000).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
            }) + 'K'
        )
    }, [plugin.chartData])

    return (
        <>
            <Card
                elevation={12}
                sx={{
                    borderRadius: '1rem',
                    backgroundColor: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 123, 255, 0.02)',
                        '@media (prefers-color-scheme: dark)': {
                            backgroundColor: 'rgba(0, 123, 255, 0.1)',
                        },
                    },
                    '@media (prefers-color-scheme: dark)': {
                        backgroundColor: '#212529',
                    },
                }}
            >
                <CardActionArea onClick={handleOpen}>
                    <CardContent>
                        <Typography
                            sx={{
                                fontSize: '1rem',
                                textAlign: 'center',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                color: '#212529',
                                marginBottom: '0.5rem',
                                '&:hover': { color: '#007bff' },
                                '@media (prefers-color-scheme: dark)': {
                                    color: 'white',
                                },
                            }}
                        >
                            {plugin.id}
                        </Typography>
                        <Box display="flex" alignItems="center" justifyContent="center" marginBottom="1rem">
                            <Tooltip title="Total plugin installations" arrow>
                                <Typography component="div">
                                    {totalInstallationsK}
                                </Typography>
                            </Tooltip>
                        </Box>
                        <CardMedia
                            sx={{
                                height: '100px',
                            }}
                        >
                            {plugin.chartData ? (
                                <PluginCardChart data={plugin.chartData} />
                            ) : (
                                <Typography color="textSecondary" align="center">
                                    No Data Available
                                </Typography>
                            )}
                        </CardMedia>
                    </CardContent>
                </CardActionArea>
            </Card>
            <PluginDetailModal open={open} handleClose={handleClose} plugin={plugin} />
        </>
    )
})

export default PluginCard
