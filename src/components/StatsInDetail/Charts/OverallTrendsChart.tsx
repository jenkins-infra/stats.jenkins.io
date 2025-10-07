import React, { useEffect, useMemo, useCallback, useRef } from 'react'
import * as echarts from 'echarts'
import { handleCSVDownload } from '../../../utils/csvUtils'
import customTheme from '../../../theme/customTheme'
import useSystemTheme from '../../../hooks/useSystemTheme'
import useIsMobile from '../../../hooks/useIsMobile'

echarts.registerTheme('customTheme', customTheme)

interface ChartProps {
    csvData: Record<string, string[][]>
    title: string
    width?: string
    height?: string
    pluginCount?: number
    selectedChart: string
    secondChart?: string // Optional second chart
}

const Chart: React.FC<ChartProps> = ({
    csvData,
    title,
    width = '100%',
    height = '100%',
    pluginCount,
    selectedChart,
    secondChart, // Optional second chart
}) => {
    const chartRef = useRef<echarts.ECharts | null>(null)
    const { systemTheme } = useSystemTheme()
    const isMobile = useIsMobile()

    const downloadCSV = useCallback(
        () => handleCSVDownload(csvData[selectedChart], title),
        [csvData, selectedChart, title]
    )

    const chartData = useMemo(() => {
        const processChartData = (data: string[][]) => {
            const dates = data
                .filter((row) => row[0] && row[0].length === 6)
                .map((row) => {
                    const year = row[0].slice(0, 4)
                    const month = row[0].slice(4, 6)
                    return `${month}-${year}`
                })

            const values = data.map((row) => parseInt(row[1], 10)).filter((value) => !isNaN(value))
            return { dates, values }
        }

        const processedData: Record<string, { dates: string[]; values: number[] }> = {}
        Object.keys(csvData).forEach((chart) => {
            processedData[chart] = processChartData(csvData[chart])
        })

        return processedData
    }, [csvData])

    const option = useMemo(() => {
        const seriesColors: Record<string, string> = {
            plugins: '#007FFF',
            jobs: '#32CD32',
            jenkins: '#800080',
            nodes: '#FF4500',
        }

        const series = Object.keys(chartData).map((chart) => ({
            data: chartData[chart].values,
            type: 'line',
            name: chart,
            smooth: true,
            showSymbol: false,
            yAxisIndex: chart === secondChart ? 1 : 0,
            lineStyle: {
                color: seriesColors[chart],
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: `${seriesColors[chart]}40` },
                    { offset: 1, color: `${seriesColors[chart]}00` },
                ]),
            },
            selected: chart === selectedChart || chart === secondChart,
        }))

        const baseOption = {
            color: Object.values(seriesColors),
            title: {
                text: title,
                left: 'center',
                textStyle: {
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: systemTheme === 'dark' ? 'white' : 'dark',
                },
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
            legend: {
                show: true,
                data: [selectedChart, ...(secondChart ? [secondChart] : [])],
                top: isMobile ? 120 : 100,
                left: 'center',
                selected: Object.keys(chartData).reduce(
                    (acc, chart) => {
                        acc[chart] = chart === selectedChart || chart === secondChart
                        return acc
                    },
                    {} as Record<string, boolean>
                ),
                textStyle: {
                    color: systemTheme === 'dark' ? '#f0f0f0' : '#777',
                },
            },
            xAxis: {
                type: 'category',
                data: chartData[selectedChart]?.dates,
                axisLabel: { color: systemTheme === 'dark' ? '#f0f0f0' : '#777' },
                axisTick: { show: true, alignWithLabel: true },
            },
            yAxis: [
                {
                    type: 'value',
                    name: selectedChart.charAt(0).toUpperCase() + selectedChart.slice(1),
                    nameTextStyle: {
                        color: secondChart ? seriesColors[selectedChart] : systemTheme === 'dark' ? '#f0f0f0' : '',
                    },
                    axisLabel: {
                        fontSize: 12,
                        showMinLabel: false,
                        align: 'middle',
                        color: secondChart ? seriesColors[selectedChart] : systemTheme === 'dark' ? '#f0f0f0' : '',
                    },
                    splitLine: { lineStyle: { type: 'dashed' } },
                },
                {
                    type: 'value',
                    name: secondChart ? secondChart.charAt(0).toUpperCase() + secondChart.slice(1) : '',
                    nameTextStyle: {
                        color: secondChart ? seriesColors[secondChart] : '#000',
                    },
                    axisLabel: {
                        fontSize: 12,
                        showMinLabel: false,
                        align: 'end',
                        color: secondChart ? seriesColors[secondChart] : '#000',
                    },
                    splitLine: { lineStyle: { type: 'dashed' } },
                    position: 'right',
                },
            ],
            series: series,
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
                ...(isMobile && {
                    top: '60',
                    right: 'center',
                    left: 'center',
                    orient: 'horizontal',
                }),
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
            grid: { left: '0', right: '10', bottom: '70', top: isMobile ? '140' : '90', containLabel: true },
        }

        if (title.toLowerCase().includes('plugins') && pluginCount !== undefined) {
            ;(baseOption as echarts.EChartsOption).graphic = {
                type: 'text',
                left: 'center',
                top: isMobile ? '50' : '50',
                style: {
                    text: `Available Plugins:  ${pluginCount.toLocaleString()}`,
                    fontSize: 14,
                    fontWeight: 'bold',
                    fill: systemTheme === 'dark' ? '#e95b1e' : 'blue',
                },
            }
        }
        return baseOption
    }, [chartData, title, pluginCount, downloadCSV, selectedChart, secondChart, systemTheme, isMobile])

    useEffect(() => {
        if (Object.keys(csvData).length === 0) return

        const chartDom = document.getElementById(title) as HTMLElement
        const myChart = echarts.init(chartDom, 'customTheme', { renderer: 'svg' })
        chartRef.current = myChart
        myChart.setOption(option)

        const handleResize = () => myChart.resize()
        window.addEventListener('resize', handleResize)

        return () => {
            myChart.dispose()
            window.removeEventListener('resize', handleResize)
        }
    }, [csvData, option, title])

    if (Object.keys(csvData).length === 0) {
        return <div>Loading data...</div>
    }

    return <div id={title} style={{ width, height }}></div>
}

export default Chart
