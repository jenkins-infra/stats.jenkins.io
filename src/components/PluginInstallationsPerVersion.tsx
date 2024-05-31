import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { PluginChartProps } from '../data/plugins'
import dayjs from 'dayjs'

const PluginInstallationsPerVersion: React.FC<PluginChartProps> = ({ data }) => {
    const chartRef = useRef(null)

    useEffect(() => {
        if (!data || !data.installationsPerVersion) {
            return
        }

        const chart = echarts.init(chartRef.current)

        const formattedData = Object.entries(data.installationsPerVersion).map(([version, installations]) => ({
            version,
            installations,
        }))

        const latestDate = Object.entries(data.installations).reduce((acc, [timestamp]) => {
            return parseInt(timestamp) > acc ? parseInt(timestamp) : acc
        }, 0)

        const formattedDate = dayjs(latestDate).format('MMM YYYY')

        const option = {
            title: {
                //most recent date
                text: `Installations Per Version (${formattedDate})`,
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
                    padding: [0, 0, 0, 50],
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
            grid: {
                left: '5%',
                right: '5%',
                bottom: '15%',
                top: '10%',
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

export default PluginInstallationsPerVersion
