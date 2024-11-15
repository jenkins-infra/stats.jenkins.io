import React, { useEffect, useMemo } from 'react'
import { Typography } from '@mui/material'
import * as echarts from 'echarts'
import customTheme from '../../../theme/customTheme'
import useSystemTheme from '../../../hooks/useSystemTheme'

echarts.registerTheme('customTheme', customTheme)

interface JVMChartProps {
    title: string
    width?: string
    height?: string
    data: Record<string, { dates: string[]; installations: number[] }> | null
}

const LTS_RELEASES = [6, 7, 8, 11, 17, 21, 25]

const JVMChart: React.FC<JVMChartProps> = ({ title, width = '100%', height = '100%', data }) => {
    const { systemTheme } = useSystemTheme()

    const chartData = useMemo(() => {
        if (!data) return { dates: [], series: [] }

        const series = Object.entries(data)
            .filter(([jvm]) => LTS_RELEASES.includes(parseInt(jvm.replace('1.', ''), 10)))
            .map(([jvm, values]) => ({
                name: jvm,
                type: 'line',
                data: values.dates.map((date, index) => [date, values.installations[index]]),
                smooth: true,
                showSymbol: false,
                lineStyle: { width: 2.5 },
            }))
            .sort((a, b) => parseInt(a.name.replace('1.', ''), 10) - parseInt(b.name.replace('1.', ''), 10))

        return { series }
    }, [data])

    const chartOptions = useMemo(
        () => ({
            title: {
                text: title,
                left: 'center',
                textStyle: { fontSize: 18, fontWeight: 'bold', color: systemTheme === 'dark' ? '#f0f0f0' : '#212529' },
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
            },
            xAxis: {
                axisLabel: { color: systemTheme === 'dark' ? '#f0f0f0' : '#777' },
                type: 'time',
            },
            yAxis: {
                type: 'value',
                splitLine: { lineStyle: { type: 'dashed' } },
                name: 'Installations',
                axisLabel: {
                    showMinLabel: false,
                    fontSize: 12,
                    align: 'middle',
                    color: systemTheme === 'dark' ? '#f0f0f0' : '#777',
                },
                nameTextStyle: {
                    fontSize: 12,
                    padding: [0, 0, 10, 0],
                    color: systemTheme === 'dark' ? '#f0f0f0' : '#777',
                },
            },
            grid: { left: '0', right: '10', bottom: '20', top: '90', containLabel: true },
            series: chartData.series,
            toolbox: {
                feature: {
                    saveAsImage: {
                        title: 'Save as SVG',
                    },
                },
            },
            legend: {
                show: true,
                right: '10',
                top: '70',
                orient: 'vertical',
                itemGap: 10,
                textStyle: {
                    fontWeight: 'bold',
                    fontSize: 12,
                },
                data: chartData.series.map((series) => ({
                    name: series.name,
                    icon: 'circle',
                })),
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#ccc',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: 10,
            },
        }),
        [chartData, title, systemTheme]
    )

    useEffect(() => {
        if (!data) return

        const chartDom = document.getElementById('jvm-chart') as HTMLElement
        const myChart = echarts.init(chartDom, 'customTheme', { renderer: 'svg' })
        myChart.setOption(chartOptions)

        const handleResize = () => myChart.resize()
        window.addEventListener('resize', handleResize)

        return () => {
            myChart.dispose()
            window.removeEventListener('resize', handleResize)
        }
    }, [data, chartOptions])

    if (!data) {
        return <Typography color="error">Loading data...</Typography>
    }

    return <div id="jvm-chart" style={{ width, height }}></div>
}

export default JVMChart
