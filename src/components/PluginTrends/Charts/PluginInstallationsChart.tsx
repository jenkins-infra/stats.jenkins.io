import React, { useEffect, useRef, useMemo } from 'react'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { PluginChartProps } from '../../../data/plugins'

const PluginInstallationsChart: React.FC<PluginChartProps> = ({ data }) => {
    const chartRef = useRef<HTMLDivElement | null>(null)

    const formattedData = useMemo(() => {
        if (!data || !data.installations) return []
        return Object.entries(data.installations).map(([timestamp, installations]) => ({
            date: dayjs(parseInt(timestamp)).format('MMM YYYY'),
            installations,
        }))
    }, [data])

    const option = useMemo(() => {
        return {
            title: {
                text: 'Monthly Installations',
                left: 'center',
                textStyle: { fontSize: 16, fontWeight: 'bold' },
            },
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
                name: 'Installations',
                nameTextStyle: {
                    fontSize: 12,
                    padding: [0, 0, 0, 10],
                },
                axisLabel: {
                    fontSize: 12,
                    formatter: function (value: number) {
                        return value === 0 ? '' : `${value / 1000}k` // Hide the 0 label
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
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {},
                },
            },
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

            series: [
                {
                    data: formattedData.map((item) => item.installations),
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
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
    }, [formattedData])

    useEffect(() => {
        if (!chartRef.current) return

        const myChart = echarts.init(chartRef.current)
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

export default PluginInstallationsChart
