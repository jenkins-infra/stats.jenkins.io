// import React from 'react'
import jenkinsButler from '../../assets/jenkins-butler.svg'
import NavBar from '../../components/Layout/NavBar'
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
        // backgroundColor: '#476485',
        backgroundImage: 'linear-gradient(315deg, #007FFF 0%, #005BBB 74%)',
        color: 'white',
        fontWeight: 'bold',
        opacity: '0.7',
        // border: '2px solid #5468ff',
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
        <Stack
            sx={{
                backgroundColor: '#f0f0f0',
                alignItems: 'center',
                minHeight: '100vh',
                minWidth: '100vw',
            }}
        >
            <NavBar />
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
                        flexDirection: 'column',
                        gap: '2rem',
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
                            Jenkins Infra-Statistics
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
                        <StatsLink to="https://www.jenkins.io">Plugin Versions by Jenkins Version</StatsLink>
                        <StatsLink to="https://www.jenkins.io">Jenkins Plugin Dependency Graph</StatsLink>
                    </Stack>
                </Box>
            </Paper>
            <Footer />
        </Stack>
    )
}

export default LandingPage
