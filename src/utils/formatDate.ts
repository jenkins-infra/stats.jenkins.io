export const formatDate = (dateString: string): string => {
    if (dateString.length !== 6) return dateString
    const year = dateString.slice(0, 4)
    const month = dateString.slice(4, 6)
    return `${month}-${year}`
}
