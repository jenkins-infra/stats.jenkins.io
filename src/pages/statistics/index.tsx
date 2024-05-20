import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import NavBar from '../../components/NavBar'
import Chart from '../../components/Chart'
import './statistics.css'

const Statistics: React.FC = () => {
    return (
        <>
            <NavBar />
            <Box className="background">
                <Typography
                    variant="h4"
                    sx={{ fontFamily: 'Montserrat', fontWeight: 'bold', marginTop: '2rem', color: 'black' }}
                >
                    Jenkins Infra-Statistics In Detail
                </Typography>
                <Box sx={{ justifyContent: 'center', padding: '4rem' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <Chart csvPath="/src/data/total-plugins.csv" title="Plugins Usage Over Time" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Chart csvPath="/src/data/total-jobs.csv" title="Total Jobs Over Time" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Chart
                                csvPath="/src/data/total-jenkins.csv"
                                title="Total Jenkins Installations Over Time"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Chart csvPath="/src/data/total-nodes.csv" title="Total Nodes Over Time" />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default Statistics

// import React, { useEffect } from 'react'
// import { Box } from '@mui/material'
// import NavBar from '../../components/NavBar'
// import * as echarts from 'echarts'
// import Papa from 'papaparse'
// import './statistics.css'

// const Statistics: React.FC = () => {
//     useEffect(() => {
//         // Function to load and parse CSV file
//         const loadCSVData = async () => {
//             const response = await fetch('/src/data/total-plugins.csv')
//             const csvText = await response.text()
//             const parsedData = Papa.parse(csvText, { header: false })
//             return parsedData.data
//         }

//         // Initialize the chart
//         const chartDom = document.getElementById('main') as HTMLElement
//         const myChart = echarts.init(chartDom)

//         // Set up the chart with data
//         const setupChart = (data: string[][]) => {
//             // const dates = data.map((row) => row[0])
//             const dates = data.map((row) => {
//                 const dateStr = row[0]
//                 const year = dateStr.slice(0, 4)
//                 const month = dateStr.slice(4, 6)
//                 return `${month}-${year}`
//             })
//             const values = data.map((row) => parseInt(row[1], 10))

//             const option: echarts.EChartsOption = {
//                 title: {
//                     text: 'Plugins Usage Over Time',
//                 },
//                 tooltip: {},
//                 xAxis: {
//                     type: 'category',
//                     data: dates,
//                     axisLabel: {
//                         show: false, // Hide the axis labels
//                     },
//                 },
//                 yAxis: {
//                     type: 'value',
//                 },
//                 series: [
//                     {
//                         data: values,
//                         type: 'bar',
//                     },
//                 ],
//             }

//             myChart.setOption(option)
//         }

//         loadCSVData().then((data) => {
//             setupChart(data as string[][])
//         })

//         // Cleanup the chart on unmount
//         return () => {
//             myChart.dispose()
//         }
//     }, [])

//     return (
//         <>
//             <NavBar />
//             <Box className="background">
//                 <div className="top">
//                     Page Under Construction
//                     <h1 className="sta">Statistics</h1>
//                     <p>test</p>
//                     <div id="main" style={{ width: '800px', height: '400px' }}></div>
//                 </div>
//             </Box>
//         </>
//     )
// }

// export default Statistics
