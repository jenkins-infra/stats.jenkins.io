import React from 'react'
import { Plugin, ParsedData } from '../../data/plugins'
import './PluginVersionsTable.css'

interface PluginVersionsTableProps {
    parsedData: ParsedData | null
    loading: boolean
    selectedPlugin?: Plugin | null
}

const PluginVersionsTable: React.FC<PluginVersionsTableProps> = ({ parsedData, loading, selectedPlugin }) => {
    return (
        <div id="versionsContainer">
            {selectedPlugin ? (
                loading ? (
                    <div>Loading...</div>
                ) : (
                    parsedData && (
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>{parsedData.name}</th>
                                        {parsedData.pluginVersions.map((version: string) => (
                                            <th key={version}>{version}</th>
                                        ))}
                                        <th>Sum</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {parsedData.rows.map((row) => (
                                        <tr
                                            key={row.coreVersion}
                                            className={row.coreVersion.includes('lts') ? 'lts' : ''}
                                        >
                                            <th>{row.coreVersion}</th>
                                            {row.cells.map((cell) => (
                                                <td
                                                    key={cell.version}
                                                    title={cell.title}
                                                    style={{ opacity: cell.opacity }}
                                                >
                                                    {cell.count > 0 ? cell.count : ''}
                                                </td>
                                            ))}
                                            <td className="subtotal" title={row.totalTitle}>
                                                {row.total}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Total</th>
                                        {parsedData.pluginVersions.map((version: string) => (
                                            <td key={version}>
                                                {parsedData.rows.reduce(
                                                    (acc: number, row) =>
                                                        acc + row.cells.find((cell) => cell.version === version)!.count,
                                                    0
                                                )}
                                            </td>
                                        ))}
                                        <td>{parsedData.totalInstalls}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    )
                )
            ) : null}
        </div>
    )
}

export default PluginVersionsTable
