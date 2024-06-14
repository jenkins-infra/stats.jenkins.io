import React, { useEffect, useRef, useMemo, useState } from 'react'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { PluginChartProps } from '../../../data/plugins'
import ResetZoomButton from './ResetZoomButton'

const PluginInstallationsChart: React.FC<PluginChartProps> = ({ data }) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
    const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(null) // State to hold the chart instance

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
                text: 'Monthly Installations Over Time',
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
            grid: {
                left: '8%',
                right: '5%',
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
                    data: formattedData.map((item) => item.installations),
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
    }, [formattedData])

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

export default PluginInstallationsChart
