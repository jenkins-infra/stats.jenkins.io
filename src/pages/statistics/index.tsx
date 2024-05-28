import React, { useEffect } from 'react'
import { Box, Paper } from '@mui/material'
import NavBar from '../../components/NavBar'
import Chart from '../../components/Chart'
import StatisticsTable from '../../components/StatisticsTable'
import Sidebar from '../../components/Sidebar'
import useSidebarState from '../../hooks/useSidebarState'
import useSelectionState from '../../hooks/useSelectionState'
import './statistics.css'

const chartTitles: Record<string, string> = {
    plugins: 'Plugins Usage Over Time',
    jobs: 'Total Jobs Over Time',
    jenkins: 'Total Jenkins Installations Over Time',
    nodes: 'Total Nodes Over Time',
}

const Statistics: React.FC = () => {
    const { sidebarOpen, toggleSidebar } = useSidebarState()
    const { selectedChart, selectedTab, selectedYear, handleChartSelect, handleYearSelect } = useSelectionState()

    useEffect(() => {
        handleChartSelect('plugins')
    }, [handleChartSelect])

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
                                    // square={false}
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
                                    <Chart
                                        csvPath={`https://raw.githubusercontent.com/jenkins-infra/infra-statistics/gh-pages/jenkins-stats/svg/total-${selectedChart}.csv`}
                                        title={chartTitles[selectedChart]}
                                    />
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
