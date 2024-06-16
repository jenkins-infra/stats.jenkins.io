import React, { useEffect, useMemo, useCallback } from 'react'
import * as echarts from 'echarts'
import useCSVData from '../../../hooks/useCSVData'
import usePluginCount from '../../../hooks/usePluginCount'
import { Box } from '@mui/material'

interface ChartProps {
    csvPath: string
    title: string
    width?: string
    height?: string
}

const Chart: React.FC<ChartProps> = ({ csvPath, title, width = '100%', height = '100%' }) => {
    const { data, error } = useCSVData(csvPath)
    const { pluginCount } = usePluginCount()

    const handleCSVDownload = useCallback(() => {
        const csvContent = data.map((row) => row.join(',')).join('\n')
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.href = url
        link.setAttribute('download', 'data.csv')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }, [data])

    const chartData = useMemo(() => {
        const dates = data
            .filter((row) => row[0] && row[0].length === 6)
            .map((row) => {
                const [year, month] = [row[0].slice(0, 4), row[0].slice(4, 6)]
                return { monthYear: `${month}-${year}`, year }
            })

        const values = data.map((row) => parseInt(row[1], 10)).filter((value) => !isNaN(value))
        const totalSum = values.reduce((acc, cur) => acc + cur, 0)

        return { dates, values, totalSum }
    }, [data])

    const option = useMemo(() => {
        const baseOption = {
            title: {
                text: title,
                left: 'center',
                textStyle: { fontSize: 20, fontWeight: 'bold' },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
            },
            xAxis: {
                type: 'category',
                data: chartData.dates.map((date) => date.monthYear),
                axisLabel: {
                    formatter: (_value: unknown, index: number) => {
                        const year = chartData.dates[index].year
                        return (index === 0 || year !== chartData.dates[index - 1].year) && parseInt(year) % 2 === 0
                            ? year
                            : ''
                    },
                    interval: 0,
                },
                axisTick: { show: false },
            },
            yAxis: {
                type: 'value',
                splitLine: { lineStyle: { type: 'dashed' } },
            },
            series: [
                {
                    data: chartData.values,
                    type: 'line',
                    itemStyle: { color: '#007FFF' },
                    smooth: true,
                    showSymbol: false,
                },
            ],
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 100,
                },
            ],
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {},
                    myCSVDownload: {
                        show: true,
                        title: 'Download CSV',
                        icon: 'path://M8 0H0v12h4v4l4-4h4V0H8zm0 2h2v2H8V2zm0 3h2v2H8V5zm0 3h2v2H8V8z',
                        onclick: handleCSVDownload,
                    },
                },
            },
            grid: { left: '0', right: '10', bottom: '20', top: '100', containLabel: true },
        }

        if (title.toLowerCase().includes('plugins')) {
            ;(baseOption as echarts.EChartsOption).graphic = {
                type: 'text',
                left: 'center',
                top: '40',
                style: {
                    text: `Available Plugins:  ${pluginCount.toLocaleString()}`,
                    fontSize: 14,
                    fontWeight: 'bold',
                    fill: 'blue',
                },
            }
        }
        return baseOption
    }, [chartData, title, pluginCount, handleCSVDownload])

    useEffect(() => {
        if (data.length === 0) return

        const chartDom = document.getElementById(title) as HTMLElement
        const myChart = echarts.init(chartDom)
        myChart.setOption(option)

        const handleResize = () => myChart.resize()
        window.addEventListener('resize', handleResize)

        return () => {
            myChart.dispose()
            window.removeEventListener('resize', handleResize)
        }
    }, [data, option, title])

    if (error) {
        return <div>Error loading data: {error.message}</div>
    }

    return (
        <Box
            sx={{
                width: '90%',
                height: '90%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div id={title} style={{ width, height }}></div>
        </Box>
    )
}

export default Chart

// import React, { useEffect, useMemo } from 'react'
// // import { Box, Button, styled } from '@mui/material'
// import * as echarts from 'echarts'
// // import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
// // import ImageIcon from '@mui/icons-material/Image'
// import useCSVData from '../../../hooks/useCSVData'
// import usePluginCount from '../../../hooks/usePluginCount'
// import { Box } from '@mui/material'

// interface ChartProps {
//     csvPath: string
//     title: string
//     width?: string
//     height?: string
// }

// // const DownloadButton = styled(Button)({
// //     margin: '0.5rem',
// //     padding: '0.75rem 1.5rem',
// //     backgroundColor: '#ffffff',
// //     borderRadius: '1rem',
// //     color: '#007BFF',
// //     fontWeight: '600',
// //     fontFamily: 'Arial, sans-serif',
// //     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
// //     transition: 'all 0.3s ease',
// //     border: '1px solid #e0e0e0',
// //     display: 'flex',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     '&:hover': {
// //         backgroundColor: '#f0f0f0',
// //         border: '1px solid #007BFF',
// //         color: '#0056b3',
// //         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
// //     },
// //     '@media (max-width: 900px)': {
// //         padding: '0.5rem 1rem',
// //         fontSize: '0.8rem',
// //     },
// // })

// const Chart: React.FC<ChartProps> = ({ csvPath, title, width = '100%', height = '100%' }) => {
//     const { data, error } = useCSVData(csvPath)
//     const { pluginCount } = usePluginCount()

//     // const formatNumber = (num: number) => {
//     //     if (num >= 1e9) {
//     //         return (num / 1e9).toFixed(1) + 'B'
//     //     } else if (num >= 1e6) {
//     //         return (num / 1e6).toFixed(1) + 'M'
//     //     } else if (num >= 1e3) {
//     //         return (num / 1e3).toFixed(1) + 'K'
//     //     } else {
//     //         return num.toString()
//     //     }
//     // }

//     const chartData = useMemo(() => {
//         const dates = data
//             .filter((row) => row[0] && row[0].length === 6)
//             .map((row) => {
//                 const [year, month] = [row[0].slice(0, 4), row[0].slice(4, 6)]
//                 return { monthYear: `${month}-${year}`, year }
//             })

//         const values = data.map((row) => parseInt(row[1], 10)).filter((value) => !isNaN(value))
//         const totalSum = values.reduce((acc, cur) => acc + cur, 0)

//         return { dates, values, totalSum }
//     }, [data])

//     const option = useMemo(() => {
//         const baseOption = {
//             title: {
//                 text: title,
//                 left: 'center',
//                 textStyle: { fontSize: 20, fontWeight: 'bold' },
//             },
//             tooltip: {
//                 trigger: 'axis',
//                 axisPointer: { type: 'shadow' },
//             },
//             xAxis: {
//                 type: 'category',
//                 data: chartData.dates.map((date) => date.monthYear),
//                 axisLabel: {
//                     formatter: (_value: unknown, index: number) => {
//                         const year = chartData.dates[index].year
//                         return (index === 0 || year !== chartData.dates[index - 1].year) && parseInt(year) % 2 === 0
//                             ? year
//                             : ''
//                     },
//                     interval: 0,
//                 },
//                 axisTick: { show: false },
//             },
//             yAxis: {
//                 type: 'value',
//                 splitLine: { lineStyle: { type: 'dashed' } },
//             },
//             series: [
//                 {
//                     data: chartData.values,
//                     type: 'line',
//                     itemStyle: { color: '#007FFF' },
//                     smooth: true,
//                     showSymbol: false,
//                 },
//             ],
//             dataZoom: [
//                 {
//                     type: 'inside',
//                     start: 0,
//                     end: 100,
//                 },
//                 // {
//                 //     start: 0,
//                 //     end: 100,
//                 // },
//             ],

//             toolbox: {
//                 feature: {
//                     restore: {},
//                     saveAsImage: {},
//                 },
//             },
//             grid: { left: '0', right: '00', bottom: '20', top: '90', containLabel: true },
//         }

//         if (title.toLowerCase().includes('plugins')) {
//             ;(baseOption as echarts.EChartsOption).graphic = {
//                 type: 'text',
//                 left: 'center',
//                 top: '40',
//                 style: {
//                     text: `Available Plugins:  ${pluginCount.toLocaleString()}`,
//                     fontSize: 14,
//                     fontWeight: 'bold',
//                     fill: 'blue',
//                 },
//             }
//         }
//         return baseOption
//     }, [chartData, title, pluginCount])

//     useEffect(() => {
//         if (data.length === 0) return

//         const chartDom = document.getElementById(title) as HTMLElement
//         const myChart = echarts.init(chartDom)
//         myChart.setOption(option)

//         const handleResize = () => myChart.resize()
//         window.addEventListener('resize', handleResize)

//         return () => {
//             myChart.dispose()
//             window.removeEventListener('resize', handleResize)
//         }
//     }, [data, option, title])

//     if (error) {
//         return <div>Error loading data: {error.message}</div>
//     }

//     // const handleCSVDownload = () => {
//     //     const link = document.createElement('a')
//     //     link.href = csvPath
//     //     link.download = csvPath.split('/').pop() || 'data.csv'
//     //     document.body.appendChild(link)
//     //     link.click()
//     //     document.body.removeChild(link)
//     // }

//     // const handleSVGDownload = () => {
//     //     const chartDom = document.getElementById(title) as HTMLElement
//     //     const myChart = echarts.init(chartDom)
//     //     const svg = myChart.getDataURL({ type: 'svg', backgroundColor: '#fff' })
//     //     const link = document.createElement('a')
//     //     link.href = svg
//     //     link.download = `${title}.svg`
//     //     document.body.appendChild(link)
//     //     link.click()
//     //     document.body.removeChild(link)
//     // }

//     return (
//         <Box
//             sx={{
//                 width: '90%',
//                 height: '90%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//             }}
//         >
//             <div id={title} style={{ width, height }}></div>
//             {/* //     <Box display="flex" alignItems="center" justifyContent="center" mt={3}>
//         //         <DownloadButton variant="contained" onClick={handleCSVDownload}>
//         //             <InsertDriveFileIcon style={{ marginRight: '0.5rem' }} />
//         //             CSV
//         //         </DownloadButton>
//         //         <DownloadButton variant="contained" onClick={handleSVGDownload}>
//         //             <ImageIcon style={{ marginRight: '0.5rem' }} />
//         //             SVG
//         //         </DownloadButton>
//         //     </Box> */}
//         </Box>
//     )
// }

// export default Chart
