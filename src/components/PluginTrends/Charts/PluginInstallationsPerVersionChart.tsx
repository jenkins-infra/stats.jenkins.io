import React, { useEffect, useRef, useMemo } from 'react'
import * as echarts from 'echarts'
import { PluginChartProps } from '../../../types/types'
import dayjs from 'dayjs'
import customTheme from '../../../theme/customTheme'
import useSystemTheme from '../../../hooks/useSystemTheme'

echarts.registerTheme('customTheme', customTheme)

const PluginInstallationsPerVersion: React.FC<PluginChartProps> = ({ data }) => {
    const chartRef = useRef(null)

    const { systemTheme } = useSystemTheme()

    const formattedData = useMemo(() => {
        if (!data || !data.installationsPerVersion) return []
        return Object.entries(data.installationsPerVersion).map(([version, installations]) => ({
            version,
            installations,
        }))
    }, [data])

    const formattedDate = useMemo(() => {
        if (!data || !data.installations) return ''
        const latestDate = Object.entries(data.installations).reduce((acc, [timestamp]) => {
            return parseInt(timestamp) > acc ? parseInt(timestamp) : acc
        }, 0)
        return dayjs(latestDate).format('MMM YYYY')
    }, [data])

    const option = useMemo(() => {
        return {
            title: {
                text: `Installations by Version (${formattedDate})`,
                left: 'center',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: systemTheme === 'dark' ? 'white' : 'black',
                },
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
                    type: 'shadow',
                    shadowStyle: {
                        color: 'rgba(150, 150, 150, 0.3)',
                    },
                },
            },
            xAxis: {
                type: 'category',
                data: formattedData.map((item) => item.version),
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
                        return value === 0 ? '' : value // Hide the 0 label
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
                    saveAsImage: { title: 'Save as SVG' },
                },
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    start: 0,
                    end: 100,
                },
            ],
            grid: {
                left: '50',
                right: '40',
                bottom: '35',
                top: '60',
            },
            series: [
                {
                    data: formattedData.map((item) => item.installations),
                    type: 'bar',
                    itemStyle: {
                        color: '#3f51b5',
                    },
                    barWidth: '60%',
                },
            ],
        }
    }, [formattedData, formattedDate, systemTheme])

    useEffect(() => {
        if (!chartRef.current) return

        const chart = echarts.init(chartRef.current, 'customTheme', { renderer: 'svg' })
        chart.setOption(option)

        const handleResize = () => {
            chart.resize()
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            chart.dispose()
        }
    }, [option])

    return <div ref={chartRef} style={{ height: '100%', width: '100%' }} />
}

export default PluginInstallationsPerVersion
