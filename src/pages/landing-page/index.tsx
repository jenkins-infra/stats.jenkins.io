import jenkinsButler from '../../assets/jenkins-butler.svg'
import Footer from '../../components/Layout/Footer'
import './landing-page.css'
import { Link, NavLink } from 'react-router-dom'
import { styled } from '@mui/system'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { keyframes } from '@emotion/react'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const StatsLink = styled(NavLink)({
    display: 'block',
    width: '100%',
    // boxSizing: 'border-box',
    marginBottom: '1rem',
    color: 'black',
    fontSize: '1rem',
    fontFamily:
        'system-ui, "Segoe UI", roboto, "Noto Sans", oxygen, ubuntu, cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
    padding: '0.5rem',
    paddingLeft: '1rem',
    marginLeft: '0.5rem',
    borderRadius: '0.75rem',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#212529',
        transform: 'scale(1.05)',
    },
    '@media (max-width: 1024px)': {
        fontSize: '0.9rem',
        marginBottom: '0.8rem',
    },
    '@media (max-width: 768px)': {
        fontSize: '0.8rem',
        marginBottom: '0.5rem',
    },
})

const LandingPage: React.FC = () => {
    return (
        <Stack
            id="background"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100vw',
                backgroundColor: '#f0f0f0',
                backgroundImage: 'radial-gradient(#16161d 0.9px, #f0f0f0 0.9px)',
                backgroundSize: '18px 18px',
                overflow: 'auto',
                animation: `${fadeIn} 1s ease-in-out`,
                '@media (prefers-color-scheme: dark)': {
                    backgroundImage: 'radial-gradient(#f0f0f0 0.9px, #16161d 0.9px)',
                },
            }}
        >
            <Box
                sx={{
                    flex: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Paper
                    elevation={16}
                    sx={{
                        width: '60%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '1rem',
                        marginTop: '4rem',
                        marginBottom: '4rem',
                        gap: '3.5rem',
                        backgroundColor: 'white',
                        padding: '6rem',
                        '@media (max-width: 1024px)': {
                            // gap: '5rem',
                        },
                        '@media (max-width: 900px)': {
                            padding: '2rem',
                            marginTop: '2rem',
                            marginBottom: '2rem',
                            flexDirection: 'column',
                            gap: '1rem',
                        },
                        '@media (prefers-color-scheme: dark)': {
                            backgroundColor: '#1b1b22',
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: '50%',
                            marginTop: '1.5rem',
                            '@media (max-width: 768px)': {
                                marginTop: '0',
                            },
                        }}
                    >
                        <Link to={'https://www.jenkins.io'} target="_blank" rel="noopener noreferrer">
                            <img src={jenkinsButler} className="logo" alt="Jenkins Butler Logo" />
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            textAlign: 'left',
                            color: 'black',
                            padding: '0.5rem',
                            '@media (max-width: 900px)': {
                                textAlign: 'center',
                            },
                            '@media (prefers-color-scheme: dark)': {
                                color: 'white',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                margin: '3rem 0 2.3rem 0',
                                '@media (max-width: 768px)': {
                                    marginTop: '0.8rem',
                                    marginBottom: '1.5rem',
                                },
                                '@media (max-width: 1024px)': {
                                    marginTop: '0.8rem',
                                    marginBottom: '1.5rem',
                                },
                            }}
                        >
                            <Typography variant="h4" sx={{ fontFamily: 'Georgia, sarif', fontWeight: 'bold' }}>
                                Jenkins Statistics
                            </Typography>
                            <Typography>Graphical representation of numbers and information around Jenkins</Typography>
                        </Box>
                        <Stack
                            sx={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <StatsLink to={'/statistics'}>Statistics in Detail</StatsLink>
                            <StatsLink to={'/plugin-trends'}>Plugin Installation Trend</StatsLink>
                            <StatsLink to={'/plugin-versions'}>Plugin Versions by Jenkins Version</StatsLink>
                            <StatsLink to={'/dep-graph'}>Jenkins Plugin Dependency Graph</StatsLink>
                        </Stack>
                    </Box>
                </Paper>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Footer />
            </Box>
        </Stack>
    )
}

export default LandingPage
