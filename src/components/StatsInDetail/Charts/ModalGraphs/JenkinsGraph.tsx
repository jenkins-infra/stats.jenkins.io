import React, { useEffect, useRef, useMemo } from 'react'
import * as echarts from 'echarts'
import useCSVData from '../../../../hooks/useCSVData'

interface JenkinsGraphProps {
    year: string
    month: string
}

const JenkinsGraph: React.FC<JenkinsGraphProps> = ({ year, month }) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
    const csvPath = `https://raw.githubusercontent.com/jenkins-infra/infra-statistics/gh-pages/jenkins-stats/svg/${year}${month}-jenkins.csv`
    const { data, error } = useCSVData(csvPath)

    const xData = useMemo(() => data.map((row) => row[0]), [data])
    const yData = useMemo(() => data.map((row) => Number(row[1])).filter((value) => !isNaN(value)), [data])

    // Calculate the total sum of yData
    const totalSum = useMemo(() => yData.reduce((sum, value) => sum + value, 0), [yData])

    const option = useMemo(() => {
        return {
            title: {
                text: `Jenkins Installations by Version - ${month}/${year} (Total: ${totalSum})`,
                left: 'center',
                textStyle: { fontSize: 16, fontWeight: 'bold' },
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type: 'category',
                data: xData,
                axisLabel: { fontSize: 12 },
                axisLine: { lineStyle: { color: '#777' } },
                axisTick: { show: true },
                name: 'Version',
            },
            yAxis: {
                type: 'value',
                axisLabel: { fontSize: 12 },
                axisLine: { lineStyle: { color: '#777' } },
                axisTick: { show: true },
                splitLine: { lineStyle: { type: 'dashed' } },
                name: 'Installations',
            },
            series: [
                {
                    data: yData,
                    type: 'bar',
                    itemStyle: { color: '#3f51b5' },
                },
            ],
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 100,
                },
                {
                    start: 0,
                    end: 100,
                },
            ],
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {},
                },
            },

            grid: { left: '30', right: '70', bottom: '55', top: '60', containLabel: true },
        }
    }, [xData, yData, year, month, totalSum])

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

    if (error) {
        return <div>Error loading data: {error.message}</div>
    }

    return <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>
}

export default JenkinsGraph
