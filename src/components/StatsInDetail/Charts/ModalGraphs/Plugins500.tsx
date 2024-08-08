import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import * as echarts from 'echarts'
import useCSVData from '../../../../hooks/useCSVData'
import { handleCSVDownload } from '../../../../utils/csvUtils'
import customTheme from '../../../../theme/customTheme'

echarts.registerTheme('customTheme', customTheme)

interface PluginsGraph500Props {
    year: string
    month: string
}

const PluginsGraph500: React.FC<PluginsGraph500Props> = ({ year, month }) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
    const { data, error } = useCSVData(`${year}${month}-top-plugins500`)

    const filteredData = useMemo(() => data.filter((row) => Number(row[1]) > 500), [data])
    const xData = useMemo(() => filteredData.map((row) => row[0]), [filteredData])
    const yData = useMemo(
        () => filteredData.map((row) => Number(row[1])).filter((value) => !isNaN(value)),
        [filteredData]
    )

    const title = `Top Plugins ( > 500 installs) - ${month}/${year}`
    const downloadCSV = useCallback(() => handleCSVDownload(filteredData, title), [filteredData, title])
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
                axisLabel: {
                    show: true,
                    rotate: 45,
                    formatter: (value: string) => {
                        if (value.length > 15) {
                            return value.slice(0, 12) + '...'
                        }
                        return value
                    },
                    tooltip: {
                        show: true,
                    },
                },
                axisLine: { lineStyle: { color: '#777' } },
                axisTick: { show: true },
                name: `Plugin Name (${xData.length.toLocaleString()} plugins)`,
                nameLocation: 'middle',
                nameGap: 95,
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
            grid: { left: '20', right: '30', bottom: '85', top: '60', containLabel: true },
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

    if (!data || data.length === 0) {
        return <div style={{ textAlign: 'center' }}>No data available for {title}</div>
    }

    if (error) {
        return <div>Error loading data: {error.message}</div>
    }

    return <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>
}

export default PluginsGraph500
