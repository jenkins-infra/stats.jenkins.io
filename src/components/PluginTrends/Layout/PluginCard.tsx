import React, { useState, useMemo } from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material'

import PluginCardChart from '../Charts/PluginCardChart'
import PluginDetailModal from './PluginDetailModal'
import { IPluginData } from '../../../data/plugins'
import downloadIcon from '../../../assets/downloadIcon.svg'

interface PluginCardProps {
    plugin: IPluginData
}

const PluginCard: React.FC<PluginCardProps> = ({ plugin }) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const totalInstallationsK = useMemo(() => {
        if (!plugin.chartData || !plugin.chartData.installations) return '0K'
        const totalInstallations = Object.values(plugin.chartData.installations).reduce(
            (sum, installations) => sum + installations,
            0
        )
        return (totalInstallations / 1000).toFixed(1) + 'K'
    }, [plugin.chartData])

    return (
        <>
            <Card
                elevation={12}
                sx={{
                    borderRadius: '1rem',
                    backgroundColor: 'white',
                }}
            >
                <CardActionArea onClick={handleOpen}>
                    <CardContent>
                        <Typography
                            sx={{
                                fontSize: '1.2rem',
                                textAlign: 'center',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                color: '#212529',
                                marginBottom: '0.5rem',
                            }}
                        >
                            {plugin.id}
                        </Typography>
                        <Box display="flex" alignItems="center" justifyContent="center" marginBottom="1rem">
                            <img src={downloadIcon} alt="Downloads" width={20} height={20} />
                            <Typography variant="subtitle1" component="div" marginLeft={1}>
                                {totalInstallationsK}
                            </Typography>
                        </Box>
                        <CardMedia>
                            {plugin.chartData ? (
                                <PluginCardChart data={plugin.chartData} />
                            ) : (
                                <Typography variant="body2" color="textSecondary" align="center">
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
}

export default PluginCard
