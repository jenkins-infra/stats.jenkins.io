import React from 'react'
import { Box, Paper } from '@mui/material'
import NavBar from '../../components/Layout/NavBar'
import Chart from '../../components/Charts/OverallTrendsChart'
import StatisticsTable from '../../components/Charts/StatisticsTable'
import Sidebar from '../../components/Layout/Sidebar'
import useSidebarState from '../../hooks/useSidebarState'
import useSelectionState from '../../hooks/useSelectionState'
import './statistics.css'
import JVMChart from '../../components/Charts/JVMChart'

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

                <Box
                    sx={{
                        flexGrow: 1,
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '2rem',
                    }}
                >
                    {selectedTab === 'monthly' && <StatisticsTable year={selectedYear} />}
                    {selectedTab === 'overall' && (
                        <>
                            {selectedChart && (
                                <Paper
                                    elevation={16}
                                    sx={{
                                        height: '100%',
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#f5f5f5',
                                        borderRadius: '1.5rem',
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
        </Box>
    )
}

export default Statistics
