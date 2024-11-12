import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import * as echarts from 'echarts'
import useCSVData from '../../../../hooks/useCSVData'
import { handleCSVDownload } from '../../../../utils/csvUtils'
import customTheme from '../../../../theme/customTheme'
import useSystemTheme from '../../../../hooks/useSystemTheme'

echarts.registerTheme('customTheme', customTheme)
interface NodesPieProps {
    year: string
    month: string
}

const NodesPie: React.FC<NodesPieProps> = ({ year, month }) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
    const { data, error } = useCSVData(`${year}${month}-nodes`)
    const { systemTheme } = useSystemTheme()

    const title = `Nodes by Type - ${month}/${year}`

    const downloadCSV = useCallback(() => handleCSVDownload(data, title), [data, title])

    const pieData = useMemo(
        () => data.map((row) => ({ name: row[0], value: Number(row[1]) })).filter((item) => !isNaN(item.value)),
        [data]
    )

    const topData = useMemo(() => {
        const sortedData = [...pieData].sort((a, b) => b.value - a.value)
        const top15 = sortedData.slice(0, 15)
        const othersValue = sortedData.slice(15).reduce((sum, item) => sum + item.value, 0)
        return othersValue > 0 ? [...top15, { name: 'Others', value: othersValue }] : top15
    }, [pieData])

    const totalSum = useMemo(() => pieData.reduce((sum, item) => sum + item.value, 0), [pieData])

    const option = useMemo(() => {
        return {
            title: {
                text: `${title} (Total: ${totalSum.toLocaleString()})`,
                left: 'center',
                textStyle: { fontSize: 16, fontWeight: 'bold', color: systemTheme === 'dark' ? '#f0f0f0' : '#212529' },
            },
            tooltip: {
                trigger: 'item',
                backgroundColor: '#333',
                borderColor: '#777',
                borderWidth: 1,
                textStyle: {
                    color: '#fff',
                },
            },
            toolbox: {
                feature: {
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
            legend: {
                orient: 'vertical',
                type: 'scroll',
                left: 'left',
                padding: [20, 20, 20, 20],
                data: topData.map((item) => item.name),
                textStyle: {
                    fontSize: 10,
                    color: systemTheme === 'dark' ? '#f0f0f0' : '#777',
                },
                scrollBehavior: 'smooth',
            },
            series: [
                {
                    name: 'Nodes',
                    type: 'pie',
                    radius: '50%',
                    data: topData,
                    startAngle: 300, // Adjust this value to position the larger slice on the left
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                    label: {
                        formatter: '{b} ({d}%)',
                        fontSize: 11,
                    },
                    labelLine: {
                        length: 20,
                        length2: 20,
                    },
                },
            ],
        }
    }, [title, totalSum, downloadCSV, topData, systemTheme])

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

export default NodesPie
