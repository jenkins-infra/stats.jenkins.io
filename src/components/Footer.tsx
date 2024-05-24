import { Box, Stack, Typography } from '@mui/material'

export default function Footer() {
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
            <Box sx={{ marginBottom: 'auto', textAlign: 'center' }}>
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
        </Stack>
    )
}
