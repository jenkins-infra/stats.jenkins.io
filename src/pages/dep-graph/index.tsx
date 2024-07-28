import React, { useEffect, useState, useRef, useCallback } from 'react'
import ForceGraph3D from 'react-force-graph-3d'
import * as THREE from 'three'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import useGetDependencyGraphData from '../../hooks/useGetDependencyGraphData'
import { PluginNode, Node, Link, GraphData } from '../../types/types'
import { Stack, Box } from '@mui/material'
import GraphTools from '../../components/DependencyGraph/GraphTools'

const containsDeveloper = (pluginJSON: PluginNode, filterRegexp: RegExp): boolean => {
    return (
        pluginJSON.developers?.some(
            (developer) =>
                (developer.developerId && developer.developerId.match(filterRegexp)) ||
                (developer.name && developer.name.match(filterRegexp))
        ) || false
    )
}

const buildGraphData = (data: PluginNode[], filter: string | null): GraphData => {
    const nodesMap = new Map<string, Node>()
    const nodes: Node[] = []
    const links: Link[] = []

    const filterRegexp = filter ? new RegExp(filter.trim(), 'i') : null

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

            if (!nodesMap.has(node.id)) {
                nodesMap.set(node.id, node)
                nodes.push(node)
            } else {
                const existingNode = nodesMap.get(node.id)
                if (existingNode) {
                    Object.assign(existingNode, node)
                }
            }

            // Link to Jenkins Core
            links.push({
                source: plugin.name,
                target: 'Jenkins Core',
            })

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
                    nodesMap.set(depNode.id, depNode)
                    nodes.push(depNode)
                }
                links.push({
                    source: plugin.name,
                    target: dependency.name,
                })
            })
        }
    })

    // Add Jenkins Core node
    nodes.push({
        id: 'Jenkins Core',
        name: 'Jenkins Core',
        description: 'Core component of Jenkins',
        color: 'yellow',
    })

    return { nodes, links }
}

const ForceGraph: React.FC = () => {
    // const json = useGetDependencyGraphData()
    const { plugins } = useGetDependencyGraphData()
    const json = plugins
    const [graphData, setGraphData] = useState<GraphData | null>(null)
    const [hoveredNode, setHoveredNode] = useState<Node | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>('kohsuke')
    const tooltipRef = useRef<HTMLDivElement | null>(null)

    const getJsonForNode = useCallback((data: PluginNode[], nodeID: string) => {
        const nodeData = data.filter(
            (plugin) => plugin.name === nodeID || plugin.dependencies.some((dep) => dep.name === nodeID)
        )
        setGraphData(buildGraphData(nodeData, null))
    }, [])

    useEffect(() => {
        if (json) {
            setGraphData(buildGraphData(json, searchTerm))
        }
    }, [json, searchTerm])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleNodeClick = (node: Node) => {
        setSearchTerm(node.name)
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
        <Stack
            sx={{
                minHeight: '100vh',
                maxHeight: '100vh',
                width: '100vw',
                backgroundColor: 'black',
            }}
        >
            <Box
                sx={{
                    position: 'fixed',
                    top: 60,
                    left: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'flex-start',
                    padding: '10px',
                    zIndex: 999,
                }}
            >
                <GraphTools
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                    setSearchTerm={setSearchTerm}
                />
            </Box>

            <ForceGraph3D
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                extraRenderers={[new (CSS2DRenderer as any)() as THREE.Renderer]}
                graphData={graphData}
                linkDirectionalArrowLength={4}
                linkDirectionalArrowRelPos={1}
                nodeLabel=""
                onNodeHover={(node) => setHoveredNode(node as Node)}
                onNodeClick={(node) => handleNodeClick(node as Node)}
                onNodeDragEnd={(node) => {
                    node.fx = node.x
                    node.fy = node.y
                    node.fz = node.z
                }}
                nodeAutoColorBy="name"
                linkDirectionalParticles={1}
                nodeThreeObjectExtend={true}
                nodeThreeObject={(node: Node) => {
                    if (!searchTerm) return new THREE.Object3D() // Only create labels if searchTerm is set
                    const nodeEl = document.createElement('div')
                    nodeEl.textContent = node.name
                    nodeEl.style.color = node.color || 'white'
                    nodeEl.className = 'node-label'
                    return new CSS2DObject(nodeEl)
                }}
            />
            {hoveredNode && <Tooltip node={hoveredNode} ref={tooltipRef} />}
        </Stack>
    )
}

interface TooltipProps {
    node: Node
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(({ node }, ref) => {
    return (
        <div ref={ref} style={tooltipStyle}>
            <div className="tip-title">{node.name}</div>
            <div className="tip-text" style={{ marginBottom: '5px' }}>
                <b>Excerpt:</b> {node.description}
            </div>
            <div className="tip-text">
                <b>Version:</b> {node.version}
            </div>
            <div className="tip-text">
                <b>Build Date:</b> {node.buildDate}
            </div>
            <div className="tip-text">
                <b>Required Core:</b> {node.requiredCore}
            </div>
            <div className="tip-text" style={{ marginTop: '5px' }}>
                <b>Developers:</b>{' '}
                {node.developers?.map((dev, index) => (
                    <span key={dev.developerId}>
                        {dev.name} ({dev.developerId}){index < (node.developers?.length ?? 0) - 1 && ', '}
                    </span>
                ))}
            </div>
            {node.dependencies && node.dependencies.length > 0 && (
                <div className="tip-text" style={{ marginTop: '5px' }}>
                    <b>Dependencies:</b>
                    <ul>
                        {node.dependencies.map((dep) => (
                            <li key={dep.name}>
                                {dep.name} (version: {dep.version} / optional: {dep.optional.toString()})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
})

const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    padding: '8px',
    background: 'rgba(0, 0, 0, 0.75)',
    color: '#fff',
    borderRadius: '4px',
    pointerEvents: 'none',
    zIndex: 999,
}

const style = document.createElement('style')
style.textContent = `
  .node-label {
    font-size: 12px;
    padding: 1px 4px;
    border-radius: 4px;
    background-color: rgba(0,0,0,0.5);
    user-select: none;
  }
`
document.head.appendChild(style)

export default ForceGraph
