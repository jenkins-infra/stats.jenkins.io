import React, { useEffect, useState } from 'react'
import {
    Box,
    Typography,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    styled,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import NavBar from '../../components/NavBar'
import Chart from '../../components/Chart'
import StatisticsTable from '../../components/StatisticsTable'
import { data } from '../../data/statisticsData'
import './statistics.css'
import Footer from '../../components/Footer'

const ListButton = styled(ListItemButton)({
    '&.Mui-selected': {
        backgroundColor: '#007FFF',
        '&:hover': {
            backgroundColor: '#005BBB',
        },
    },
    '&:hover': {
        backgroundColor: '#CCCCCC',
    },
})

const ListText = styled(ListItemText)({
    color: 'white',
    fontFamily: 'Georgia',
    fontWeight: 'bold',
})

const drawerWidthOpen = '20vw'
const drawerWidthClosed = '4vw'

const Statistics: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [selectedChart, setSelectedChart] = useState<string | null>('plugins')
    const [selectedTab, setSelectedTab] = useState<string | null>('overall')
    const [selectedYear, setSelectedYear] = useState<number | null>(null)

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const handleChartSelect = (chart: string) => {
        setSelectedChart(chart)
        setSelectedTab('overall')
        setSelectedYear(null) // deselect any year when selecting a chart
        if (window.innerWidth < 600) {
            setSidebarOpen(false)
        }
    }

    const handleYearSelect = (year: number | null) => {
        setSelectedYear(year)
        setSelectedTab('monthly')
        setSelectedChart(null) // deselect any chart when selecting a year
    }

    useEffect(() => {
        setSelectedChart('plugins')
        setSelectedTab('overall')
    }, [])

    return (
        <Box className="background" sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    overflow: 'hidden',
                    width: '100%',
                    flexDirection: 'row',
                }}
            >
                <Drawer
                    variant="permanent"
                    anchor="left"
                    open={sidebarOpen}
                    sx={{
                        width: sidebarOpen ? drawerWidthOpen : drawerWidthClosed,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: sidebarOpen ? drawerWidthOpen : drawerWidthClosed,
                            boxSizing: 'border-box',
                            backgroundColor: '#2D2D2D',
                            transition: 'width 0.3s',
                            position: 'relative',
                            left: 0,
                        },
                    }}
                >
                    <Box
                        sx={{
                            position: 'sticky',
                            top: 0,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            backgroundColor: 'inherit',
                            zIndex: 1000,
                            padding: '0.5rem',
                        }}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="toggle drawer"
                            edge="start"
                            onClick={toggleSidebar}
                            sx={{ color: 'white' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    {sidebarOpen && (
                        <List>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                                    sx={{ backgroundColor: '#3A3A3A', color: 'white' }}
                                    onClick={() => setSelectedTab('overall')}
                                >
                                    <Typography>Overall Trends</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ backgroundColor: '#1A1A1A' }}>
                                    <List>
                                        <ListButton
                                            selected={selectedChart === 'plugins'}
                                            onClick={() => handleChartSelect('plugins')}
                                        >
                                            <ListText primary="Plugins Usage Over Time" />
                                        </ListButton>
                                        <ListButton
                                            selected={selectedChart === 'jobs'}
                                            onClick={() => handleChartSelect('jobs')}
                                        >
                                            <ListText primary="Total Jobs Over Time" />
                                        </ListButton>
                                        <ListButton
                                            selected={selectedChart === 'jenkins'}
                                            onClick={() => handleChartSelect('jenkins')}
                                        >
                                            <ListText primary="Total Jenkins Installations Over Time" />
                                        </ListButton>
                                        <ListButton
                                            selected={selectedChart === 'nodes'}
                                            onClick={() => handleChartSelect('nodes')}
                                        >
                                            <ListText primary="Total Nodes Over Time" />
                                        </ListButton>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                                    sx={{ backgroundColor: '#3A3A3A', color: 'white' }}
                                    onClick={() => setSelectedTab('monthly')}
                                >
                                    <Typography>Monthly Analysis</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ backgroundColor: '#1A1A1A', overflowY: 'auto' }}>
                                    <List>
                                        <ListButton
                                            selected={selectedYear === null}
                                            onClick={() => handleYearSelect(null)}
                                        >
                                            <ListText primary="All Data" />
                                        </ListButton>
                                        {[...new Set(data.map((row) => row.year))].map((year) => (
                                            <ListButton
                                                key={year}
                                                selected={selectedYear === year}
                                                onClick={() => handleYearSelect(year)}
                                            >
                                                <ListText primary={year} />
                                            </ListButton>
                                        ))}
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        </List>
                    )}
                </Drawer>

                <Box
                    sx={{
                        flexGrow: 1,
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        // justifyContent: 'center',
                        padding: '2rem',
                    }}
                >
                    {selectedTab === 'monthly' && <StatisticsTable year={selectedYear || undefined} />}
                    {selectedTab === 'overall' && (
                        <>
                            {selectedChart === 'plugins' && (
                                <Chart csvPath="/src/data/total-plugins.csv" title="Plugins Usage Over Time" />
                            )}
                            {selectedChart === 'jobs' && (
                                <Chart csvPath="/src/data/total-jobs.csv" title="Total Jobs Over Time" />
                            )}
                            {selectedChart === 'jenkins' && (
                                <Chart
                                    csvPath="/src/data/total-jenkins.csv"
                                    title="Total Jenkins Installations Over Time"
                                />
                            )}
                            {selectedChart === 'nodes' && (
                                <Chart csvPath="/src/data/total-nodes.csv" title="Total Nodes Over Time" />
                            )}
                        </>
                    )}
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}

export default Statistics
