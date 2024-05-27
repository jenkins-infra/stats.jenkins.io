// import React from 'react'
import jenkinsButler from '../../assets/jenkins-butler.svg'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import './landing-page.css'
import { NavLink } from 'react-router-dom'
import { styled } from '@mui/system'
import { Box, Stack, Typography } from '@mui/material'

const StatsLink = styled(NavLink)({
    display: 'block',
    width: '70%',
    marginBottom: '1.2rem',
    background: '#ebedf0',
    color: 'black',
    padding: '0.5rem 1rem',
    border: '2px solid transparent',
    borderRadius: '0.66rem',
    fontWeight: 'bold',
    fontSize: '1rem',
    fontFamily: 'Montserrat, Times, “Times New Roman”, serif',
    '&:hover': {
        color: '#5468ff',
        border: '2px solid #5468ff',
    },
    boxShadow: '1.5px 4px 5px 0 rgba(0, 0, 0, 0.2)',
    '@media (max-width: 1024px)': {
        fontSize: '0.8rem',
        marginBottom: '0.8rem',
    },
    '@media (max-width: 768px)': {
        fontSize: '0.8rem',
        marginBottom: '0.5rem',
    },
})

export default function landingPage() {
    return (
        <Stack
            sx={{
                backgroundColor: 'white',
                alignItems: 'center',
                minHeight: '100vh',
                minWidth: '100vw',
            }}
        >
            <NavBar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    justifyContent: 'center',
                    flex: '1',
                    marginTop: '4rem',
                    marginBottom: '4rem',
                    '@media (max-height: 1150px)': {
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '6rem',
                    },

                    // width: '80vw',
                }}
            >
                <a href="https://www.jenkins.io" target="_blank" rel="noopener noreferrer">
                    <img src={jenkinsButler} className="logo" alt="Jenkins Butler Logo" />
                </a>
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
            </Box>
            <Footer />
        </Stack>
    )
}
