import { useState } from 'react'

const useSelectionState = () => {
    const [selectedChart, setSelectedChart] = useState<string | null>('plugins')
    const [selectedTab, setSelectedTab] = useState<string | null>('overall')
    const [selectedYear, setSelectedYear] = useState<string | null>(null)

    const handleChartSelect = (chart: string) => {
        setSelectedChart(chart)
        setSelectedTab('overall')
        setSelectedYear(null)
    }

    const handleYearSelect = (year: string | null) => {
        setSelectedYear(year)
        setSelectedTab('monthly')
        setSelectedChart(null)
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
