import React from 'react'
import { Modal, Paper } from '@mui/material'
import JenkinsGraph from './ModalGraphs/JenkinsGraph' // Import the JenkinsGraph component
import { GraphType } from '../../../data/types'
import JobsGraph from './ModalGraphs/JobsGraph'
import NodesGraph from './ModalGraphs/NodesGraph'

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
            case 'jobs':
                return <JobsGraph year={year} month={month} />
            case 'nodes':
                return <NodesGraph year={year} month={month} />
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
                marginBottom: '3rem',
                marginLeft: '4rem',
            }}
        >
            <Paper
                elevation={16}
                sx={{
                    width: '70vw',
                    height: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 4,
                    backgroundColor: 'white',
                    borderRadius: 5,
                }}
            >
                {renderGraph()}
            </Paper>
        </Modal>
    )
}

export default GraphModal
