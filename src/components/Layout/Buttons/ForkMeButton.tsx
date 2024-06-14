import { Button } from '@mui/material'
import { FaGithub } from 'react-icons/fa'

export default function ForkMeButton() {
    return (
        <Button
            variant="contained"
            startIcon={<FaGithub />}
            href="https://github.com/shlomomdahan/stats2.jenkins.io"
            sx={{
                margin: '0.5rem',
                backgroundColor: '#ebedf0',
                borderRadius: '1rem',
                color: '#808080',
                fontWeight: 'bold',
                fontFamily: 'Georgia, serif',

                '&:hover': {
                    backgroundColor: 'white',
                    border: '2px solid #5468ff',
                    color: 'black',
                },
            }}
        >
            Fork Me on GitHub
        </Button>
    )
}
