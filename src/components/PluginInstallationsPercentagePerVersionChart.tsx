import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { PluginChartProps } from '../data/plugins'

const PluginInstallationsPercentagePerVersionChart: React.FC<PluginChartProps> = ({ data }) => {
    const chartRef = useRef(null)

    useEffect(() => {
        if (!data || !data.installationsPercentagePerVersion) {
            return
        }

        const chart = echarts.init(chartRef.current)

        const formattedData = Object.entries(data.installationsPercentagePerVersion).map(([version, percentage]) => ({
            name: version,
            // value: percentage * 100,
            value: Math.round(percentage * 100 * 100) / 100,
        }))

        const option = {
            title: {
                text: 'Installations Percentage Per Version',
                left: 'center',
                textStyle: { fontSize: 16, fontWeight: 'bold' },
            },
            tooltip: {
                trigger: 'item',
                //add percentage sign and color
                formatter: '{b}: {c}%',
                // formatter: (params: { name: string; value: number }) => `${params.name}: ${params.value.toFixed(2)}%`,
                backgroundColor: '#333',
                borderColor: '#777',
                borderWidth: 1,
                textStyle: {
                    color: '#fff',
                },
            },
            legend: {
                orient: 'vertical',
                left: 'left',
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
                    data: formattedData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                    label: {
                        formatter: '{b}: {d}%',
                    },
                    itemStyle: {
                        borderRadius: 5,
                        borderColor: '#fff',
                        borderWidth: 2,
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

export default PluginInstallationsPercentagePerVersionChart
