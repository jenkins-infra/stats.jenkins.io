import React, { useEffect, useMemo, useCallback } from 'react'
import * as echarts from 'echarts'
import useCSVData from '../../../hooks/useCSVData'
import usePluginCount from '../../../hooks/usePluginCount'
import { handleCSVDownload } from '../../../utils/csvUtils'
import customTheme from '../../../theme/customTheme'

echarts.registerTheme('customTheme', customTheme)
interface ChartProps {
    csvPath: string
    title: string
    width?: string
    height?: string
}

const Chart: React.FC<ChartProps> = ({ csvPath, title, width = '100%', height = '100%' }) => {
    const { data, error } = useCSVData(csvPath)
    const { pluginCount } = usePluginCount()

    const downloadCSV = useCallback(() => handleCSVDownload(data, title), [data, title])

    const chartData = useMemo(() => {
        const dates = data
            .filter((row) => row[0] && row[0].length === 6)
            .map((row) => {
                const year = row[0].slice(0, 4)
                const month = row[0].slice(4, 6)
                return `${month}-${year}`
            })

        const values = data.map((row) => parseInt(row[1], 10)).filter((value) => !isNaN(value))
        const totalSum = values.reduce((acc, cur) => acc + cur, 0)

        return { dates, values, totalSum }
    }, [data])

    const option = useMemo(() => {
        const baseOption = {
            title: {
                text: title,
                left: 'center',
                textStyle: { fontSize: 18, fontWeight: 'bold' },
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
                data: chartData.dates,
                axisLabel: {},
                axisTick: { show: true, alignWithLabel: true },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    fontSize: 12,
                    showMinLabel: false,
                    align: 'middle',
                },
                splitLine: { lineStyle: { type: 'dashed' } },
            },
            series: [
                {
                    data: chartData.values,
                    type: 'line',
                    itemStyle: { color: '#007FFF' },
                    smooth: true,
                    showSymbol: false,
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(0, 127, 255, 0.2)' },
                            { offset: 1, color: 'rgba(0, 127, 255, 0.0)' },
                        ]),
                    },
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
                    magicType: { show: false, type: ['bar', 'line'] },
                },
            },
            grid: { left: '0', right: '10', bottom: '70', top: '90', containLabel: true },
        }

        if (title.toLowerCase().includes('plugins')) {
            ;(baseOption as echarts.EChartsOption).graphic = {
                type: 'text',
                left: 'center',
                top: '40',
                style: {
                    text: `Available Plugins:  ${pluginCount.toLocaleString()}`,
                    fontSize: 14,
                    fontWeight: 'bold',
                    fill: 'blue',
                },
            }
        }
        return baseOption
    }, [chartData, title, pluginCount, downloadCSV])

    useEffect(() => {
        if (data.length === 0) return

        const chartDom = document.getElementById(title) as HTMLElement
        const myChart = echarts.init(chartDom, 'customTheme', { renderer: 'svg' })
        myChart.setOption(option)

        const handleResize = () => myChart.resize()
        window.addEventListener('resize', handleResize)

        return () => {
            myChart.dispose()
            window.removeEventListener('resize', handleResize)
        }
    }, [data, option, title])

    if (error) {
        return <div>Error loading data: {error.message}</div>
    }

    return <div id={title} style={{ width, height }}></div>
}

export default Chart
