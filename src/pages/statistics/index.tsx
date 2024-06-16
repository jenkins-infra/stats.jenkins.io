import React from 'react'
import { Box, Paper } from '@mui/material'
import NavBar from '../../components/Layout/NavBar'
import Chart from '../../components/StatsInDetail/Charts/OverallTrendsChart'
import StatisticsTable from '../../components/StatsInDetail/Charts/StatisticsTable'
import Sidebar from '../../components/StatsInDetail/Layout/Sidebar'
import useSidebarState from '../../hooks/useSidebarState'
import useSelectionState from '../../hooks/useSelectionState'
import './statistics.css'
import JVMChart from '../../components/StatsInDetail/Charts/JVMChart'

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

    return (
        <Box
            className="background"
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
            }}
        >
            <NavBar />
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
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    toggleSidebar={toggleSidebar}
                    selectedChart={selectedChart}
                    selectedYear={selectedYear}
                    handleChartSelect={handleChartSelect}
                    handleYearSelect={handleYearSelect}
                />

                {selectedTab === 'monthly' && <StatisticsTable year={selectedYear} />}
                {selectedTab === 'overall' && (
                    <>
                        {selectedChart && (
                            <Paper
                                elevation={16}
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '3rem',
                                    margin: '2rem',
                                    backgroundColor: 'white',
                                    borderRadius: 5,
                                }}
                            >
                                {selectedChart === 'JVMs' ? (
                                    <JVMChart title={chartTitles[selectedChart]} />
                                ) : (
                                    <Chart
                                        key={`${selectedChart}-${sidebarOpen}`} // Force re-render on sidebar open/close
                                        csvPath={`https://raw.githubusercontent.com/jenkins-infra/infra-statistics/gh-pages/jenkins-stats/svg/total-${selectedChart}.csv`}
                                        title={chartTitles[selectedChart]}
                                    />
                                )}
                            </Paper>
                        )}
                    </>
                )}
            </Box>
        </Box>
    )
}

export default Statistics
