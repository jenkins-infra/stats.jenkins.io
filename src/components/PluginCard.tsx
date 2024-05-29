// PluginCard.tsx
import React from 'react'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ImageIcon from '@mui/icons-material/Image'
import PluginCardChart from './PluginCardChart'
import { IPluginData } from '../data/plugins'

interface PluginCardProps {
    plugin: IPluginData
}

const PluginCard: React.FC<PluginCardProps> = ({ plugin }) => {
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
                            <PluginCardChart data={{ installations: plugin.chartData.installations }} />
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
    )
}

export default PluginCard
