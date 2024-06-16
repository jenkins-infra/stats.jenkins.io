// src/utils/jsonUtils.ts

export const handleJSONDownload = (data: unknown, filename: string) => {
    const sanitizedFilename = filename.replace(/\s+/g, '_').replace(/-/g, '').toLowerCase()
    const jsonContent = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.href = url
    link.setAttribute('download', `${sanitizedFilename}.json`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
