import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import dayjs from 'dayjs'

type InstallationPercentageData = {
    [timestamp: string]: number
}

type DataType = {
    installationsPercentage: InstallationPercentageData
}

interface PluginInstallationsPercentageChartProps {
    data?: DataType
}

const PluginInstallationsPercentageChart: React.FC<PluginInstallationsPercentageChartProps> = ({ data }) => {
    const chartRef = useRef(null)

    useEffect(() => {
        if (!data || !data.installationsPercentage) {
            return
        }

        const chart = echarts.init(chartRef.current)

        const formattedData = Object.entries(data.installationsPercentage).map(([timestamp, percentage]) => ({
            date: dayjs(parseInt(timestamp)).format('MMM YYYY'),
            percentage,
        }))

        const option = {
            title: {
                text: 'Installations Percentage Over Time',
                left: 'center',
                textStyle: { fontSize: 16, fontWeight: 'bold' },
            },
            tooltip: {
                trigger: 'axis',
                formatter: '{b}: {c}%',
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
                data: formattedData.map((item) => item.date),
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
            yAxis: {
                type: 'value',
                name: 'Percentage (%)',
                nameTextStyle: {
                    fontSize: 12,
                    padding: [0, 0, 0, 50],
                },
                axisLabel: {
                    fontSize: 12,
                    // formatter: '{value}%',
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
            grid: {
                left: '5%',
                right: '5%',
                bottom: '15%',
                top: '10%',
            },
            series: [
                {
                    data: formattedData.map((item) => item.percentage * 100),
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        width: 2,
                        color: '#3f51b5',
                    },
                    itemStyle: {
                        color: '#3f51b5',
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
