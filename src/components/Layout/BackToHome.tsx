import { Button, Box } from '@mui/material'

interface BackToHomeProps {
    color: string
}

const BackToHome = ({ color }: BackToHomeProps) => (
    <Box sx={{ width: '100%', marginBottom: '12px' }}>
        <Button
            size="small"
            onClick={() => (window.location.href = '/')}
            sx={{
                color: color,
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
