import React from 'react'
import { Box, Button, Typography, styled } from '@mui/material'
import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom' // Import Link from react-router-dom
import theme from '../theme/theme'

const StyledBar = styled(Box)(({ theme }) => ({
    width: '100%',
    backgroundColor: '#212529',
    height: '4.5vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
        height: '6vh',
    },
    position: 'fixed',
    top: 0,
    zIndex: 1000,
}))

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: '1.5rem',
    fontFamily: 'Georgia, Times, “Times New Roman”, serif',
    fontWeight: 'bold',
    padding: '1.5vh',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.3rem',
        padding: '0.5rem',
    },
}))

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
    return (
        <StyledBar>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledName variant="h6">Jenkins</StyledName>
            </Link>
            <Button
                variant="contained"
                startIcon={<FaGithub />}
                href="https://github.com/shlomomdahan/stats2.jenkins.io"
                sx={{
                    margin: '0.5rem',
                    backgroundColor: '#ebedf0',
                    borderRadius: '1rem',
                    color: '#808080',
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat, serif',
                    '&:hover': {
                        backgroundColor: 'white',
                        border: '2px solid #5468ff',
                        color: 'black',
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: '0.8rem',
                        padding: '0.2rem 0.5rem',
                    },
                }}
            >
                Fork Me on GitHub
            </Button>
        </StyledBar>
    )
}

export default NavBar
