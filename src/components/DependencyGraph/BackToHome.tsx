import React from 'react'
import { Button, Box } from '@mui/material'

const BackToHome: React.FC = () => (
    <Box sx={{ width: '100%', marginBottom: '12px' }}>
        <Button
            size="small"
            onClick={() => (window.location.href = '/')}
            sx={{
                color: 'white',
                '&:hover': {
                    color: '#2196f3',
                },
            }}
        >
            &larr; Back to Home
        </Button>
    </Box>
)

export default BackToHome
