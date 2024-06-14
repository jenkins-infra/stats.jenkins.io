// PluginCard.tsx
import React from 'react'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ImageIcon from '@mui/icons-material/Image'
import PluginCardChart from '../Charts/PluginCardChart'
import { IPluginData } from '../../../data/plugins'

interface PluginCardProps {
    plugin: IPluginData
}

const PluginCard: React.FC<PluginCardProps> = ({ plugin }) => {
    const handleCSVDownload = () => {
        if (plugin.chartData && plugin.chartData.installations) {
            const data = plugin.chartData.installations
            const csvData = Object.entries(data).map(([timestamp, value]) => ({ timestamp, value }))
            const csv = 'timestamp,value\n' + csvData.map((row) => `${row.timestamp},${row.value}`).join('\n')
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.setAttribute('href', url)
            link.setAttribute('download', `${plugin.id}_data.csv`)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    return (
        <Card
            elevation={12}
            sx={{
                borderRadius: '1rem',
                backgroundColor: 'white',
            }}
        >
            <CardActionArea component={Link} to={`/plugin/${plugin.id}`} state={{ chartData: plugin.chartData }}>
                <CardContent>
                    <Typography
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
                            <PluginCardChart data={plugin.chartData} />
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
                <Button size="small" color="primary" onClick={handleCSVDownload}>
                    <InsertDriveFileIcon style={{ marginRight: '0.5rem' }} />
                </Button>
                <Button size="small" color="primary">
                    <ImageIcon style={{ marginRight: '0.5rem' }} />
                </Button>
            </CardActions>
        </Card>
    )
}

export default PluginCard
