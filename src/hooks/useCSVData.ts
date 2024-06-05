import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import axios from 'axios'

const useCSVData = (csvPath: string) => {
    const [data, setData] = useState<string[][]>([])
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(csvPath, { responseType: 'text' })
                const csvText = response.data
                const parsedData = Papa.parse<string[]>(csvText, { header: false }).data
                setData(parsedData)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err)
                } else {
                    setError(new Error('An unknown error occurred'))
                }
            }
        }

        fetchData()
    }, [csvPath])

    return { data, error }
}

export default useCSVData
