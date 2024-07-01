import { useState, useEffect } from 'react'
import jvmData from '../data/infra-statistics/plugin-installation-trend/jvms.json'

interface JVMStatsPerMonth {
    [timestamp: string]: {
        [jvm: string]: number
    }
}

interface ParsedJVMData {
    [key: string]: {
        dates: string[]
        installations: number[]
    }
}

const useJVMData = () => {
    const [data, setData] = useState<ParsedJVMData | null>(null)

    useEffect(() => {
        const parseJVMData = () => {
            try {
                const parsedData: ParsedJVMData = {}

                for (const [timestamp, jvms] of Object.entries(jvmData.jvmStatsPerMonth as JVMStatsPerMonth)) {
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
                console.error('Error processing JVM data', error)
            }
        }

        parseJVMData()
    }, [])

    return { data }
}

export default useJVMData
