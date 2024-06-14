import React, { useEffect, useRef, useMemo } from 'react'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import downloadIcon from '../../../assets/downloadIcon.svg'
import { PluginChartProps } from '../../../data/plugins'

const PluginCardChart: React.FC<PluginChartProps> = ({ data }) => {
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
            },
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
                left: '3%',
                right: '3%',
                bottom: '3%',
                top: '3%',
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
            graphic: [
                {
                    type: 'image',
                    style: {
                        image: downloadIcon,
                        width: 20,
                        height: 20,
                    },
                },
                {
                    type: 'text',
                    left: '23',
                    top: '4',
                    style: {
                        text: chartData.totalInstallationsK,
                        fontSize: 14,
                        fontWeight: 'bold',
                        fill: '#000',
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
                height: '200px',
                minWidth: '240px',
                width: '100%',
            }}
        />
    )
}

export default PluginCardChart
