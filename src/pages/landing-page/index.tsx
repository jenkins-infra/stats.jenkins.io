// import React from 'react'
import jenkinsButler from '../../assets/jenkins-butler.svg'
import NavBar from '../../components/NavBar'
import './landing-page.css'
import { NavLink } from 'react-router-dom'
import { styled } from '@mui/system'
import { Box, Typography } from '@mui/material'

const StatsLink = styled(NavLink)({
    display: 'block',
    margin: '0.5rem',
    background: '#939fa1',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontFamily: 'Montserrat, Times, “Times New Roman”, serif',
})

export default function landingPage() {
    return (
        <>
            <NavBar />
            <Box className="background">
                <a href="https://www.jenkins.io" target="_blank" rel="noopener noreferrer">
                    <img src={jenkinsButler} className="logo" alt="Jenkins Butler Logo" />
                </a>
                <Box className="landing-text">
                    <Box sx={{ margin: '3rem 0 1.5rem 0' }}>
                        <Typography
                            variant="h3"
                            className="landing-text-1"
                            sx={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}
                        >
                            Jenkins Infra-Statistics
                        </Typography>
                        <Typography className="landing-text-2" sx={{ fontFamily: 'Montserrat' }}>
                            Graphical representation of numbers and information around Jenkins
                        </Typography>
                    </Box>
                    <nav className="stats">
                        <StatsLink to={'/statistics'}>Statistics in Detail</StatsLink>
                        <StatsLink to={'/'}>Plugin Installation Trend</StatsLink>
                        <StatsLink to="https://www.jenkins.io">Plugin Versions by Jenkins Version</StatsLink>
                        <StatsLink to="https://www.jenkins.io">Jenkins Plugin Dependency Graph</StatsLink>
                    </nav>
                </Box>
            </Box>
        </>
    )
}
