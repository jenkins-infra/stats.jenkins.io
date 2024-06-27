import jenkinsButler from '../../assets/jenkins-butler.svg'
import Footer from '../../components/Layout/Footer'
import './landing-page.css'
import { Link, NavLink } from 'react-router-dom'
import { styled } from '@mui/system'
import { Box, Paper, Stack, Typography, Button } from '@mui/material'
import { keyframes } from '@emotion/react'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const StatsLink = styled(NavLink)({
    display: 'block',
    width: '100%',
    marginBottom: '1rem',
    color: 'black',
    fontSize: '1rem',
    fontFamily: 'Monospace',
    '&:hover': {
        color: '#3f51b5',
        fontWeight: 'bold',
    },
    '@media (max-width: 1024px)': {
        fontSize: '1rem',
        marginBottom: '0.8rem',
    },
    '@media (max-width: 768px)': {
        fontSize: '0.9rem',
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
                    animation: `${fadeIn} 1s ease-in-out`,
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
                        borderRadius: '1rem',
                        marginTop: '4rem',
                        marginBottom: '4rem',
                        gap: '10rem',
                        backgroundColor: 'white',
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
                    <Box sx={{ textAlign: 'left', color: 'black', padding: '0.5rem' }}>
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
                            <Typography variant="h4" sx={{ fontFamily: 'Monospace', fontWeight: 'bold' }}>
                                Jenkins Statistics
                            </Typography>
                            <Typography sx={{ fontFamily: 'Monospace' }}>
                                Graphical representation of numbers and information around Jenkins
                            </Typography>
                        </Box>
                        <Stack
                            sx={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <StatsLink to={'/statistics'}>1. Statistics in Detail</StatsLink>
                            <StatsLink to={'/plugin-trends'}>2. Plugin Installation Trend</StatsLink>
                            <StatsLink to="https://www.jenkins.io">3. Plugin Versions by Jenkins Version</StatsLink>
                            <StatsLink to="https://www.jenkins.io">4. Jenkins Plugin Dependency Graph</StatsLink>
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

// import jenkinsButler from '../../assets/jenkins-butler.svg'
// import Footer from '../../components/Layout/Footer'
// import './landing-page.css'
// import { Link, NavLink } from 'react-router-dom'
// import { styled } from '@mui/system'
// import { Box, Paper, Stack, Typography } from '@mui/material'

// const StatsLink = styled(NavLink)({
//     display: 'block',
//     width: '100%',
//     marginBottom: '1rem',
//     color: 'black',

//     fontSize: '1rem',
//     fontFamily: 'Monospace',
//     '&:hover': {
//         color: 'blue',
//         fontWeight: 'bold',
//     },

//     '@media (max-width: 1024px)': {
//         fontSize: '0.8rem',
//         marginBottom: '0.8rem',
//     },
//     '@media (max-width: 768px)': {
//         fontSize: '0.8rem',
//         marginBottom: '0.5rem',
//     },
// })

// const LandingPage: React.FC = () => {
//     return (
//         <>
//             <Stack
//                 sx={{
//                     backgroundColor: '#f0f0f0',
//                     alignItems: 'center',
//                     width: '100vw',
//                     height: '100vh',
//                     overflow: 'auto',
//                 }}
//             >
//                 <Paper
//                     elevation={16}
//                     sx={{
//                         width: '70%',
//                         display: 'flex',
//                         flexDirection: 'row',
//                         alignContent: 'center',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         flex: '1',
//                         borderRadius: '1rem',
//                         marginTop: '4rem',
//                         marginBottom: '4rem',
//                         gap: '10rem',
//                         backgroundColor: 'white',
//                         padding: '6rem',
//                         '@media (max-width: 768px)': {
//                             padding: '2rem',
//                             marginTop: '2rem',
//                             marginBottom: '2rem',
//                             flexDirection: 'column',
//                             gap: '1rem',
//                         },
//                     }}
//                 >
//                     <Box
//                         sx={{
//                             marginTop: '1.5rem',
//                             '@media (max-width: 768px)': {
//                                 marginTop: '0',
//                             },
//                         }}
//                     >
//                         <Link to={'https://www.jenkins.io'} target="_blank" rel="noopener noreferrer">
//                             <img src={jenkinsButler} className="logo" alt="Jenkins Butler Logo" />
//                         </Link>
//                     </Box>
//                     <Box sx={{ textAlign: 'left', color: 'black', padding: '0.5rem' }}>
//                         <Box
//                             sx={{
//                                 margin: '3rem 0 2.3rem 0',
//                                 '@media (max-width: 768px)': {
//                                     marginTop: '0.8rem',
//                                     marginBottom: '1.5rem',
//                                 },
//                                 '@media (max-width: 1024px)': {
//                                     marginTop: '0.8rem',
//                                     marginBottom: '1.5rem',
//                                 },
//                             }}
//                         >
//                             <Typography variant="h3" sx={{ fontFamily: 'Monospace', fontWeight: 'bold' }}>
//                                 Jenkins Statistics
//                             </Typography>
//                             <Typography sx={{ fontFamily: 'Monospace' }}>
//                                 Graphical representation of numbers and information around Jenkins
//                             </Typography>
//                         </Box>
//                         <Stack
//                             sx={{
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                             }}
//                         >
//                             <StatsLink to={'/statistics'}>1. Statistics in Detail</StatsLink>
//                             <StatsLink to={'/plugin-trends'}>2. Plugin Installation Trend</StatsLink>
//                             <StatsLink to="https://www.jenkins.io">3. Plugin Versions by Jenkins Version</StatsLink>
//                             <StatsLink to="https://www.jenkins.io">4. Jenkins Plugin Dependency Graph</StatsLink>
//                         </Stack>
//                     </Box>
//                 </Paper>
//                 <Box sx={{ width: '100%' }}>
//                     <Footer />
//                 </Box>
//             </Stack>
//         </>
//     )
// }

// export default LandingPage
