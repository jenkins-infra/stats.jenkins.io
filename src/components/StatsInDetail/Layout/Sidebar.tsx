import React from 'react'
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
import { data } from '../../../data/statisticsData'

const ListButton = styled(ListItemButton)({
    '&.Mui-selected': {
        backgroundImage: 'linear-gradient(315deg, #007FFF 0%, #005BBB 74%)',
    },
    '&:hover': {
        backgroundImage: 'linear-gradient(315deg, #CCCCCC 0%, #AAAAAA 74%)',
    },
    borderRadius: '0.5rem',
    width: '90%',
    margin: 'auto',
})

const ListText = styled(ListItemText)({
    color: 'white',
    fontFamily: 'Georgia',
    fontWeight: 'bold',
})

const AccordionSummaryBox = styled(AccordionSummary)({
    backgroundColor: '#3A3A3A',
    color: 'white',
    width: '90%',
    margin: 'auto',
    borderRadius: '0.5rem',
    height: '50px',
    minHeight: '50px',
    '&.Mui-expanded': {
        height: '50px',
        minHeight: '50px',
    },
})

const StyledAccordion = styled(Accordion)({
    backgroundColor: '#212529', //dark blue
    marginBottom: '8px',
    boxShadow: 'none',
    border: 'none',
})

const drawerWidthOpen = '20rem'
const drawerWidthClosed = '4rem'

interface SidebarProps {
    sidebarOpen: boolean
    toggleSidebar: () => void
    selectedChart: string | null
    selectedYear: string | null
    // eslint-disable-next-line no-unused-vars
    handleChartSelect: (chart: string) => void
    // eslint-disable-next-line no-unused-vars
    handleYearSelect: (year: string | null) => void
}

const Sidebar: React.FC<SidebarProps> = ({
    sidebarOpen,
    toggleSidebar,
    selectedChart,
    selectedYear,
    handleChartSelect,
    handleYearSelect,
}) => {
    const handleItemClick = (callback: () => void) => {
        callback()
        toggleSidebar()
    }

    return (
        <>
            <Box // Sidebar toggle button
                sx={{
                    width: '2.5rem',
                    height: '100%',
                    backgroundColor: '#212529',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '0.5rem',
                    cursor: 'pointer',
                }}
                onClick={toggleSidebar}
            >
                <MenuIcon sx={{ color: 'white' }} />
            </Box>

            <Drawer
                variant="temporary"
                anchor="left"
                open={sidebarOpen}
                onClose={toggleSidebar}
                sx={{
                    width: sidebarOpen ? drawerWidthOpen : drawerWidthClosed,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: sidebarOpen ? drawerWidthOpen : drawerWidthClosed,
                        boxSizing: 'border-box',
                        backgroundColor: '#212529',
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
                        padding: '0.5rem',
                        zIndex: 1,
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
                        <StyledAccordion defaultExpanded>
                            <AccordionSummaryBox expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                                <Typography>Overall Trends</Typography>
                            </AccordionSummaryBox>
                            <AccordionDetails>
                                <List>
                                    {['plugins', 'jobs', 'jenkins', 'nodes', 'JVMs'].map((chart) => (
                                        <ListButton
                                            key={chart}
                                            selected={selectedChart === chart}
                                            onClick={() => handleItemClick(() => handleChartSelect(chart))}
                                        >
                                            <ListText primary={`${chart.charAt(0).toUpperCase() + chart.slice(1)}`} />
                                        </ListButton>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </StyledAccordion>
                        <StyledAccordion defaultExpanded>
                            <AccordionSummaryBox
                                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                                sx={{ backgroundColor: '#3A3A3A', color: 'white' }}
                            >
                                <Typography>Monthly Analysis</Typography>
                            </AccordionSummaryBox>
                            <AccordionDetails sx={{ overflowY: 'auto' }}>
                                <List>
                                    <ListButton
                                        selected={selectedYear === 'all'}
                                        onClick={() => handleItemClick(() => handleYearSelect('all'))}
                                    >
                                        <ListText primary="All Data" />
                                    </ListButton>
                                    {[...new Set(data.map((row) => row.year))].map((year) => (
                                        <ListButton
                                            key={year}
                                            selected={selectedYear === year}
                                            onClick={() => handleItemClick(() => handleYearSelect(year))}
                                        >
                                            <ListText primary={year} />
                                        </ListButton>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </StyledAccordion>
                    </List>
                )}
            </Drawer>
        </>
    )
}

export default Sidebar
