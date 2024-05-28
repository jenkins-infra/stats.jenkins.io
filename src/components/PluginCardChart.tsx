import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import dayjs from 'dayjs'

const PluginCardChart = ({ data }) => {
    const chartRef = useRef(null)

    useEffect(() => {
        if (!data || !data.installations) {
            return
        }

        const chart = echarts.init(chartRef.current)

        const formattedData = Object.entries(data.installations).map(([timestamp, installations]) => ({
            date: dayjs(parseInt(timestamp)).format('MMM YYYY'),
            installations,
        }))

        const option = {
            tooltip: {
                trigger: 'axis',
                formatter: '{b}: {c} installations',
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

                // show: false,
            },
            xAxis: {
                type: 'category',
                data: formattedData.map((item) => item.date),
                show: false,
                axisLabel: {
                    formatter: (value: unknown, index: number) => {
                        // Show only the first and last labels
                        if (index === 0 || index === formattedData.length - 1) {
                            return value
                        }
                        return ''
                    },

                    fontSize: 10,
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
            },
            yAxis: {
                type: 'value',
                name: 'Installations',

                show: false,

                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                nameTextStyle: {
                    fontSize: 10,
                },
            },
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                top: '3%',
            },
            series: [
                {
                    data: formattedData.map((item) => item.installations),
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        width: 2,
                    },
                    itemStyle: {
                        opacity: 0,
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

    return <div ref={chartRef} style={{ height: '200px', width: '100%' }} />
}

export default PluginCardChart
