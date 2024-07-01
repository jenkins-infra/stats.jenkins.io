import React, { useEffect, useRef, useMemo } from 'react'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { PluginChartProps } from '../../../data/plugins'
import customTheme from '../../../theme/customTheme'

echarts.registerTheme('customTheme', customTheme)

const PluginInstallationsPercentagePerVersionChart: React.FC<PluginChartProps> = ({ data }) => {
    const chartRef = useRef(null)

    const formattedData = useMemo(() => {
        if (!data || !data.installationsPercentagePerVersion) return []

        const entries = Object.entries(data.installationsPercentagePerVersion)
            .map(([version, percentage]) => ({
                name: version,
                value: Math.round(percentage * 100 * 100) / 100,
            }))
            .sort((a, b) => b.value - a.value) // Sort by percentage in descending order

        const top10 = entries.slice(0, 10)
        const othersValue = entries.slice(10).reduce((sum, item) => sum + item.value, 0)

        return othersValue > 0 ? [...top10, { name: 'Others', value: othersValue }] : top10
    }, [data])

    const formattedDate = useMemo(() => {
        if (!data || !data.installations) return ''
        const latestDate = Object.entries(data.installations).reduce((acc, [timestamp]) => {
            return parseInt(timestamp) > acc ? parseInt(timestamp) : acc
        }, 0)
        return dayjs(latestDate).format('MMM YYYY')
    }, [data])

    const truncateLabel = (label: string, maxLength: number) => {
        if (label.length > maxLength) {
            return label.substring(0, maxLength) + '...'
        }
        return label
    }

    const option = useMemo(() => {
        return {
            title: {
                text: `Installations by Version (%)  (${formattedDate})`,
                left: 'center',
                textStyle: { fontSize: 16, fontWeight: 'bold' },
            },
            tooltip: {
                trigger: 'item',
                formatter: ({ name, percent }: { name: string; percent: number }): string =>
                    `${name}: ${percent.toFixed(1)}%`,
                backgroundColor: '#333',
                borderColor: '#777',
                borderWidth: 1,
                textStyle: {
                    color: '#fff',
                },
            },
            series: [
                {
                    name: 'Installations Percentage',
                    type: 'pie',
                    radius: '50%',
                    data: formattedData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                    label: {
                        formatter: ({ name, percent }: { name: string; percent: number }): string =>
                            `${truncateLabel(name, 10)} (${percent.toFixed(1)}%)`,
                        fontSize: 11,
                    },
                    labelLine: {
                        length: 20,
                        length2: 20,
                    },
                },
            ],
            toolbox: {
                feature: {
                    saveAsImage: {
                        title: 'Save as SVG',
                    },
                },
            },
        }
    }, [formattedData, formattedDate])

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

export default PluginInstallationsPercentagePerVersionChart
