import { Box, Stack, Typography, useMediaQuery } from '@mui/material'
import ForkMeButton from './ForkMeButton'

export default function Footer() {
    const isMobile = useMediaQuery('(max-width:600px)')

    return (
        <Stack
            sx={{
                width: '100%',
                height: '10rem',
                backgroundColor: '#1077ad',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: '2rem 0',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                {isMobile && (
                    <Box
                        sx={{
                            padding: '1rem',
                        }}
                    >
                        <ForkMeButton />
                    </Box>
                )}
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
            </Box>
        </Stack>
    )
}
