import { useState } from 'react'

const useSelectionState = () => {
    const [selectedChart, setSelectedChart] = useState<string | null>(null)
    const [selectedTab, setSelectedTab] = useState<string | null>(null)
    const [selectedYear, setSelectedYear] = useState<string | null>(null)

    const handleChartSelect = (chart: string) => {
        setSelectedChart(chart)
        setSelectedTab('overall')
        setSelectedYear(null) // deselect any year when selecting a chart
    }

    const handleYearSelect = (year: string | null) => {
        setSelectedYear(year)
        setSelectedTab('monthly')
        setSelectedChart(null) // deselect any chart when selecting a year
    }

    return {
        selectedChart,
        selectedTab,
        selectedYear,
        handleChartSelect,
        handleYearSelect,
    }
}

export default useSelectionState
