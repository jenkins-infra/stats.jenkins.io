import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { FaGithub } from 'react-icons/fa'
import './NavBar.css'

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
    return (
        <div className="bar">
            <Box className="name">
                <Typography
                    sx={{
                        margin: '0.5rem',
                        fontFamily: 'Georgia, Times, “Times New Roman”, serif',
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                    }}
                >
                    Jenkins
                </Typography>
            </Box>
            <Box sx={{ marginLeft: 'auto' }}>
                <Button
                    variant="contained"
                    startIcon={<FaGithub />}
                    href="https://github.com/shlomomdahan/stats2.jenkins.io"
                    style={{
                        margin: '0.5rem',
                        backgroundColor: '#939FA1',
                        fontWeight: 'bold',
                        fontFamily: 'Montserrat, Times, “Times New Roman”, serif',
                    }}
                >
                    Fork Me on GitHub
                </Button>
            </Box>
        </div>
    )
}

export default NavBar
