import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { PluginChartProps } from '../data/plugins'

const PluginInstallationsPercentageChart: React.FC<PluginChartProps> = ({ data }) => {
    const chartRef = useRef(null)

    useEffect(() => {
        if (!data || !data.installationsPercentage || !data.installations) {
            return
        }

        const chart = echarts.init(chartRef.current)

        console.log(data.installationsPercentage)

        const formattedPercentageData = Object.entries(data.installationsPercentage).map(([timestamp, percentage]) => ({
            date: dayjs(parseInt(timestamp)).format('MMM YYYY'),
            percentage: percentage / 100,
        }))

        const formattedInstallationsData = Object.entries(data.installations).map(([timestamp, installations]) => ({
            date: dayjs(parseInt(timestamp)).format('MMM YYYY'),
            installations,
        }))

        const installationsPerPercentage = formattedInstallationsData.map((item, index) => {
            const percentage = formattedPercentageData[index]?.percentage || 0
            return percentage ? (item.installations / percentage) * 100 : 0
        })

        const option = {
            title: {
                text: 'Installations Percentage and Total Over Time',
                left: 'center',
                textStyle: { fontSize: 16, fontWeight: 'bold' },
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#333',
                borderColor: '#777',
                borderWidth: 1,
                textStyle: {
                    color: '#fff',
                },
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: '#777',
                    },
                },
            },
            xAxis: {
                type: 'category',
                data: formattedPercentageData.map((item) => item.date),
                axisLabel: {
                    fontSize: 12,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#777',
                    },
                },
                axisTick: {
                    show: true,
                },
            },
            yAxis: [
                {
                    type: 'value',
                    name: 'Percentage (%)',
                    nameTextStyle: {
                        fontSize: 12,
                        padding: [0, 0, 0, 50],
                    },
                    axisLabel: {
                        fontSize: 12,
                        formatter: function (value: number) {
                            return value === 0 ? '' : `${value}%`
                        },
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#777',
                        },
                    },
                    axisTick: {
                        show: true,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                        },
                    },
                },
                {
                    type: 'value',
                    name: 'Installations',
                    nameTextStyle: {
                        fontSize: 12,
                        padding: [0, 50, 0, 0],
                    },
                    axisLabel: {
                        fontSize: 12,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#777',
                        },
                    },
                    axisTick: {
                        show: true,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                        },
                    },
                },
            ],
            grid: {
                left: '5%',
                right: '5%',
                bottom: '15%',
                top: '10%',
            },
            series: [
                {
                    name: 'Installations Percentage',
                    data: formattedPercentageData.map((item) => item.percentage * 100),
                    type: 'bar',
                    smooth: true,
                    lineStyle: {
                        width: 2,
                        color: '#3f51b5',
                    },
                    itemStyle: {
                        color: '#3f51b5',
                    },
                },
                {
                    name: 'Installations',
                    data: installationsPerPercentage,
                    type: 'line',
                    yAxisIndex: 1,
                    smooth: true,
                    lineStyle: {
                        width: 2,
                        color: '#ff5722',
                    },
                    itemStyle: {
                        color: '#ff5722',
                    },
                },
            ],
        }

        chart.setOption(option)

        const handleResize = () => {
            chart.resize()
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            chart.dispose()
        }
    }, [data])

    return <div ref={chartRef} style={{ height: '400px', width: '100%' }} />
}

export default PluginInstallationsPercentageChart

// import React, { useEffect, useRef } from 'react'
// import * as echarts from 'echarts'
// import dayjs from 'dayjs'
// import { PluginChartProps } from '../data/plugins'

// const PluginInstallationsPercentageChart: React.FC<PluginChartProps> = ({ data }) => {
//     const chartRef = useRef(null)

//     useEffect(() => {
//         if (!data || !data.installationsPercentage) {
//             return
//         }

//         const chart = echarts.init(chartRef.current)

//         console.log(data.installationsPercentage)

//         const formattedData = Object.entries(data.installationsPercentage).map(([timestamp, percentage]) => ({
//             date: dayjs(parseInt(timestamp)).format('MMM YYYY'),
//             percentage,
//         }))

//         const option = {
//             title: {
//                 text: 'Installations Percentage Over Time',
//                 left: 'center',
//                 textStyle: { fontSize: 16, fontWeight: 'bold' },
//             },
//             tooltip: {
//                 trigger: 'axis',
//                 formatter: '{b}: {c}%',
//                 backgroundColor: '#333',
//                 borderColor: '#777',
//                 borderWidth: 1,
//                 textStyle: {
//                     color: '#fff',
//                 },
//                 axisPointer: {
//                     type: 'line',
//                     lineStyle: {
//                         color: '#777',
//                     },
//                 },
//             },
//             xAxis: {
//                 type: 'category',
//                 data: formattedData.map((item) => item.date),
//                 axisLabel: {
//                     fontSize: 12,
//                 },
//                 axisLine: {
//                     show: true,
//                     lineStyle: {
//                         color: '#777',
//                     },
//                 },
//                 axisTick: {
//                     show: true,
//                 },
//             },
//             yAxis: {
//                 type: 'value',
//                 name: 'Percentage (%)',
//                 nameTextStyle: {
//                     fontSize: 12,
//                     padding: [0, 0, 0, 50],
//                 },
//                 axisLabel: {
//                     fontSize: 12,
//                     // formatter: '{value}%',
//                     formatter: function (value: number) {
//                         return value === 0 ? '' : `${value}%`
//                     },
//                 },
//                 axisLine: {
//                     show: true,
//                     lineStyle: {
//                         color: '#777',
//                     },
//                 },
//                 axisTick: {
//                     show: true,
//                 },
//                 splitLine: {
//                     show: true,
//                     lineStyle: {
//                         type: 'dashed',
//                     },
//                 },
//             },
//             grid: {
//                 left: '5%',
//                 right: '5%',
//                 bottom: '15%',
//                 top: '10%',
//             },
//             series: [
//                 {
//                     data: formattedData.map((item) => item.percentage * 100),
//                     type: 'bar',
//                     smooth: true,
//                     lineStyle: {
//                         width: 2,
//                         color: '#3f51b5',
//                     },
//                     itemStyle: {
//                         color: '#3f51b5',
//                     },
//                 },
//             ],
//         }

//         chart.setOption(option)

//         const handleResize = () => {
//             chart.resize()
//         }

//         window.addEventListener('resize', handleResize)

//         return () => {
//             window.removeEventListener('resize', handleResize)
//             chart.dispose()
//         }
//     }, [data])

//     return <div ref={chartRef} style={{ height: '400px', width: '100%' }} />
// }

// export default PluginInstallationsPercentageChart
