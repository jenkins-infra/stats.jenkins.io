// ResetZoomButton.tsx
import React from 'react'
import Button from '@mui/material/Button'
import * as echarts from 'echarts'

interface ResetZoomButtonProps {
    chartInstance: echarts.ECharts | null
}

const ResetZoomButton: React.FC<ResetZoomButtonProps> = ({ chartInstance }) => {
    const resetZoom = () => {
        if (chartInstance) {
            chartInstance.dispatchAction({
                type: 'dataZoom',
                start: 0,
                end: 100,
            })
        }
    }

    return (
        <Button
            onClick={resetZoom}
            variant="outlined"
            color="primary"
            size="small"
            sx={{
                width: '20%',
            }}
        >
            Reset Zoom
        </Button>
    )
}

export default ResetZoomButton
