import React from 'react'
import { Box, Button, Typography, styled } from '@mui/material'
import { FaGithub } from 'react-icons/fa'
import theme from '../theme/theme'

const StyledBar = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '4.5vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
        height: '6vh',
    },
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
            <StyledName variant="h6">Jenkins</StyledName>
            <Button
                variant="contained"
                startIcon={<FaGithub />}
                href="https://github.com/shlomomdahan/stats2.jenkins.io"
                sx={{
                    margin: '0.5rem',
                    backgroundColor: '#939FA1',
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat, serif',
                    '&:hover': {
                        backgroundColor: '#939FA1',
                        color: 'blue',
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

// import React from 'react'
// import { Box, Button, Typography } from '@mui/material'
// import { FaGithub } from 'react-icons/fa'
// import './NavBar.css'

// interface NavBarProps {}

// const NavBar: React.FC<NavBarProps> = () => {
//     return (
//         <div className="bar">
//             <Box className="name">
//                 <Typography
//                     sx={{
//                         fontFamily: 'Georgia, Times, “Times New Roman”, serif',
//                         fontWeight: 'bold',
//                         fontSize: '1.5rem',
//                         '@media (max-width:600px)': {
//                             fontSize: '1.3rem',
//                             padding: '0.5rem',
//                         },
//                     }}
//                 >
//                     Jenkins
//                 </Typography>
//             </Box>
//             <Box sx={{ marginLeft: 'auto' }}>
//                 <Button
//                     variant="contained"
//                     startIcon={<FaGithub />}
//                     href="https://github.com/shlomomdahan/stats2.jenkins.io"
//                     sx={{
//                         margin: '0.5rem',
//                         backgroundColor: '#939FA1',
//                         fontWeight: 'bold',
//                         fontFamily: 'Montserrat, Times, “Times New Roman”, serif',
//                         '&:hover': {
//                             // backgroundColor: '#939FA1', // Maintain background color on hover
//                             color: 'orange', // Change text color to orange on hover
//                         },
//                         '@media (max-width:600px)': {
//                             fontSize: '1rem',
//                             padding: '0.2rem 0.5rem 0.2rem 0.5rem',
//                         },
//                     }}
//                 >
//                     Fork Me on GitHub
//                 </Button>
//             </Box>
//         </div>
//     )
// }

// export default NavBar
