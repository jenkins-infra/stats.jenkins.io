import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import useCSVData from '../../../../hooks/useCSVData'

interface JenkinsGraphProps {
    year: string
    month: string
}

const JenkinsGraph: React.FC<JenkinsGraphProps> = ({ year, month }) => {
    const csvPath = `https://raw.githubusercontent.com/jenkins-infra/infra-statistics/gh-pages/jenkins-stats/svg/${year}${month}-jenkins.csv`
    const { data, error } = useCSVData(csvPath)

    useEffect(() => {
        if (data.length > 0) {
            const chartDom = document.getElementById('jenkins-chart')
            if (chartDom) {
                const myChart = echarts.init(chartDom)

                const xData = data.map((row) => row[0])
                const yData = data.map((row) => Number(row[1]))

                const option = {
                    title: {
                        text: `Jenkins - ${year}/${month}`,
                    },
                    tooltip: {
                        trigger: 'axis',
                    },
                    xAxis: {
                        type: 'category',
                        data: xData,
                    },
                    yAxis: {
                        type: 'value',
                    },
                    series: [
                        {
                            data: yData,
                            type: 'bar',
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
                }
                myChart.setOption(option)
                myChart.hideLoading()

                return () => {
                    myChart.dispose()
                }
            }
        }
    }, [data, year, month])

    if (error) {
        return <div>Error loading data: {error.message}</div>
    }

    return <div id="jenkins-chart" style={{ width: '100%', height: '100%' }}></div>
}

export default JenkinsGraph
