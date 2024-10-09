import { useState } from 'react'

const usePaginationState = (initialPage = 1) => {
    const [page, setPage] = useState<number>(initialPage)

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    return { page, setPage, handlePageChange }
}

export default usePaginationState
