import React, { useState } from 'react'
import { Button, Stack, Typography, styled, Menu, MenuItem, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import { KeyboardArrowDown } from '@mui/icons-material'
import ForkMeButton from './Buttons/ForkMeButton'
import MenuIcon from '@mui/icons-material/Menu'

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
        marginLeft: '0.5rem',
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

    const isMobile = useMediaQuery('(max-width:600px)')

    return (
        <StyledBar direction="row">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledName variant="h6">Jenkins</StyledName>
            </Link>
            <Stack
                sx={{
                    // display: 'flex',
                    alignItems: 'center',
                    paddingRight: isMobile ? '0.5rem' : '0',
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
                    {/* {!isMobile && <KeyboardArrowDown sx={{ marginLeft: '2px' }} />} */}
                    {!isMobile && (
                        <>
                            <>Menu</>
                            <KeyboardArrowDown sx={{ marginLeft: '2px' }} />
                        </>
                    )}
                    {isMobile && <MenuIcon sx={{}} />}
                </Button>
                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={handleClose} component={Link} to="/">
                        Home
                    </MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/statistics">
                        Statistics
                    </MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/plugin-trends">
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
                {!isMobile && <ForkMeButton />}
            </Stack>
        </StyledBar>
    )
}

export default NavBar
