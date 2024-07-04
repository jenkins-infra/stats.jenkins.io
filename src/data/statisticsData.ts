function generateDateArray(startYear: number, startMonth: number, endYear: number, endMonth: number) {
    const dateArray = []
    let currentYear = startYear
    let currentMonth = startMonth

    while (currentYear < endYear || (currentYear === endYear && currentMonth < endMonth)) {
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

const currentDate = new Date()
let endYear = currentDate.getFullYear()
let endMonth = currentDate.getMonth()

if (endMonth === 0) {
    endMonth = 12
    endYear -= 1
}

export const data = generateDateArray(2008, 12, endYear, endMonth)
