import React, { useEffect, useRef, useMemo } from 'react'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { PluginChartProps } from '../../../types/types'
import customTheme from '../../../theme/customTheme'
import useSystemTheme from '../../../hooks/useSystemTheme'

echarts.registerTheme('customTheme', customTheme)

const PluginInstallationsPercentageChart: React.FC<PluginChartProps> = ({ data }) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
    const { systemTheme } = useSystemTheme()

    const chartData = useMemo(() => {
        if (!data || !data.installationsPercentage || !data.installations) {
            return {
                formattedPercentageData: [],
                formattedInstallationsData: [],
                installationsPerPercentage: [],
            }
        }

        const formattedPercentageData = Object.entries(data.installationsPercentage).map(([timestamp, percentage]) => ({
            date: dayjs(parseInt(timestamp)).format('MMM YYYY'),
            percentage: percentage / 100,
        }))

        const formattedInstallationsData = Object.entries(data.installations).map(([timestamp, installations]) => ({
            date: dayjs(parseInt(timestamp)).format('MMM YYYY'),
            installations: installations / 100,
        }))

        const installationsPerPercentage = formattedInstallationsData.map((item, index) => {
            const percentage = formattedPercentageData[index]?.percentage || 0
            return percentage ? (item.installations / percentage) * 100 : 0
        })

        return {
            formattedPercentageData,
            formattedInstallationsData,
            installationsPerPercentage,
        }
    }, [data])

    const option = useMemo(() => {
        return {
            title: {
                text: 'Monthly Installations (%)',
                left: 'center',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: systemTheme === 'dark' ? 'white' : '',
                },
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter: function (params: any) {
                    const percentage = params[0].value.toFixed(3)
                    const installations = Math.round(params[1].value).toLocaleString()
                    return `
                        ${params[0].axisValue}<br/>
                    
                        ${params[1].marker} ${params[1].seriesName}: ${installations}<br/>
                        ${params[0].marker} ${params[0].seriesName}: ${percentage}%
                    `
                },
            },
            xAxis: {
                type: 'category',
                data: chartData.formattedPercentageData.map((item) => item.date),
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
                        padding: [0, 0, 0, 10],
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
                        padding: [0, 10, 0, 0],
                    },
                    axisLabel: {
                        fontSize: 12,
                        formatter: function (value: number) {
                            return value === 0 ? '' : `${value / 1000}k`
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
            ],
            grid: {
                left: '50',
                right: '40',
                bottom: '35',
                top: '60',
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    start: 0,
                    end: 100,
                },
            ],
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: { title: 'Save as SVG' },
                },
            },
            series: [
                {
                    name: 'Plugin Installations Percentage',
                    data: chartData.formattedPercentageData.map((item) => item.percentage * 100),
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
                    name: 'Jenkins Installations',
                    data: chartData.installationsPerPercentage,
                    type: 'line',
                    yAxisIndex: 1,
                    smooth: true,
                    showSymbol: false,
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
    }, [chartData, systemTheme])

    useEffect(() => {
        if (!chartRef.current) return

        const myChart = echarts.init(chartRef.current, 'customTheme', { renderer: 'svg' })
        myChart.setOption(option)

        const handleResize = () => myChart.resize()
        window.addEventListener('resize', handleResize)

        return () => {
            myChart.dispose()
            window.removeEventListener('resize', handleResize)
        }
    }, [option])

    return <div ref={chartRef} style={{ height: '100%', width: '100%' }} />
}

export default PluginInstallationsPercentageChart
