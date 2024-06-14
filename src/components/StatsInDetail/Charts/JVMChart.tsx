import React, { useEffect, useMemo } from 'react'
import { Box, Typography } from '@mui/material'
import * as echarts from 'echarts'
import useJVMData from '../../../hooks/useJVMData'

interface JVMChartProps {
    title: string
    width?: string
    height?: string
}

const LTS_RELEASES = [6, 7, 8, 11, 17, 21, 25]

const JVMChart: React.FC<JVMChartProps> = ({ title, width = '100%', height = '100%' }) => {
    const { data, error } = useJVMData()

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
                lineStyle: { width: 2.5 }, // Thicker line
            }))
            .sort((a, b) => parseInt(a.name.replace('1.', ''), 10) - parseInt(b.name.replace('1.', ''), 10))

        return { series }
    }, [data])

    const chartOptions = useMemo(
        () => ({
            title: {
                text: title,
                left: 'center',
                textStyle: { fontSize: 20, fontWeight: 'bold' },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'line' },
            },
            xAxis: {
                type: 'time',
            },
            yAxis: {
                type: 'value',
                axisLabel: { fontWeight: 'bold' },
                splitLine: { lineStyle: { type: 'dashed' } },
            },
            grid: { left: '3%', right: '3%', bottom: '3%', containLabel: true },
            series: chartData.series,
            legend: {
                show: true,
                right: '3%',
                top: '10%',
                orient: 'vertical',
                itemGap: 20,
                textStyle: {
                    fontWeight: 'bold',
                    fontSize: 14,
                },
                data: chartData.series.map((series) => ({
                    name: series.name,
                    icon: 'circle',
                })),
                borderWidth: 1, // Add border width
                borderColor: '#ccc', // Add border color
                backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Add back
                padding: 10,
            },
        }),
        [chartData, title]
    )

    useEffect(() => {
        if (!data) return

        const chartDom = document.getElementById('jvm-chart') as HTMLElement
        const myChart = echarts.init(chartDom)
        myChart.setOption(chartOptions)

        const handleResize = () => myChart.resize()
        window.addEventListener('resize', handleResize)

        return () => {
            myChart.dispose()
            window.removeEventListener('resize', handleResize)
        }
    }, [data, chartOptions])

    if (error) {
        return <Typography color="error">Error loading data: {error.message}</Typography>
    }

    return (
        <Box
            sx={{
                width: '90%',
                height: '90%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div id="jvm-chart" style={{ width, height }}></div>
        </Box>
    )
}

export default JVMChart
