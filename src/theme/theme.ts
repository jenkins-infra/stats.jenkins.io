// src/theme/theme.ts
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 400,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h3: {
            fontSize: '3rem',
            '@media (max-width:1024px)': {
                fontSize: '2rem',
            },
            '@media (max-width:600px)': {
                fontSize: '1.5rem',
            },
        },
        body1: {
            fontSize: '1rem',
            '@media (max-width:600px)': {
                fontSize: '0.8rem',
            },
        },
    },
})

export default theme

// colors:

// background: white
// navbar: #212529
// navbar fork me button: #ebedf0
// navbar fork me button hover: #5468ff
// navbar fork me button hover border: #5468ff
// footer: #1077ad