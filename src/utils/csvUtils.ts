// src/utils/csvUtils.ts

export const handleCSVDownload = (data: string[][], filename: string) => {
    const sanitizedFilename = filename.replace(/\s+/g, '_').replace(/-/g, '').toLowerCase()
    const csvContent = data.map((row) => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.href = url
    link.setAttribute('download', `${sanitizedFilename}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
