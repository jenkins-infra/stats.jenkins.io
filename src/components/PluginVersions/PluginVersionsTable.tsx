import React from 'react'
import { ParsedData } from '../../data/plugins'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Plugin } from '../../data/plugins'

interface PluginVersionsTableProps {
    parsedData: ParsedData | null
    loading: boolean
    selectedPlugin?: Plugin | null
}

const styles = {
    tableContainer: {
        flexGrow: 1,
        overflow: 'auto',
        '& table': {
            borderCollapse: 'collapse',
            width: 'max-content',
            tableLayout: 'fixed',
        },
        '& thead th, & tfoot th, & tfoot td': {
            position: 'sticky',
            zIndex: 1,
            padding: '2px 4px',
            fontWeight: 'bold',
        },
        '& thead th': {
            top: 0,
            backgroundColor: '#212529',
            color: 'white',
        },
        '& tfoot th, & tfoot td': {
            bottom: -1,
            backgroundColor: '#212529',
            color: 'white',
        },
        '& table td, & table th': {
            textAlign: 'center',
            padding: '3px 6px',
            border: 0,
            maxWidth: '100px',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            fontFamily: 'Monospace',
            fontSize: '12px',
            fontWeight: 'bold',
        },
        '& tr:nth-of-type(odd)': {
            backgroundColor: '#fff',
        },
        '& tr:nth-of-type(even)': {
            backgroundColor: '#eee',
        },
        '& tr.lts:nth-of-type(odd)': {
            backgroundColor: '#ccc',
        },
        '& tr.lts:nth-of-type(even)': {
            backgroundColor: '#bbb',
        },
        '& tr:nth-of-type(odd) td.subtotal': {
            backgroundColor: '#999',
        },
        '& tr:nth-of-type(even) td.subtotal': {
            backgroundColor: '#888',
        },
        '&::-webkit-scrollbar': {
            width: '12px',
            height: '12px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '10px',
            border: '3px solid #f0f0f0',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
        },
        '&::-webkit-scrollbar-track': {
            // backgroundColor: '#f0f0f0',
        },
    },
}

const PluginVersionsTable: React.FC<PluginVersionsTableProps> = ({ parsedData, selectedPlugin }) => {
    if (!selectedPlugin || !parsedData) return null

    return (
        <Paper
            elevation={16}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxHeight: '100%',
            }}
        >
            <TableContainer sx={styles.tableContainer}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>{parsedData.name}</TableCell>
                            {parsedData.pluginVersions.map((version: string) => (
                                <TableCell key={version}>{version}</TableCell>
                            ))}
                            <TableCell>Sum</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {parsedData.rows.map((row) => (
                            <TableRow key={row.coreVersion} className={row.coreVersion.includes('lts') ? 'lts' : ''}>
                                <TableCell>{row.coreVersion}</TableCell>
                                {row.cells.map((cell) => (
                                    <TableCell
                                        key={cell.version}
                                        title={cell.title}
                                        sx={{ opacity: cell.opacity + 0.2 }}
                                    >
                                        {cell.count > 0 ? cell.count : ''}
                                    </TableCell>
                                ))}
                                <TableCell className="subtotal" title={row.totalTitle}>
                                    {row.total}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <tfoot>
                        <TableRow>
                            <TableCell>Total</TableCell>
                            {parsedData.pluginVersions.map((version: string) => (
                                <TableCell key={version}>
                                    {parsedData.rows.reduce(
                                        (acc: number, row) =>
                                            acc + row.cells.find((cell) => cell.version === version)!.count,
                                        0
                                    )}
                                </TableCell>
                            ))}
                            <TableCell>{parsedData.totalInstalls}</TableCell>
                        </TableRow>
                    </tfoot>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default PluginVersionsTable

// import React from 'react'
// import { Plugin, ParsedData } from '../../data/plugins'
// import './PluginVersionsTable.css'

// interface PluginVersionsTableProps {
//     parsedData: ParsedData | null
//     loading: boolean
//     selectedPlugin?: Plugin | null
// }

// const PluginVersionsTable: React.FC<PluginVersionsTableProps> = ({ parsedData, loading, selectedPlugin }) => {
//     return (
//         <div id="versionsContainer">
//             {selectedPlugin ? (
//                 loading ? (
//                     <div>Loading...</div>
//                 ) : (
//                     parsedData && (
//                         <div>
//                             <table>
//                                 <thead>
//                                     <tr>
//                                         <th>{parsedData.name}</th>
//                                         {parsedData.pluginVersions.map((version: string) => (
//                                             <th key={version}>{version}</th>
//                                         ))}
//                                         <th>Sum</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {parsedData.rows.map((row) => (
//                                         <tr
//                                             key={row.coreVersion}
//                                             className={row.coreVersion.includes('lts') ? 'lts' : ''}
//                                         >
//                                             <th>{row.coreVersion}</th>
//                                             {row.cells.map((cell) => (
//                                                 <td
//                                                     key={cell.version}
//                                                     title={cell.title}
//                                                     style={{ opacity: cell.opacity }}
//                                                 >
//                                                     {cell.count > 0 ? cell.count : ''}
//                                                 </td>
//                                             ))}
//                                             <td className="subtotal" title={row.totalTitle}>
//                                                 {row.total}
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                                 <tfoot>
//                                     <tr>
//                                         <th>Total</th>
//                                         {parsedData.pluginVersions.map((version: string) => (
//                                             <td key={version}>
//                                                 {parsedData.rows.reduce(
//                                                     (acc: number, row) =>
//                                                         acc + row.cells.find((cell) => cell.version === version)!.count,
//                                                     0
//                                                 )}
//                                             </td>
//                                         ))}
//                                         <td>{parsedData.totalInstalls}</td>
//                                     </tr>
//                                 </tfoot>
//                             </table>
//                         </div>
//                     )
//                 )
//             ) : (
//                 <>
//                     <h1>Plugin Versions</h1>
//                     <p>Click on a plugin to view its versions</p>
//                 </>
//             )}
//         </div>
//     )
// }

// export default PluginVersionsTable
