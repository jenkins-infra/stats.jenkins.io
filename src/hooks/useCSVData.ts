import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import csvFileMapping from '../utils/csvFileMapping'

const useCSVData = (csvFileName: string) => {
    const [data, setData] = useState<string[][]>([])
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchData = () => {
            try {
                const csvText = csvFileMapping[csvFileName]
                if (!csvText) {
                    throw new Error(`CSV file with name "${csvFileName}" not found`)
                }
                const parsedData = Papa.parse<string[]>(csvText, { header: false }).data

                // Filter out empty rows
                const filteredData = parsedData.filter((row) => row.some((cell) => cell.trim() !== ''))
                setData(filteredData)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err)
                } else {
                    setError(new Error('An unknown error occurred'))
                }
            }
        }

        fetchData()
    }, [csvFileName])

    return { data, error }
}

export default useCSVData

// import { useState, useEffect } from 'react'
// import Papa from 'papaparse'

// const useCSVData = (csvPath: string) => {
//     const [data, setData] = useState<string[][]>([])
//     const [error, setError] = useState<Error | null>(null)

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(csvPath)
//                 const csvText = await response.text()
//                 const parsedData = Papa.parse<string[]>(csvText, { header: false }).data

//                 // Filter out empty rows
//                 const filteredData = parsedData.filter((row) => row.some((cell) => cell.trim() !== ''))
//                 setData(filteredData)
//             } catch (err) {
//                 if (err instanceof Error) {
//                     setError(err)
//                 } else {
//                     setError(new Error('An unknown error occurred'))
//                 }
//             }
//         }

//         fetchData()
//     }, [csvPath])

//     return { data, error }
// }

// export default useCSVData
