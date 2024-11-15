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
import { Stack } from '@mui/material'
import useSystemTheme from './hooks/useSystemTheme.ts'

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
                    <RouterProvider router={router} />
                </Stack>
            </ThemeProvider>
        </React.StrictMode>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
