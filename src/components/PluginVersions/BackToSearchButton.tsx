import React from 'react'
import { Button, Box } from '@mui/material'

interface BackToSearchProps {
    onClick: () => void
}

const BackToSearch: React.FC<BackToSearchProps> = ({ onClick }) => (
    <Box
        sx={{
            width: '100%',
            position: 'sticky',
            top: 0,
            zIndex: 1,
            backgroundColor: '#f0f0f0',
            '@media (prefers-color-scheme: dark)': {
                backgroundColor: '#333333',
            },
        }}
    >
        <Button
            size="small"
            onClick={onClick}
            sx={{
                color: '#333',
                backgroundColor: '#f0f0f0',
                '&:hover': {
                    color: 'blue',
                    backgroundColor: '#f0f0f0',
                    '@media (prefers-color-scheme: dark)': {
                        backgroundColor: '#16161d',
                    },
                },
                '@media (prefers-color-scheme: dark)': {
                    backgroundColor: '#333333',
                    color: 'white',
                },
            }}
        >
            &larr; Back to Search
        </Button>
    </Box>
)

export default BackToSearch
