import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import BackToHome from '../Layout/BackToHome'

interface GraphToolsProps {
    searchTerm: string
    // eslint-disable-next-line no-unused-vars
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    // eslint-disable-next-line no-unused-vars
    setSearchTerm: (value: string) => void
}

const GraphTools: React.FC<GraphToolsProps> = ({ searchTerm, handleSearchChange, setSearchTerm }) => {
    return (
        <>
            <BackToHome color="white" />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <TextField
                    label="Filter Plugins by Name / Maintainer"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{
                        width: '300px',
                        marginRight: '10px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '8px',
                            },
                            '&:hover fieldset': {
                                borderColor: '#2196f3',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#2196f3',
                            },
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                    }}
                    InputLabelProps={{
                        style: { color: 'white' },
                    }}
                    InputProps={{
                        style: { color: 'white' },
                    }}
                />
                <Button
                    onClick={() => setSearchTerm('')}
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        padding: '10px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            borderColor: '#2196f3',
                        },
                    }}
                >
                    Clear
                </Button>
            </Box>
            <Typography
                sx={{
                    color: 'white',
                    marginTop: '10px',
                    marginLeft: '10px',
                }}
            >
                drag / drop / hover / click any node...
            </Typography>
        </>
    )
}

export default GraphTools
