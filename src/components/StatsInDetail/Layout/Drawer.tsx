import React from 'react'
import {
    Box,
    Typography,
    SwipeableDrawer,
    Drawer as MuiDrawer,
    List,
    ListItemButton,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    styled,
    IconButton,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MenuIcon from '@mui/icons-material/Menu'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { data } from '../../../utils/generateDateArray'

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
    fontWeight: 'bold',
    marginTop: '2px',
    marginBottom: '2px',
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
        marginTop: '0',
    },
})

const StyledAccordion = styled(Accordion)({
    backgroundColor: '#212529', // dark blue
    marginBottom: '10px',
    boxShadow: 'none',
    border: 'none',
    '&.Mui-expanded': {
        margin: '0',
    },
})

const drawerWidthOpen = '20rem'
const drawerWidthClosed = '4rem'
const drawerBleeding = 56

interface DrawerProps {
    sidebarOpen: boolean
    toggleSidebar: () => void
    selectedChart: string | null
    selectedYear: string | null
    // eslint-disable-next-line no-unused-vars
    handleChartSelect: (chart: string) => void
    // eslint-disable-next-line no-unused-vars
    handleYearSelect: (year: string | null) => void
    isMobile: boolean
}

const Drawer: React.FC<DrawerProps> = ({
    sidebarOpen,
    toggleSidebar,
    selectedChart,
    selectedYear,
    handleChartSelect,
    handleYearSelect,
    isMobile,
}) => {
    const handleItemClick = (callback: () => void) => {
        callback()
        toggleSidebar()
    }

    const DrawerContent = (
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
                <AccordionSummaryBox expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
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
    )

    return isMobile ? (
        <SwipeableDrawer
            anchor="bottom"
            open={sidebarOpen}
            onClose={toggleSidebar}
            onOpen={toggleSidebar}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                '& .MuiDrawer-paper': {
                    height: `calc(50% - ${drawerBleeding}px)`,
                    overflow: 'visible',
                    backgroundColor: '#212529',
                },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: -drawerBleeding,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    visibility: 'visible',
                    right: 0,
                    left: 0,
                    backgroundColor: '#3A3A3A',
                    height: drawerBleeding,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 8,
                        left: 'calc(50% - 15px)',
                    }}
                >
                    {sidebarOpen ? (
                        <KeyboardArrowDownIcon sx={{ color: 'white' }} />
                    ) : (
                        <KeyboardDoubleArrowUpIcon sx={{ color: 'white' }} />
                    )}
                </Box>
            </Box>
            <Box
                sx={{
                    px: 2,
                    pb: 2,
                    height: '100%',
                    overflow: 'auto',
                }}
            >
                {DrawerContent}
            </Box>
        </SwipeableDrawer>
    ) : (
        <>
            <Box
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

            <MuiDrawer
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

                {sidebarOpen && DrawerContent}
            </MuiDrawer>
        </>
    )
}

export default Drawer
