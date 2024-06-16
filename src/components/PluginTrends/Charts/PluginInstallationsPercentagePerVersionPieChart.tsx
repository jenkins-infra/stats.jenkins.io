import React, { useEffect, useRef, useMemo } from 'react'
import * as echarts from 'echarts'
import { PluginChartProps } from '../../../data/plugins'
import dayjs from 'dayjs'

const PluginInstallationsPercentagePerVersionChart: React.FC<PluginChartProps> = ({ data }) => {
    const chartRef = useRef(null)

    const formattedData = useMemo(() => {
        if (!data || !data.installationsPercentagePerVersion) return []
        return Object.entries(data.installationsPercentagePerVersion)
            .map(([version, percentage]) => ({
                name: version,
                value: Math.round(percentage * 100 * 100) / 100,
            }))
            .sort((a, b) => b.value - a.value) // Sort by percentage in descending order
            .slice(0, 10) // Show only the top 10 versions
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
                text: `Installations by Version (%)  (${formattedDate})`,
                left: 'center',
                textStyle: { fontSize: 16, fontWeight: 'bold' },
            },
            tooltip: {
                trigger: 'item',
                // formatter: '{b}: {c}%',
                formatter: ({ name, percent }: { name: string; percent: number }) => `${name}: ${percent.toFixed(1)}%`,
                backgroundColor: '#333',
                borderColor: '#777',
                borderWidth: 1,
                textStyle: {
                    color: '#fff',
                },
            },
            legend: {
                type: 'plain', // Make the legend scrollable
                orient: 'vertical',
                left: '10%',
                top: 'center',
                data: formattedData.map((item) => item.name),
                textStyle: {
                    color: '#777',
                },
            },
            series: [
                {
                    name: 'Installations Percentage',
                    type: 'pie',
                    radius: '50%',
                    center: ['70%', '50%'],
                    data: formattedData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                    label: {
                        formatter: ({ name, percent }: { name: string; percent: number }) =>
                            `${name}: ${percent.toFixed(1)}%`,
                    },
                    itemStyle: {
                        borderRadius: 5,
                        borderColor: '#fff',
                        borderWidth: 2,
                    },
                },
            ],
            toolbox: {
                feature: {
                    // restore: {},
                    saveAsImage: {},
                },
            },
        }
    }, [formattedData, formattedDate])

    useEffect(() => {
        if (!chartRef.current) return

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
    }, [option])

    return <div ref={chartRef} style={{ height: '100%', width: '100%' }} /> // Increase the height for better visibility
}

export default PluginInstallationsPercentagePerVersionChart
