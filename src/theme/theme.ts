import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    typography: {
        fontFamily: 'Monospace, roboto',
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
            fontSize: '0.9rem',
            '@media (max-width:600px)': {
                fontSize: '0.8rem',
            },
        },
    },
})

export default theme
