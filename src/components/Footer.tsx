import { Box, Typography } from '@mui/material'
import waves from '../assets/waves.svg'

export default function Footer() {
    return (
        <Box
            sx={{
                width: '100vw',
                height: '70vh',
                backgroundImage: `url(${waves})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                flexDirection: 'column', // Sets the primary axis to vertical
                justifyContent: 'flex-end', // Aligns children to the end of the container along the primary axis
                alignItems: 'center', // Centers children along the cross axis (horizontally)
                position: 'absolute',
                color: 'black',
                bottom: 0,
            }}
        >
            <Typography
                variant="body1"
                sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat, serif',
                    color: 'white',
                    padding: '0.5rem',
                }}
            >
                © 2024 Jenkins Infra-Statistics. All rights reserved.
            </Typography>
        </Box>
    )
}
