import React, { useEffect } from 'react'
import { Box, Link } from '@mui/material'
import * as echarts from 'echarts'
import Papa from 'papaparse'

interface ChartProps {
    csvPath: string
    title: string
    width?: string
    height?: string
}

const Chart: React.FC<ChartProps> = ({ csvPath, title, width = '800px', height = '400px' }) => {
    useEffect(() => {
        // Function to load and parse CSV file
        const loadCSVData = async () => {
            const response = await fetch(csvPath)
            const csvText = await response.text()
            const parsedData = Papa.parse(csvText, { header: false })
            return parsedData.data
        }

        // Initialize the chart
        const chartDom = document.getElementById(title) as HTMLElement
        const myChart = echarts.init(chartDom)

        // Set up the chart with data
        const setupChart = (data: string[][]) => {
            const dates = data.map((row) => {
                const dateStr = row[0]
                const year = dateStr.slice(0, 4)
                const month = dateStr.slice(4, 6)
                return `${month}-${year}`
            })
            const values = data.map((row) => parseInt(row[1], 10))

            const option: echarts.EChartsOption = {
                title: {
                    text: title,
                },
                tooltip: {},
                xAxis: {
                    type: 'category',
                    data: dates,
                    axisLabel: {
                        show: false, // Hide the axis labels
                    },
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: values,
                        type: 'bar',
                    },
                ],
            }

            myChart.setOption(option)
        }

        loadCSVData().then((data) => {
            setupChart(data as string[][])
        })

        // Cleanup the chart on unmount
        return () => {
            myChart.dispose()
        }
    }, [csvPath, title])

    const handleCSVDownload = () => {
        const link = document.createElement('a')
        link.href = csvPath
        link.download = csvPath.split('/').pop() || 'data.csv'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleSVGDownload = () => {
        const chartDom = document.getElementById(title) as HTMLElement
        const myChart = echarts.init(chartDom)
        const svg = myChart.getDataURL({
            type: 'svg',
            backgroundColor: '#fff',
        })
        const link = document.createElement('a')
        link.href = svg
        link.download = `${title}.svg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Box>
                    <Link onClick={handleCSVDownload} style={{ cursor: 'pointer', marginRight: '10px' }}>
                        CSV
                    </Link>
                    <Link onClick={handleSVGDownload} style={{ cursor: 'pointer' }}>
                        SVG
                    </Link>
                </Box>
            </Box>
            <div id={title} style={{ width, height }}></div>
        </Box>
    )
}

export default Chart
