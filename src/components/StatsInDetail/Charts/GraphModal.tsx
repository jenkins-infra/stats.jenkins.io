import React from 'react'
import { Modal, Box, Typography } from '@mui/material'
import JenkinsGraph from './ModalGraphs/JenkinsGraph' // Import the JenkinsGraph component

type GraphType =
    | 'jenkins'
    | 'jobs'
    | 'nodes'
    | 'nodesPie'
    | 'plugins'
    | 'top-plugins1000'
    | 'top-plugins2500'
    | 'top-plugins500'
    | 'total-executors'

interface GraphModalProps {
    open: boolean
    onClose: () => void
    type: GraphType
    year: string
    month: string
}

const GraphModal: React.FC<GraphModalProps> = ({ open, onClose, type, year, month }) => {
    const renderGraph = () => {
        switch (type) {
            case 'jenkins':
                return <JenkinsGraph year={year} month={month} />
            // Add other cases here for other graph types
            default:
                return null
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    width: '70vw',
                    height: '70vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 2,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 24,
                }}
            >
                <Typography variant="h6" component="h2">
                    {type} - {year}/{month}
                </Typography>
                {renderGraph()}
            </Box>
        </Modal>
    )
}

export default GraphModal
