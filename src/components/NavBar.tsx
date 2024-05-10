import React from 'react'
import Button from '@mui/material/Button'
import { FaGithub } from 'react-icons/fa'
import './NavBar.css'

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
    return (
        <div className="bar">
            <div className="name">Jenkins</div>
            <Button
                variant="contained"
                startIcon={<FaGithub />}
                href="https://www.github.com"
                style={{
                    marginRight: '2vh',
                    backgroundColor: '#939FA1',
                    fontWeight: 'bold',
                }}
            >
                Fork Me on GitHub
            </Button>
        </div>
    )
}

export default NavBar
