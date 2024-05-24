import React, { useEffect } from 'react'
import { Box, Button } from '@mui/material'
import * as echarts from 'echarts'
import Papa from 'papaparse'

interface ChartProps {
    csvPath: string
    title: string
    width?: string
    height?: string
}

const Chart: React.FC<ChartProps> = ({ csvPath, title, width = '100%', height = '100%' }) => {
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
                return { monthYear: `${month}-${year}`, year }
            })

            const values = data.map((row) => parseInt(row[1], 10))

            const option: echarts.EChartsOption = {
                title: {
                    text: title,
                    left: 'center',
                    textStyle: {
                        fontSize: 18,
                        fontWeight: 'bold',
                    },
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                },
                xAxis: {
                    type: 'category',
                    data: dates.map((date) => date.monthYear),
                    axisLabel: {
                        formatter: function (value, index) {
                            const currentYear = dates[index].year
                            const previousYear = index > 0 ? dates[index - 1].year : null
                            return currentYear !== previousYear ? currentYear : ''
                        },
                        interval: 0,
                        rotate: 0,
                    },
                    axisTick: {
                        alignWithLabel: true,
                    },
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                        },
                    },
                },
                series: [
                    {
                        data: values,
                        type: 'bar',
                        barWidth: '60%',
                        itemStyle: {
                            color: '#007FFF',
                        },
                    },
                ],
                grid: {
                    left: '3%',
                    right: '3%',
                    bottom: '3%',
                    containLabel: true,
                },
            }

            myChart.setOption(option)
        }

        loadCSVData().then((data) => {
            setupChart(data as string[][])
        })

        // Handle window resize
        const handleResize = () => {
            myChart.resize()
        }

        window.addEventListener('resize', handleResize)

        // Cleanup the chart and event listener on unmount
        return () => {
            myChart.dispose()
            window.removeEventListener('resize', handleResize)
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
        <Box
            sx={{
                width: '70vw',
                height: '70vh',
                marginTop: '2rem',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div id={title} style={{ width, height }}></div>
                <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
                    <Button
                        variant="contained"
                        onClick={handleCSVDownload}
                        sx={{
                            margin: '0.5rem',
                            backgroundColor: '#ebedf0',
                            borderRadius: '1rem',
                            color: '#808080',
                            fontWeight: 'bold',
                            fontFamily: 'Georgia, serif',

                            '&:hover': {
                                backgroundColor: 'white',
                                border: '2px solid #5468ff',
                                color: 'black',
                            },
                        }}
                    >
                        Download CSV
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSVGDownload}
                        sx={{
                            margin: '0.5rem',
                            backgroundColor: '#ebedf0',
                            borderRadius: '1rem',
                            color: '#808080',
                            fontWeight: 'bold',
                            fontFamily: 'Georgia, serif',
                            border: '2px solid transparent',

                            '&:hover': {
                                backgroundColor: 'white',
                                border: '2px solid #5468ff',
                                color: 'black',
                            },
                        }}
                    >
                        Download SVG
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Chart
