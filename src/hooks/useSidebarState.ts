import { useState } from 'react'

const useSidebarState = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return { sidebarOpen, toggleSidebar }
}

export default useSidebarState
