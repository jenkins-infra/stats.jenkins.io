import React, { useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './pages/landing-page/index.tsx'
import Statistics from './pages/statistics/index.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { ThemeProvider } from '@mui/material/styles'
import getTheme from './theme/theme.ts'
import PluginTrends from './pages/plugin-trends/index.tsx'
import PluginVersions from './pages/plugin-versions/index.tsx'
import DependencyGraph from './pages/dep-graph/index.tsx'
import NavBar from './components/Layout/NavBar.tsx'
import InfoHeader from './components/Layout/InfoHeader.tsx'
import { Stack } from '@mui/material'
import useSystemTheme from './hooks/useSystemTheme.ts'

// using current time as build time, feel free to change it to the actual build time
const BUILD_TIME = new Date().toISOString()
const UPDATE_FREQUENCY = '24 hours' // using 24hours but ensure it matches the actual update frequency from Jenkins

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/statistics',
        element: <Statistics />,
    },
    {
        path: '/plugin-trends',
        element: <PluginTrends />,
    },
    {
        path: '/plugin-versions',
        element: <PluginVersions />,
    },
    {
        path: '/dep-graph',
        element: <DependencyGraph />,
    },
])

function App() {
    const { systemTheme } = useSystemTheme()
    const theme = useMemo(() => getTheme(systemTheme), [systemTheme])

    // Format build time to more readable format
    const formattedBuildTime = useMemo(() => {
        const date = new Date(BUILD_TIME)
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short',
        })
    }, [])

    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <Stack
                    sx={{
                        height: '100vh',
                        maxHeight: '100vh',
                    }}
                >
                    <NavBar />
                    <InfoHeader generationTime={formattedBuildTime} updateFrequency={UPDATE_FREQUENCY} />
                    <RouterProvider router={router} />
                </Stack>
            </ThemeProvider>
        </React.StrictMode>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
