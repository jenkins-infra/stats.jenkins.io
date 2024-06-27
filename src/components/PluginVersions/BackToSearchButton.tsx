import React from 'react'
import { Button, Box } from '@mui/material'

interface BackToSearchProps {
    onClick: () => void
}

const BackToSearch: React.FC<BackToSearchProps> = ({ onClick }) => (
    <Box sx={{ width: '100%', position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#f0f0f0' }}>
        <Button
            size="small"
            onClick={onClick}
            sx={{
                color: '#333',
                backgroundColor: '#f0f0f0',
                '&:hover': {
                    color: 'blue',
                    backgroundColor: '#f0f0f0',
                },
            }}
        >
            &larr; Back to Search
        </Button>
    </Box>
)

export default BackToSearch
