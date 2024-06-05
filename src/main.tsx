import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './pages/landing-page/index.tsx'
import Statistics from './pages/statistics/index.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme.ts'
import PluginTrends from './pages/plugin-trends/index.tsx'
import PluginDetail from './pages/plugin-detail/index.tsx'

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
        path: '/plugin/:id', // Add this route
        element: <PluginDetail />, // Reference the PluginSummary component
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
)
