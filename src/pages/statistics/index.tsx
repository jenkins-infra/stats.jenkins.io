import React, { useState } from 'react'
import { Box, Paper, Stack, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import Chart from '../../components/StatsInDetail/Charts/OverallTrendsChart'
import StatisticsTable from '../../components/StatsInDetail/Charts/StatisticsTable'
import useSidebarState from '../../hooks/useSidebarState'
import useSelectionState from '../../hooks/useSelectionState'
import useIsMobile from '../../hooks/useIsMobile'
import Drawer from '../../components/StatsInDetail/Layout/Drawer'
import useCSVData from '../../hooks/useCSVData'
import usePluginCount from '../../hooks/useGetPluginNamesAndCount'
import useJVMData from '../../hooks/useJVMData'
import JVMChart from '../../components/StatsInDetail/Charts/JVMChart'
import BackToHome from '../../components/Layout/BackToHome'

const chartTitles: Record<string, string> = {
    plugins: 'Monthly Plugins Usage',
    jobs: 'Total Jobs Over Time',
    jenkins: 'Monthly Jenkins Installations',
    nodes: 'Total Nodes Over Time',
}

const defaultChart = 'plugins'

const Statistics: React.FC = () => {
    const { sidebarOpen, toggleSidebar } = useSidebarState()
    const { selectedChart, selectedTab, selectedYear, handleChartSelect, handleYearSelect } = useSelectionState()
    const isMobile = useIsMobile()

    const pluginData = useCSVData('total-plugins').data
    const jobsData = useCSVData('total-jobs').data
    const jenkinsData = useCSVData('total-jenkins').data
    const nodesData = useCSVData('total-nodes').data
    const jvmData = useJVMData().data

    const csvData: Record<string, string[][]> = {
        plugins: pluginData,
        jobs: jobsData,
        jenkins: jenkinsData,
        nodes: nodesData,
    }

    const { pluginCount } = usePluginCount()

    const [secondChart, setSecondChart] = useState<string | undefined>(undefined)

    const handleSecondChartSelect = (event: SelectChangeEvent<string>) => {
        setSecondChart(event.target.value as string)
    }

    const availableCharts = Object.keys(chartTitles).filter((chart) => chart !== selectedChart)

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
                    '@media (prefers-color-scheme: dark)': {
                        backgroundColor: '#333333',
                    },
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
                            paddingTop: '1rem',
                            margin: '2rem',
                            backgroundColor: 'white',
                            borderRadius: 5,
                            '@media (max-width: 768px)': {
                                padding: '1rem',
                                margin: '1rem',
                            },
                            '@media (prefers-color-scheme: dark)': {
                                backgroundColor: 'black',
                            },
                        }}
                    >
                        <BackToHome
                            color={
                                window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
                                    ? 'white'
                                    : 'black'
                            }
                        />
                        {selectedChart !== 'JVMs' && (
                            <FormControl sx={{ alignSelf: 'flex-start', minWidth: '128px' }}>
                                <InputLabel id="comparison-chart-select-label">Compare</InputLabel>
                                <Select
                                    labelId="second-chart-select-label"
                                    id="second-chart-select"
                                    value={secondChart || ''}
                                    onChange={handleSecondChartSelect}
                                    label="Overlay Chart"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {availableCharts.map((chart) => (
                                        <MenuItem key={chart} value={chart}>
                                            {chartTitles[chart]}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}

                        {selectedChart === 'JVMs' ? (
                            <JVMChart title={'JVMs By Date'} data={jvmData} />
                        ) : (
                            <Chart
                                key={selectedChart}
                                csvData={csvData}
                                title={selectedChart == null ? chartTitles[defaultChart] : chartTitles[selectedChart]}
                                pluginCount={pluginCount}
                                selectedChart={selectedChart == null ? defaultChart : selectedChart}
                                secondChart={secondChart}
                            />
                        )}
                    </Paper>
                )}
            </Box>
        </Stack>
    )
}

export default Statistics
