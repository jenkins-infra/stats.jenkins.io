import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material'
import { data, DataRow } from '../data/statisticsData'

// Utility function to get the month abbreviation
const getMonthAbbreviation = (month: number) => {
    const date = new Date()
    date.setMonth(month - 1)
    return date.toLocaleString('default', { month: 'short' })
}

interface StatisticsTableProps {
    year?: number
}

const StatisticsTable: React.FC<StatisticsTableProps> = ({ year }) => {
    const downloadFile = (type: string, month: number, year: number, format: string) => {
        const row = data.find((d) => d.month === month && d.year === year)
        if (!row) {
            console.error(`Data for ${month}-${year} not found`)
            return
        }

        const fileKey = `${type}${format}`
        const fileUrl = row[fileKey as keyof DataRow]

        if (fileUrl && typeof fileUrl === 'string') {
            const link = document.createElement('a')
            link.href = fileUrl
            link.download = `${type}_${year}_${month}.${format.toLowerCase()}`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } else {
            console.error(`File URL for ${fileKey} not found`)
        }
    }

    const filteredData = year ? data.filter((row) => row.year === year) : data

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 970, width: '95%' }}>
            <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="statistics table" stickyHeader>
                <TableHead
                    sx={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        backgroundColor: 'white',
                        '& th': {
                            fontSize: '0.875rem',
                            padding: '8px',
                            backgroundColor: '#939FA1',
                            color: 'black',
                            fontWeight: 'bold',
                        },
                    }}
                >
                    <TableRow>
                        <TableCell align="center">Month</TableCell>
                        <TableCell align="center">Year</TableCell>
                        <TableCell align="center">Jenkins</TableCell>
                        <TableCell align="center">Jobs</TableCell>
                        <TableCell align="center">Nodes</TableCell>
                        <TableCell align="center">Nodes Pie</TableCell>
                        <TableCell align="center">Plugins</TableCell>
                        <TableCell align="center">Top Plugins 1000</TableCell>
                        <TableCell align="center">Top Plugins 2500</TableCell>
                        <TableCell align="center">Top Plugins 500</TableCell>
                        <TableCell align="center">Total Executors</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody
                    sx={{
                        '& td': {
                            padding: '8px',
                            fontSize: '0.875rem',
                        },
                        '& tr:nth-of-type(odd)': {
                            backgroundColor: '#f9f9f9',
                        },
                        '& tr:hover': {
                            backgroundColor: '#f1f1f1',
                        },
                    }}
                >
                    {filteredData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">
                                {row.month} - ({getMonthAbbreviation(row.month)})
                            </TableCell>
                            <TableCell align="center">{row.year}</TableCell>
                            {[
                                'jenkins',
                                'jobs',
                                'nodes',
                                'nodesPie',
                                'plugins',
                                'topPlugins1000',
                                'topPlugins2500',
                                'topPlugins500',
                                'totalExecutors',
                            ].map((type) => (
                                <TableCell key={type} align="center">
                                    <Button
                                        variant="text"
                                        size="small"
                                        onClick={() => downloadFile(type, row.month, row.year, 'SVG')}
                                        sx={{
                                            marginRight: '5px',
                                            padding: '2px 5px',
                                            fontSize: '0.75rem',
                                            '&:hover': {
                                                backgroundColor: '#C7E4E8',
                                            },
                                        }}
                                    >
                                        SVG
                                    </Button>
                                    <Button
                                        variant="text"
                                        size="small"
                                        onClick={() => downloadFile(type, row.month, row.year, 'CSV')}
                                        sx={{
                                            padding: '2px 5px',
                                            fontSize: '0.75rem',
                                            '&:hover': {
                                                backgroundColor: '#C7E4E8',
                                            },
                                        }}
                                    >
                                        CSV
                                    </Button>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default StatisticsTable
