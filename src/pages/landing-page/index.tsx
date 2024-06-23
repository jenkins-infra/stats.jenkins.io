import jenkinsButler from '../../assets/jenkins-butler.svg'
import Footer from '../../components/Layout/Footer'
import './landing-page.css'
import { Link, NavLink } from 'react-router-dom'
import { styled } from '@mui/system'
import { Box, Paper, Stack, Typography } from '@mui/material'

const StatsLink = styled(NavLink)({
    display: 'block',
    width: '70%',
    marginBottom: '1rem',
    background: '#ebedf0',
    opacity: '0.9',
    color: 'black',
    padding: '0.5rem 1rem',
    border: '2px solid transparent',
    borderRadius: '0.66rem',
    boxShadow: '1.5px 4px 5px 0 rgba(0, 0, 0, 0.2)',
    fontSize: '0.9rem',
    fontFamily: 'Georgia, Times, “Times New Roman”, serif',
    '&:hover': {
        backgroundImage: 'linear-gradient(315deg, #007FFF 0%, #005BBB 74%)',
        color: 'white',
        fontWeight: 'bold',
        opacity: '0.7',
    },

    '@media (max-width: 1024px)': {
        fontSize: '0.8rem',
        marginBottom: '0.8rem',
    },
    '@media (max-width: 768px)': {
        fontSize: '0.8rem',
        marginBottom: '0.5rem',
    },
})

const LandingPage: React.FC = () => {
    return (
        <>
            <Stack
                sx={{
                    backgroundColor: '#f0f0f0',
                    alignItems: 'center',
                    width: '100vw',
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Paper
                    elevation={16}
                    sx={{
                        width: '70%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: '1',
                        marginTop: '4rem',
                        marginBottom: '4rem',
                        gap: '5rem',
                        backgroundColor: 'white',
                        borderRadius: '1.5rem',
                        padding: '6rem',
                        '@media (max-width: 768px)': {
                            padding: '2rem',
                            marginTop: '2rem',
                            marginBottom: '2rem',
                            flexDirection: 'column',
                            gap: '1rem',
                        },
                    }}
                >
                    <Box
                        sx={{
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
                    <Box sx={{ textAlign: 'center', color: 'black', padding: '0.5rem' }}>
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
                            <Typography variant="h3" sx={{ fontFamily: 'Georgia', fontWeight: 'bold' }}>
                                Jenkins Statistics
                            </Typography>
                            <Typography sx={{ fontFamily: 'Georgia' }}>
                                Graphical representation of numbers and information around Jenkins
                            </Typography>
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
                            <StatsLink to="https://www.jenkins.io">Jenkins Plugin Dependency Graph</StatsLink>
                        </Stack>
                    </Box>
                </Paper>
                <Box sx={{ width: '100%' }}>
                    <Footer />
                </Box>
            </Stack>
        </>
    )
}

export default LandingPage
