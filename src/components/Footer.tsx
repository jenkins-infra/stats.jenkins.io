import { Box, Typography } from '@mui/material'
// import waves from '../assets/waves.svg'

export default function Footer() {
    return (
        <Box
            sx={{
                width: '100vw',
                height: '20vh',
                backgroundColor: '#1077ad',
                // backgroundImage: 'linear-gradient(180deg, white 0%, #1077ad 30%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                position: 'absolute',
                color: 'black',
                bottom: 0,
            }}
        >
            <Typography
                variant="body1"
                sx={{
                    fontFamily: 'Georgia, serif',
                    color: 'white',
                    padding: '0.5rem',
                }}
            >
                Jenkins-stats maintained by{' '}
                <a
                    href="https://github.com/jenkinsci/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'white' }}
                >
                    <strong>community</strong>
                </a>
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    fontFamily: 'Georgia, serif',
                    color: 'white',
                    padding: '0.5rem',
                }}
            >
                Published with{' '}
                <a
                    href="https://github.com/jenkinsci/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'white' }}
                >
                    <strong>GitHub Pages</strong>
                </a>
            </Typography>
            <Box
                sx={{
                    padding: '2rem',
                }}
            ></Box>

            <Typography
                variant="body1"
                sx={{
                    fontWeight: 'semi-bold',
                    fontFamily: 'Georgia, serif',
                    color: 'white',
                    padding: '0.5rem',
                }}
            >
                © 2024 Jenkins Infra-Statistics. All rights reserved.
            </Typography>
        </Box>
    )
}
