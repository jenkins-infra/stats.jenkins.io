import { useState } from 'react'
import { IPluginData } from '../data/plugins'

const usePagination = (data: IPluginData[], itemsPerPage: number) => {
    const [page, setPage] = useState<number>(1)

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
