import React from 'react'
import { Box, Paper, Stack } from '@mui/material'
import Chart from '../../components/StatsInDetail/Charts/OverallTrendsChart'
import StatisticsTable from '../../components/StatsInDetail/Charts/StatisticsTable'
import useSidebarState from '../../hooks/useSidebarState'
import useSelectionState from '../../hooks/useSelectionState'
import useIsMobile from '../../hooks/useIsMobile'
import JVMChart from '../../components/StatsInDetail/Charts/JVMChart'
import Drawer from '../../components/StatsInDetail/Layout/Drawer'

const chartTitles: Record<string, string> = {
    plugins: 'Monthly Plugins Usage',
    jobs: 'Total Jobs Over Time',
    jenkins: 'Monthly Jenkins Installations',
    nodes: 'Total Nodes Over Time',
    JVMs: 'JVMs By Date',
}

const Statistics: React.FC = () => {
    const { sidebarOpen, toggleSidebar } = useSidebarState()
    const { selectedChart, selectedTab, selectedYear, handleChartSelect, handleYearSelect } = useSelectionState()
    const isMobile = useIsMobile()
    const csvPath = `src/data/infra-statistics/jenkins-stats/svg/total-${selectedChart}.csv`

    return (
        <Stack
            className="background"
            sx={{
                width: '100vw',
                height: '100vh',
                backgroundColor: 'white',
                overflow: 'auto',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    overflow: 'hidden',
                    width: '100%',
                    flexDirection: 'row',
                    backgroundColor: '#d5d5d5',
                }}
            >
                <Drawer
                    sidebarOpen={sidebarOpen}
                    toggleSidebar={toggleSidebar}
                    selectedChart={selectedChart}
                    selectedYear={selectedYear}
                    handleChartSelect={handleChartSelect}
                    handleYearSelect={handleYearSelect}
                    isMobile={isMobile}
                />

                {selectedTab === 'monthly' && (
                    <Paper
                        elevation={16}
                        sx={{
                            borderRadius: '1rem',
                            margin: '2rem',
                            marginBottom: 'auto',
                            maxHeight: isMobile ? 'calc(100vh - 168px)' : 'calc(100vh - 100px)',
                            overflow: 'hidden',
                        }}
                    >
                        <StatisticsTable year={selectedYear} />
                    </Paper>
                )}
                {selectedTab === 'overall' && (
                    <>
                        {selectedChart && (
                            <Paper
                                elevation={16}
                                sx={{
                                    width: '100%',
                                    maxHeight: isMobile ? 'calc(100vh - 180px)' : 'calc(100vh - 128px)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '3rem',
                                    margin: '2rem',
                                    backgroundColor: 'white',
                                    borderRadius: 5,
                                    '@media (max-width: 768px)': {
                                        padding: '1rem',
                                        margin: '1rem',
                                    },
                                }}
                            >
                                {selectedChart === 'JVMs' ? (
                                    <JVMChart title={chartTitles[selectedChart]} />
                                ) : (
                                    <Chart
                                        key={`${selectedChart}`}
                                        csvPath={csvPath}
                                        title={chartTitles[selectedChart]}
                                    />
                                )}
                            </Paper>
                        )}
                    </>
                )}
            </Box>
        </Stack>
    )
}

export default Statistics
