import React, { useEffect, useRef, useMemo, useState } from 'react'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { PluginChartProps } from '../../data/plugins'
import ResetZoomButton from '../Buttons/ResetZoomButton'

const PluginInstallationsPercentageChart: React.FC<PluginChartProps> = ({ data }) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
    const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(null)

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
                text: 'Monthly Installation % of Total Jenkins Installations',
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter: function (params: any) {
                    const percentage = params[0].value.toFixed(2)
                    const installations = Math.round(params[1].value).toLocaleString()
                    return `
                        ${params[0].axisValue}<br/>
                        ${params[0].marker} ${params[0].seriesName}: ${percentage}%<br/>
                        ${params[1].marker} ${params[1].seriesName}: ${installations}
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
                left: '7%',
                right: '7%',
                bottom: '15%',
                top: '15%',
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    start: 0,
                    end: 100,
                },
            ],
            series: [
                {
                    name: 'Installations Percentage',
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
                    name: 'Installations',
                    data: chartData.installationsPerPercentage,
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
    }, [chartData])

    useEffect(() => {
        if (!chartRef.current) return

        const instance = echarts.init(chartRef.current)
        instance.setOption(option)
        setChartInstance(instance)

        const handleResize = () => {
            instance.resize()
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            instance.dispose()
        }
    }, [option])

    return (
        <div>
            <div ref={chartRef} style={{ height: '450px', width: '100%' }} />
            <ResetZoomButton chartInstance={chartInstance} />
        </div>
    )
}

export default PluginInstallationsPercentageChart
