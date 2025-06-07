import React from 'react'
import { Box, Typography } from '@mui/material'
import useSystemTheme from '../../hooks/useSystemTheme'

interface InfoHeaderProps {
    generationTime: string
    updateFrequency: string
}

const InfoHeader: React.FC<InfoHeaderProps> = ({ generationTime, updateFrequency }) => {
    const { systemTheme } = useSystemTheme()

    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: systemTheme === 'dark' ? '#1b1b22' : '#f5f5f5',
                padding: '0.5rem',
                textAlign: 'center',
                borderBottom: '1px solid',
                borderColor: systemTheme === 'dark' ? '#333' : '#ddd',
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    color: systemTheme === 'dark' ? '#f0f0f0' : '#666',
                    fontSize: '0.875rem',
                }}
            >
                Generated at {generationTime}, updated every {updateFrequency}
            </Typography>
        </Box>
    )
}

export default InfoHeader 