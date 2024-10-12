import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material'
import { data } from '../../../utils/generateDateArray'
import GraphModal from './GraphModal'
import { GraphType } from '../../../types/types'
import { InsertChartOutlined } from '@mui/icons-material'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'

// Utility function to get the month abbreviation
const getMonth = (month: string) => {
    const date = new Date()
    date.setMonth(Number(month) - 1)
    return date.toLocaleString('default', { month: 'short' })
}

interface StatisticsTableProps {
    year: string | null
}

const StatisticsTable: React.FC<StatisticsTableProps> = ({ year }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState<{ type: GraphType; month: string; year: string } | null>(null)

    const handleOpenModal = (type: GraphType, month: string, year: string) => {
        setModalData({ type, month, year })
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        setModalData(null)
    }

    const filteredData = year === 'all' ? data : data.filter((row) => row.year === year)

    // Optimized function to sort data by year and month in descending order
    const sortData = (dataArray: { year: string; month: string }[]): { year: string; month: string }[] => {
        return dataArray.sort((a, b) => {
            const yearDiff = Number(b.year) - Number(a.year);
            return yearDiff !== 0 ? yearDiff : Number(b.month) - Number(a.month);
        });
    };

    // Sorting the filtered data
    const sortedData = sortData(filteredData);

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{
                    maxHeight: 'calc(100vh - 124px)',
                    overflow: 'auto',
                }}
            >
                <Table sx={{ minWidth: 900, tableLayout: 'fixed' }} aria-label="statistics table" stickyHeader>
                    <TableHead
                        sx={{
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                            backgroundColor: 'white',
                            '& th': {
                                fontSize: '0.875rem',
                                padding: '8px',
                                backgroundColor: '#212529',
                                color: 'white',
                                fontWeight: 'bold',
                            },
                        }}
                    >
                        <TableRow>
                            <TableCell align="center">Year</TableCell>
                            <TableCell align="center">Month</TableCell>
                            <TableCell align="center">Jenkins</TableCell>
                            <TableCell align="center">Jobs</TableCell>
                            <TableCell align="center">Nodes</TableCell>
                            <TableCell align="center">Nodes Pie</TableCell>
                            <TableCell align="center">Plugins</TableCell>
                            <TableCell align="center">
                                Top Plugins <br /> {'>'} 500
                                <FileDownloadOutlinedIcon
                                    fontSize="small"
                                    sx={{
                                        verticalAlign: 'middle',
                                        marginLeft: '5px',
                                        marginBottom: '4px',
                                    }}
                                />
                            </TableCell>
                            <TableCell align="center">
                                Top Plugins <br /> {'>'} 1000
                                <FileDownloadOutlinedIcon
                                    fontSize="small"
                                    sx={{
                                        verticalAlign: 'middle',
                                        marginLeft: '5px',
                                        marginBottom: '4px',
                                    }}
                                />
                            </TableCell>
                            <TableCell align="center">
                                Top Plugins <br /> {'>'} 2500
                                <FileDownloadOutlinedIcon
                                    fontSize="small"
                                    sx={{
                                        verticalAlign: 'middle',
                                        marginLeft: '5px',
                                        marginBottom: '4px',
                                    }}
                                />
                            </TableCell>
                            <TableCell align="center">Total Executors</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody
                        sx={{
                            '& td': {
                                padding: '12px',
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
                        {sortedData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{row.year}</TableCell>
                                <TableCell align="center">
                                    {row.month} - ({getMonth(row.month)})
                                </TableCell>

                                {[
                                    'jenkins',
                                    'jobs',
                                    'nodes',
                                    'nodesPie',
                                    'plugins',
                                    'top-plugins500',
                                    'top-plugins1000',
                                    'top-plugins2500',
                                    'total-executors',
                                ].map((type) => (
                                    <TableCell key={type} align="center">
                                        <Button
                                            variant="text"
                                            size="small"
                                            onClick={() => handleOpenModal(type as GraphType, row.month, row.year)}
                                            sx={{
                                                padding: '2px 5px',
                                                fontSize: '0.75rem',
                                                '&:hover': {
                                                    backgroundColor: '#C7E4E8',
                                                },
                                            }}
                                        >
                                            <InsertChartOutlined fontSize="small" />
                                        </Button>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {modalData && (
                <GraphModal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    type={modalData.type}
                    year={modalData.year}
                    month={modalData.month}
                />
            )}
        </>
    )
}

export default StatisticsTable
