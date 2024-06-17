// // src/data/statisticsData.ts

// export type DataRow = {
//     year: string
//     month: string
// }

// export const data: DataRow[] = [
//     {
//         year: '2008',
//         month: '12',
//     },
//     {
//         year: '2020',
//         month: '06',
//     },
//     {
//         year: '2016',
//         month: '03',
//     },
// ]

function generateDateArray(startYear: number, startMonth: number, endYear: number, endMonth: number) {
    const dateArray = []
    let currentYear = startYear
    let currentMonth = startMonth

    while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth)) {
        dateArray.push({
            year: currentYear.toString(),
            month: currentMonth.toString().padStart(2, '0'),
        })

        currentMonth++
        if (currentMonth > 12) {
            currentMonth = 1
            currentYear++
        }
    }

    return dateArray
}

export const data = generateDateArray(2008, 12, 2024, 5)
