import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import * as echarts from 'echarts'
import useCSVData from '../../../../hooks/useCSVData'
import { handleCSVDownload } from '../../../../utils/csvUtils'
import customTheme from '../../../../theme/customTheme'

echarts.registerTheme('customTheme', customTheme)

interface JenkinsGraphProps {
    year: string
    month: string
}

const JenkinsGraph: React.FC<JenkinsGraphProps> = ({ year, month }) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
    const { data, error } = useCSVData(`${year}${month}-jenkins`)

    const xData = useMemo(() => data.map((row) => row[0]), [data])
    const yData = useMemo(() => data.map((row) => Number(row[1])).filter((value) => !isNaN(value)), [data])

    const title = `Jenkins Installations by Version - ${month}/${year}`
    const downloadCSV = useCallback(() => handleCSVDownload(data, title), [data, title])

    const totalSum = useMemo(() => yData.reduce((sum, value) => sum + value, 0), [yData])

    const option = useMemo(() => {
        return {
            title: {
                text: `${title} (Total: ${totalSum.toLocaleString()})`,
                left: 'center',
                textStyle: { fontSize: 16, fontWeight: 'bold' },
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
                type: 'category',
                data: xData,
                axisLabel: { fontSize: 12 },
                axisLine: { lineStyle: { color: '#777' } },
                axisTick: { show: true },
                name: `Version (${xData.length.toLocaleString()} Versions)`,
                nameLocation: 'middle',
                nameGap: 30,
                nameTextStyle: { fontWeight: 'bold' },
            },
            yAxis: {
                type: 'value',
                axisLabel: { fontSize: 12 },
                axisLine: { lineStyle: { color: '#777' } },
                axisTick: { show: true },
                splitLine: { lineStyle: { type: 'dashed' } },
                name: 'Installations',
                nameTextStyle: { fontWeight: 'bold' },
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
                    restore: {
                        title: 'Reset Zoom',
                        iconStyle: {},
                    },
                    saveAsImage: {
                        title: 'Save as SVG',
                    },
                    myCSVDownload: {
                        show: true,
                        title: 'Download CSV',
                        icon: 'path://M8 0H0v12h4v4l4-4h4V0H8zm0 2h2v2H8V2zm0 3h2v2H8V5zm0 3h2v2H8V8z',
                        onclick: downloadCSV,
                    },
                },
            },

            grid: { left: '20', right: '30', bottom: '75', top: '60', containLabel: true },
        }
    }, [title, totalSum, xData, yData, downloadCSV])

    useEffect(() => {
        if (!chartRef.current) return

        const myChart = echarts.init(chartRef.current, 'customTheme', { renderer: 'svg' })
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
