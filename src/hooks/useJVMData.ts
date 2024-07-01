import { useState, useEffect } from 'react'

interface JVMStatsPerMonth {
    [timestamp: string]: {
        [jvm: string]: number
    }
}

interface JVMDataResponse {
    jvmStatsPerMonth: JVMStatsPerMonth
}

interface ParsedJVMData {
    [key: string]: {
        dates: string[]
        installations: number[]
    }
}

const useJVMData = () => {
    const [data, setData] = useState<ParsedJVMData | null>(null)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/src/data/infra-statistics/plugin-installation-trend/jvms.json`)
                const jvmData: JVMDataResponse = await response.json()
                const parsedData: ParsedJVMData = {}

                for (const [timestamp, jvms] of Object.entries(jvmData.jvmStatsPerMonth)) {
                    const date = new Date(Number(timestamp)).toISOString().split('T')[0]
                    for (const [jvm, installations] of Object.entries(jvms)) {
                        if (!parsedData[jvm]) {
                            parsedData[jvm] = { dates: [], installations: [] }
                        }
                        parsedData[jvm].dates.push(date)
                        parsedData[jvm].installations.push(installations)
                    }
                }

                setData(parsedData)
            } catch (error) {
                setError(error as Error)
            }
        }

        fetchData()
    }, [])

    return { data, error }
}

export default useJVMData
