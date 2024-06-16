import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import * as echarts from 'echarts'
import useCSVData from '../../../../hooks/useCSVData'
import { handleCSVDownload } from '../../../../utils/csvUtils'

interface PluginsGraph500Props {
    year: string
    month: string
}

const PluginsGraph500: React.FC<PluginsGraph500Props> = ({ year, month }) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
    const csvPath = `https://raw.githubusercontent.com/jenkins-infra/infra-statistics/gh-pages/jenkins-stats/svg/${year}${month}-top-plugins500.csv`
    console.log(csvPath)
    const { data, error } = useCSVData(csvPath)

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
                nameGap: 85,
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
                        title: 'Restore',
                        iconStyle: {},
                    },
                    saveAsImage: {
                        title: 'Save as Image',
                        icon: 'path://M896 64H128c-35.35 0-64 28.65-64 64v768c0 35.35 28.65 64 64 64h768c35.35 0 64-28.65 64-64V128c0-35.35-28.65-64-64-64zM512 832c-158.75 0-288-129.25-288-288s129.25-288 288-288 288 129.25 288 288-129.25 288-288 288z',
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

export default PluginsGraph500
