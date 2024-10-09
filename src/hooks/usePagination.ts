import { IPluginData } from '../types/types'

const usePagination = (data: IPluginData[], itemsPerPage: number, page: number) => {
    const totalPages = Math.ceil(data.length / itemsPerPage)
    const paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage)

    return {
        paginatedData,
        totalPages,
    }
}

export default usePagination
