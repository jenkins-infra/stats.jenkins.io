import React from 'react'
import { Modal, Paper } from '@mui/material'
import { GraphType } from '../../../types/types'
import JenkinsGraph from './ModalGraphs/Jenkins'
import JobsGraph from './ModalGraphs/Jobs'
import NodesGraph from './ModalGraphs/Nodes'
import NodesPieGraph from './ModalGraphs/NodesPie'
import PluginsGraph from './ModalGraphs/Plugins'
import PluginsGraph1000 from './ModalGraphs/Plugins1000'
import PluginsGraph2500 from './ModalGraphs/Plugins2500'
import PluginsGraph500 from './ModalGraphs/Plugins500'
import TotalExecutorsGraph from './ModalGraphs/TotalExecutors'

interface GraphModalProps {
    open: boolean
    onClose: () => void
    type: GraphType
    year: string
    month: string
}

const GRAPH_LABELS: Record<GraphType, string> = {
    jenkins: 'Jenkins installations by version',
    jobs: 'Job executions',
    nodes: 'Nodes by type',
    nodesPie: 'Nodes by type breakdown',
    plugins: 'Plugin installations',
    'top-plugins500': 'Top plugins with more than 500 installations',
    'top-plugins1000': 'Top plugins with more than 1000 installations',
    'top-plugins2500': 'Top plugins with more than 2500 installations',
    'total-executors': 'Executors per install',
}

const getMonthName = (month: string) => {
    const monthIndex = Number(month) - 1
    if (!Number.isInteger(monthIndex) || monthIndex < 0 || monthIndex > 11) {
        return month
    }
    return new Date(2000, monthIndex, 1).toLocaleString('default', { month: 'long' })
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
            case 'nodesPie':
                return <NodesPieGraph year={year} month={month} />
            case 'plugins':
                return <PluginsGraph year={year} month={month} />
            case 'top-plugins1000':
                return <PluginsGraph1000 year={year} month={month} />
            case 'top-plugins2500':
                return <PluginsGraph2500 year={year} month={month} />
            case 'top-plugins500':
                return <PluginsGraph500 year={year} month={month} />
            case 'total-executors':
                return <TotalExecutorsGraph year={year} month={month} />
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
            }}
        >
            <Paper
                elevation={16}
                role="dialog"
                aria-modal="true"
                aria-label={`${GRAPH_LABELS[type]} chart for ${getMonthName(month)} ${year}`}
                sx={{
                    width: '70vw',
                    height: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 4,
                    backgroundColor: 'white',
                    borderRadius: 5,

                    '@media (prefers-color-scheme: dark)': {
                        backgroundColor: '#212529',
                    },
                }}
            >
                {renderGraph()}
            </Paper>
        </Modal>
    )
}

export default GraphModal
