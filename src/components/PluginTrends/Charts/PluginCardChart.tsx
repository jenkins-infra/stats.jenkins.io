import React, { useEffect, useRef, useMemo } from 'react'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { PluginChartProps } from '../../../types/types'

const PluginCardChart: React.FC<PluginChartProps> = React.memo(({ data }) => {
    const chartRef = useRef(null)

    const chartData = useMemo(() => {
        if (!data || !data.installations) {
            return {
                formattedData: [],
                totalInstallationsK: '0K',
            }
        }

        const formattedData = Object.entries(data.installations).map(([timestamp, installations]) => ({
            date: dayjs(parseInt(timestamp)).format('MMM YYYY'),
            installations,
        }))

        const totalInstallations = formattedData.reduce((sum, item) => sum + item.installations, 0)
        const totalInstallationsK = (totalInstallations / 1000).toFixed(1) + 'K'

        return {
            formattedData,
            totalInstallationsK,
        }
    }, [data])

    const option = useMemo(() => {
        return {
            xAxis: {
                type: 'category',
                data: chartData.formattedData.map((item) => item.date),
                show: false,
                axisLabel: {
                    formatter: (value: unknown, index: number) => {
                        if (index === 0 || index === chartData.formattedData.length - 1) {
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
                left: '8',
                right: '8',
                bottom: '5',
                top: '5',
            },
            series: [
                {
                    data: chartData.formattedData.map((item) => item.installations),
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
    }, [chartData])

    useEffect(() => {
        if (!data || !data.installations) {
            return
        }

        const chart = echarts.init(chartRef.current)
        chart.setOption(option)

        const handleResize = () => {
            chart.resize()
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            chart.dispose()
        }
    }, [data, option])

    return (
        <div
            ref={chartRef}
            style={{
                height: '100%',
                width: '100%',
            }}
        />
    )
})

export default PluginCardChart
