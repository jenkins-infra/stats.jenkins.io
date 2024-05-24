import React, { useState } from 'react'
import { Button, Stack, Typography, styled, Menu, MenuItem } from '@mui/material'
import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { KeyboardArrowDown } from '@mui/icons-material'
import theme from '../theme/theme'

const StyledBar = styled(Stack)({
    height: '60px',
    width: '100%',
    backgroundColor: '#212529',
    alignItems: 'center',
    justifyContent: 'space-between',
})

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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <StyledBar direction="row">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledName variant="h6">Jenkins</StyledName>
            </Link>
            <Stack
                sx={{
                    // display: 'flex',
                    alignItems: 'center',
                }}
                direction="row"
            >
                <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    sx={{
                        color: 'gray',
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                    }}
                >
                    Menu
                    <KeyboardArrowDown sx={{ marginLeft: '2px' }} />
                </Button>
                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={handleClose} component={Link} to="/">
                        Home
                    </MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/statistics">
                        Statistics
                    </MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/plugin-detail">
                        Plugin Installation Trend
                    </MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/">
                        Plugin Versions by Jenkins Version
                    </MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/">
                        Jenkins Plugin Dependency Graph
                    </MenuItem>
                    {/* Add more MenuItems as needed */}
                </Menu>
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
                        fontFamily: 'Georgia, serif',

                        '&:hover': {
                            backgroundColor: 'white',
                            border: '2px solid #5468ff',
                            color: 'black',
                        },
                        [theme.breakpoints.down('sm')]: {
                            fontSize: '0.8rem',
                            padding: '0.2rem 0.5rem',
                        },
                        [theme.breakpoints.down('xs')]: {
                            fontSize: '0.42rem',
                            padding: '0.2rem 0.5rem',
                        },
                    }}
                >
                    Fork Me on GitHub
                </Button>
            </Stack>
        </StyledBar>
    )
}

export default NavBar
