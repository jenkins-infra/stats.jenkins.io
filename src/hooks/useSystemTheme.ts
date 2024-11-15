import { useEffect, useState } from 'react'
import { MediaQueryEvent } from '../types/types'

const useSystemTheme = () => {
    const [theme, setTheme] = useState(
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    )

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleChange = (event: MediaQueryEvent) => {
            setTheme(event.matches ? 'dark' : 'light')
        }

        darkModeMediaQuery.addEventListener('change', handleChange)
    }, [])

    return { systemTheme: theme }
}

export default useSystemTheme
