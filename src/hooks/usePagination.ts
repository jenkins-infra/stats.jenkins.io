import { useState, useEffect } from 'react'
import { IPluginData } from '../types/types'

const usePagination = (data: IPluginData[], itemsPerPage: number, searchTerm: string) => {
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        setPage(1)
    }, [searchTerm])

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    const paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage)

    return {
        page,
        handlePageChange,
        paginatedData,
        totalPages: Math.ceil(data.length / itemsPerPage),
    }
}

export default usePagination
