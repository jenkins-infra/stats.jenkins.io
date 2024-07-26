import React, { useEffect, useState, useRef, useCallback } from 'react'
import ForceGraph3D from 'react-force-graph-3d'
import useGetDependencyGraphData from '../../hooks/useGetDependencyGraphData'
import { Dependency, Developer, Plugin } from '../../types/types'

interface Node {
    id: string
    name: string
    description: string
    version?: string
    buildDate?: string
    requiredCore?: string
    developers?: Developer[]
    dependencies?: Dependency[]
}

interface Link {
    source: string
    target: string
}

interface GraphData {
    nodes: Node[]
    links: Link[]
}

const ForceGraph: React.FC = () => {
    const json = useGetDependencyGraphData()
    const [graphData, setGraphData] = useState<GraphData | null>(null)
    const [hoveredNode, setHoveredNode] = useState<Node | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const tooltipRef = useRef<HTMLDivElement | null>(null)

    const containsDeveloper = (pluginJSON: Plugin, filterRegexp: RegExp): boolean => {
        if (pluginJSON.developers && pluginJSON.developers.length > 0) {
            for (let i = 0; i < pluginJSON.developers.length; i++) {
                const developer = pluginJSON.developers[i]
                if (
                    (developer.developerId && developer.developerId.match(filterRegexp)) ||
                    (developer.name && developer.name.match(filterRegexp))
                ) {
                    return true
                }
            }
        }
        return false
    }

    const buildGraphData = useCallback((data: Plugin[], filter: string | null) => {
        const nodesMap = new Map<string, Node>()
        const nodes: Node[] = []
        const links: Link[] = []

        let filterRegexp: RegExp | undefined
        if (filter && filter.trim() !== '') {
            filterRegexp = new RegExp(filter.trim(), 'i')
        }

        data.forEach((plugin) => {
            const matchesFilter =
                !filterRegexp ||
                plugin.name.match(filterRegexp) ||
                plugin.title.match(filterRegexp) ||
                containsDeveloper(plugin, filterRegexp)

            if (matchesFilter) {
                const node: Node = {
                    id: plugin.name,
                    name: plugin.name,
                    description: plugin.excerpt,
                    version: plugin.previousVersion,
                    buildDate: plugin.buildDate,
                    requiredCore: plugin.requiredCore,
                    developers: plugin.developers,
                    dependencies: plugin.dependencies,
                }
                nodes.push(node)
                nodesMap.set(node.id, node)

                plugin.dependencies.forEach((dependency) => {
                    if (!nodesMap.has(dependency.name)) {
                        const depNode: Node = {
                            id: dependency.name,
                            name: dependency.name,
                            description: '',
                            version: '',
                            buildDate: '',
                            requiredCore: '',
                            developers: [],
                            dependencies: [],
                        }
                        nodes.push(depNode)
                        nodesMap.set(depNode.id, depNode)
                    }
                    links.push({
                        source: plugin.name,
                        target: dependency.name,
                    })
                })
            }
        })

        return { nodes, links }
    }, [])

    const getJsonForNode = useCallback(
        (data: Plugin[], nodeID: string) => {
            const nodeData = data.filter(
                (plugin) => plugin.name === nodeID || plugin.dependencies.some((dep) => dep.name === nodeID)
            )
            setGraphData(buildGraphData(nodeData, null))
        },
        [buildGraphData]
    )

    useEffect(() => {
        const getJsonForChart = (data: Plugin[], filter: string) => {
            setGraphData(buildGraphData(data, filter))
        }

        if (json) {
            getJsonForChart(json, searchTerm)
        }
    }, [buildGraphData, json, searchTerm])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleNodeClick = (node: Node) => {
        if (json) {
            getJsonForNode(json, node.id)
        }
    }

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (tooltipRef.current) {
                tooltipRef.current.style.left = `${event.clientX + 10}px`
                tooltipRef.current.style.top = `${event.clientY + 10}px`
            }
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    if (!graphData) {
        return <div>Loading...</div>
    }

    return (
        <>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ padding: '5px', width: '100%' }}
            />
            <ForceGraph3D
                graphData={graphData}
                nodeLabel={(node: Node) => node.name}
                onNodeHover={(node) => setHoveredNode(node as Node)}
                onNodeClick={(node) => handleNodeClick(node as Node)}
                onNodeDragEnd={(node) => {
                    node.fx = node.x
                    node.fy = node.y
                    node.fz = node.z
                }}
                nodeAutoColorBy="name"
                linkDirectionalParticles={1}
            />
            {hoveredNode && (
                <div ref={tooltipRef} style={tooltipStyle}>
                    <div className="tip-title">{hoveredNode.name}</div>
                    <div className="tip-text" style={{ marginBottom: '5px' }}>
                        <b>Excerpt:</b> {hoveredNode.description}
                    </div>
                    <div className="tip-text">
                        <b>Version:</b> {hoveredNode.version}
                    </div>
                    <div className="tip-text">
                        <b>Build Date:</b> {hoveredNode.buildDate}
                    </div>
                    <div className="tip-text">
                        <b>Required Core:</b> {hoveredNode.requiredCore}
                    </div>
                    <div className="tip-text" style={{ marginTop: '5px' }}>
                        <b>Developers:</b>{' '}
                        {hoveredNode.developers?.map((dev, index) => (
                            <span key={dev.developerId}>
                                {dev.name} ({dev.developerId})
                                {index < (hoveredNode.developers?.length ?? 0) - 1 && ', '}
                            </span>
                        ))}
                    </div>
                    {hoveredNode.dependencies && hoveredNode.dependencies.length > 0 && (
                        <div className="tip-text" style={{ marginTop: '5px' }}>
                            <b>Dependencies:</b>
                            <ul>
                                {hoveredNode.dependencies.map((dep) => (
                                    <li key={dep.name}>
                                        {dep.name} (version: {dep.version} / optional: {dep.optional.toString()})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    padding: '8px',
    background: 'rgba(0, 0, 0, 0.75)',
    color: '#fff',
    borderRadius: '4px',
    pointerEvents: 'none',
    zIndex: 10,
}

export default ForceGraph

// import React, { useEffect, useState, useRef } from 'react'
// import ForceGraph3D from 'react-force-graph-3d'
// import useGetDependencyGraphData from '../../hooks/useGetDependencyGraphData'
// import { Dependency, Developer, Plugin } from '../../types/types'

// interface Node {
//     id: string
//     name: string
//     description: string
//     version?: string
//     buildDate?: string
//     requiredCore?: string
//     developers?: Developer[]
//     dependencies?: Dependency[]
// }

// interface Link {
//     source: string
//     target: string
// }

// interface GraphData {
//     nodes: Node[]
//     links: Link[]
// }

// const ForceGraph: React.FC = () => {
//     const json = useGetDependencyGraphData()
//     const [graphData, setGraphData] = useState<GraphData | null>(null)
//     const [hoveredNode, setHoveredNode] = useState<Node | null>(null)
//     const tooltipRef = useRef<HTMLDivElement | null>(null)

//     const containsDeveloper = (pluginJSON: Plugin, filterRegexp: RegExp): boolean => {
//         if (pluginJSON.developers && pluginJSON.developers.length > 0) {
//             for (let i = 0; i < pluginJSON.developers.length; i++) {
//                 const developer = pluginJSON.developers[i]
//                 if (
//                     (developer.developerId && developer.developerId.match(filterRegexp)) ||
//                     (developer.name && developer.name.match(filterRegexp))
//                 ) {
//                     return true
//                 }
//             }
//         }
//         return false
//     }

//     const getJsonForChart = (data: Plugin[], filter: string) => {
//         const nodesMap = new Map<string, Node>()
//         const nodes: Node[] = []
//         const links: Link[] = []

//         let filterRegexp: RegExp | undefined
//         if (filter && filter.trim() !== '') {
//             filterRegexp = new RegExp(filter.trim(), 'i')
//         }

//         data.forEach((plugin) => {
//             if (
//                 !filterRegexp ||
//                 plugin.name.match(filterRegexp) ||
//                 plugin.title.match(filterRegexp) ||
//                 containsDeveloper(plugin, filterRegexp)
//             ) {
//                 const node: Node = {
//                     id: plugin.name,
//                     name: plugin.name,
//                     description: plugin.excerpt,
//                     version: plugin.previousVersion,
//                     buildDate: plugin.buildDate,
//                     requiredCore: plugin.requiredCore,
//                     developers: plugin.developers,
//                     dependencies: plugin.dependencies,
//                 }
//                 nodes.push(node)
//                 nodesMap.set(node.id, node)
//             }
//         })

//         data.forEach((plugin) => {
//             plugin.dependencies.forEach((dependency) => {
//                 if (nodesMap.has(dependency.name)) {
//                     links.push({
//                         source: plugin.name,
//                         target: dependency.name,
//                     })
//                 } else {
//                     console.warn(`Node not found: ${dependency.name}`)
//                 }
//             })
//         })

//         setGraphData({ nodes, links })
//     }

//     const getJsonForNode = (data: Plugin[], nodeID: string) => {
//         const nodesMap = new Map<string, Node>()
//         const nodes: Node[] = []
//         const links: Link[] = []

//         data.forEach((plugin) => {
//             const node: Node = {
//                 id: plugin.name,
//                 name: plugin.name,
//                 description: plugin.excerpt,
//                 version: plugin.previousVersion,
//                 buildDate: plugin.buildDate,
//                 requiredCore: plugin.requiredCore,
//                 developers: plugin.developers,
//                 dependencies: plugin.dependencies,
//             }
//             nodes.push(node)
//             nodesMap.set(node.id, node)
//         })

//         data.forEach((plugin) => {
//             plugin.dependencies.forEach((dependency) => {
//                 if (nodesMap.has(dependency.name)) {
//                     links.push({
//                         source: plugin.name,
//                         target: dependency.name,
//                     })
//                 } else {
//                     console.warn(`Node not found: ${dependency.name}`)
//                 }
//             })
//         })

//         setGraphData({ nodes, links })
//     }

//     // useEffect(() => {
//     //     if (json) {
//     //         const nodesMap = new Map<string, Node>()
//     //         const nodes: Node[] = []
//     //         const links: Link[] = []

//     //         json.forEach((plugin) => {
//     //             const node: Node = {
//     //                 id: plugin.name,
//     //                 name: plugin.name,
//     //                 description: plugin.excerpt,
//     //                 version: plugin.previousVersion,
//     //                 buildDate: plugin.buildDate,
//     //                 requiredCore: plugin.requiredCore,
//     //                 developers: plugin.developers,
//     //                 dependencies: plugin.dependencies,
//     //             }
//     //             nodes.push(node)
//     //             nodesMap.set(node.id, node)
//     //         })

//     //         json.forEach((plugin) => {
//     //             plugin.dependencies.forEach((dependency) => {
//     //                 if (nodesMap.has(dependency.name)) {
//     //                     links.push({
//     //                         source: plugin.name,
//     //                         target: dependency.name,
//     //                     })
//     //                 } else {
//     //                     console.warn(`Node not found: ${dependency.name}`)
//     //                 }
//     //             })
//     //         })

//     //         setGraphData({ nodes, links })
//     //     }
//     // }, [json])

//     useEffect(() => {
//         const handleMouseMove = (event: MouseEvent) => {
//             if (tooltipRef.current) {
//                 tooltipRef.current.style.left = `${event.clientX + 10}px`
//                 tooltipRef.current.style.top = `${event.clientY + 10}px`
//             }
//         }
//         window.addEventListener('mousemove', handleMouseMove)
//         return () => {
//             window.removeEventListener('mousemove', handleMouseMove)
//         }
//     }, [])

//     if (!graphData) {
//         return <div>Loading...</div>
//     }

//     return (
//         <>
//             <ForceGraph3D
//                 graphData={graphData}
//                 nodeLabel=""
//                 onNodeHover={(node) => setHoveredNode(node as Node)}
//                 onNodeDragEnd={(node) => {
//                     node.fx = node.x
//                     node.fy = node.y
//                     node.fz = node.z
//                 }}
//                 nodeAutoColorBy="name"
//                 linkDirectionalParticles={1}
//             />
//             {hoveredNode && (
//                 <div ref={tooltipRef} style={tooltipStyle}>
//                     <div className="tip-title">{hoveredNode.name}</div>
//                     <div className="tip-text" style={{ marginBottom: '5px' }}>
//                         <b>Excerpt:</b> {hoveredNode.description}
//                     </div>
//                     <div className="tip-text">
//                         <b>Version:</b> {hoveredNode.version}
//                     </div>
//                     <div className="tip-text">
//                         <b>Build Date:</b> {hoveredNode.buildDate}
//                     </div>
//                     <div className="tip-text">
//                         <b>Required Core:</b> {hoveredNode.requiredCore}
//                     </div>
//                     <div className="tip-text" style={{ marginTop: '5px' }}>
//                         <b>Developers:</b>{' '}
//                         {hoveredNode.developers?.map((dev, index) => (
//                             <span key={dev.developerId}>
//                                 {dev.name} ({dev.developerId})
//                                 {index < (hoveredNode.developers?.length ?? 0) - 1 && ', '}
//                             </span>
//                         ))}
//                     </div>
//                     {hoveredNode.dependencies && hoveredNode.dependencies.length > 0 && (
//                         <div className="tip-text" style={{ marginTop: '5px' }}>
//                             <b>Dependencies:</b>
//                             <ul>
//                                 {hoveredNode.dependencies.map((dep) => (
//                                     <li key={dep.name}>
//                                         {dep.name} (version: {dep.version} / optional: {dep.optional.toString()})
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </>
//     )
// }

// const tooltipStyle: React.CSSProperties = {
//     position: 'absolute',
//     padding: '8px',
//     background: 'rgba(0, 0, 0, 0.75)',
//     color: '#fff',
//     borderRadius: '4px',
//     pointerEvents: 'none',
//     zIndex: 10,
// }

// export default ForceGraph
