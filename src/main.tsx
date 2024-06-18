import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './pages/landing-page/index.tsx'
import Statistics from './pages/statistics/index.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme.ts'
import PluginTrends from './pages/plugin-trends/index.tsx'
import NavBar from './components/Layout/NavBar.tsx'
import { Stack } from '@mui/material'

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
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Stack
                sx={{
                    height: '100vh',
                }}
            >
                <NavBar />
                <RouterProvider router={router} />
            </Stack>
        </ThemeProvider>
    </React.StrictMode>
)
