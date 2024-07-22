import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Box } from '@mui/material';
import pluginData from '../../data/infra-statistics/update-center.actual.json';

interface Dependency {
  name: string;
  optional: boolean;
  version: string;
}

interface Developer {
  developerId: string;
  name: string;
}

interface IssueTracker {
  reportUrl: string;
  type: string;
  viewUrl: string;
}

interface Plugin {
  buildDate: string;
  defaultBranch?: string;
  dependencies?: Dependency[];
  developers?: Developer[];
  excerpt: string;
  gav: string;
  issueTrackers?: IssueTracker[];
  labels?: string[];
  name: string;
  popularity: number;
  previousTimestamp?: string;
  previousVersion?: string;
  releaseTimestamp: string;
  requiredCore: string;
  scm?: string;
  sha1: string;
  sha256: string;
  size: number;
  title: string;
  url: string;
  version: string;
  wiki?: string;
}

interface PluginData {
  plugins: Record<string, Plugin>;
}

const pluginDataTyped = pluginData as PluginData;

const EChartsGraph: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string>('');
  const [graphData, setGraphData] = useState<{ nodes: any[], links: any[] }>({ nodes: [], links: [] });

  useEffect(() => {
    const filteredGraphData = getGraphData(pluginDataTyped.plugins, filter);
    setGraphData(filteredGraphData);
  }, [filter]);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          formatter: function (params: any) {
            const plugin = pluginDataTyped.plugins[params.data.id];
            let html = `<div class="tip-title">${params.name}</div>`;
            if (plugin) {
              html += `<div class="tip-text"><b>Excerpt:</b> ${plugin.excerpt}</div>`;
              html += `<div class="tip-text"><b>Version:</b> ${plugin.version}</div>`;
              html += `<div class="tip-text"><b>Build Date:</b> ${plugin.buildDate}</div>`;
              html += `<div class="tip-text"><b>Required Core:</b> ${plugin.requiredCore}</div>`;
              html += `<div class="tip-text"><b>Developers:</b> ${plugin.developers?.map(dev => `${dev.name} (${dev.developerId})`).join(', ')}</div>`;
              html += `<div class="tip-text"><b>Dependencies:</b><ul>${plugin.dependencies?.map(dep => `<li>${dep.name} (version: ${dep.version}, optional: ${dep.optional})</li>`).join('') || 'None'}</ul></div>`;
            }
            return html;
          },
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            animation: false,
            data: graphData.nodes,
            links: graphData.links,
            roam: true,
            label: {
              show: true,
              position: 'right',
            },
            force: {
              repulsion: 20,
              edgeLength: 100,
              friction: 0.02,
            },
          },
        ],
      };

      chart.setOption(option);

      return () => {
        chart.dispose();
      };
    }
  }, [graphData]);

  const getGraphData = (plugins: Record<string, Plugin>, filter: string) => {
    const nodes = [];
    const links = [];
    const addedNodes = new Set<string>();

    const filterRegexp = filter ? new RegExp(filter, 'i') : null;

    for (const pluginKey in plugins) {
      const plugin = plugins[pluginKey];
      if (filterRegexp && plugin.name.match(filterRegexp)) {
        addPluginAndDependencies(plugin, nodes, links, addedNodes);
      }
    }

    if (filter && !addedNodes.has('Jenkins Core')) {
      nodes.push({
        id: 'Jenkins Core',
        name: 'Jenkins Core',
        symbolSize: 15,
        itemStyle: { color: '#23A4FF' },
      });
    }

    return { nodes, links };
  };

  const addPluginAndDependencies = (plugin: Plugin, nodes: any[], links: any[], addedNodes: Set<string>) => {
    if (!addedNodes.has(plugin.name)) {
      nodes.push({
        id: plugin.name,
        name: plugin.title,
        symbolSize: 10,
        itemStyle: { color: '#83548B' },
      });
      addedNodes.add(plugin.name);

      links.push({
        source: plugin.name,
        target: 'Jenkins Core',
        lineStyle: { color: '#AAAAAA' },
      });

      if (plugin.dependencies) {
        plugin.dependencies.forEach((dep) => {
          const depPlugin = pluginDataTyped.plugins[dep.name];
          if (depPlugin) {
            addPluginAndDependencies(depPlugin, nodes, links, addedNodes);
            links.push({
              source: plugin.name,
              target: dep.name,
              lineStyle: { color: '#AAAAAA' },
            });
          }
        });
      }
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
    }}>
      <input
        type="text"
        placeholder="Filter plugins..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </Box>
  );
};

export default EChartsGraph;


// // EChartsGraph.tsx
// import React, { useEffect, useRef, useState } from 'react';
// import * as echarts from 'echarts';
// import { Box } from '@mui/material';
// import pluginData from '../../data/infra-statistics/update-center.actual.json';

// interface Dependency {
//   name: string;
//   optional: boolean;
//   version: string;
// }

// interface Developer {
//   developerId: string;
//   name: string;
// }

// interface IssueTracker {
//   reportUrl: string;
//   type: string;
//   viewUrl: string;
// }

// interface Plugin {
//   buildDate: string;
//   defaultBranch?: string;
//   dependencies?: Dependency[];
//   developers?: Developer[];
//   excerpt: string;
//   gav: string;
//   issueTrackers?: IssueTracker[];
//   labels?: string[];
//   name: string;
//   popularity: number;
//   previousTimestamp?: string;
//   previousVersion?: string;
//   releaseTimestamp: string;
//   requiredCore: string;
//   scm?: string;
//   sha1: string;
//   sha256: string;
//   size: number;
//   title: string;
//   url: string;
//   version: string;
//   wiki?: string;
// }

// interface PluginData {
//   plugins: Record<string, Plugin>;
// }

// const pluginDataTyped = pluginData as PluginData;

// const EChartsGraph: React.FC = () => {
//   const chartRef = useRef<HTMLDivElement>(null);
//   const [filter, setFilter] = useState<string>('');
//   const [graphData, setGraphData] = useState<{ nodes: any[], links: any[] }>({ nodes: [], links: [] });

//   useEffect(() => {
//     const filteredGraphData = getGraphData(pluginDataTyped.plugins, filter);
//     setGraphData(filteredGraphData);
//   }, [filter]);

//   useEffect(() => {
//     if (chartRef.current) {
//       const chart = echarts.init(chartRef.current);

//       const option = {
//         tooltip: {
//           formatter: function (params: any) {
//             const plugin = pluginDataTyped.plugins[params.data.id];
//             let html = `<div class="tip-title">${params.name}</div>`;
//             if (plugin) {
//               html += `<div class="tip-text"><b>Excerpt:</b> ${plugin.excerpt}</div>`;
//               html += `<div class="tip-text"><b>Version:</b> ${plugin.version}</div>`;
//               html += `<div class="tip-text"><b>Build Date:</b> ${plugin.buildDate}</div>`;
//               html += `<div class="tip-text"><b>Required Core:</b> ${plugin.requiredCore}</div>`;
//               html += `<div class="tip-text"><b>Developers:</b> ${plugin.developers?.map(dev => `${dev.name} (${dev.developerId})`).join(', ')}</div>`;
//               html += `<div class="tip-text"><b>Dependencies:</b><ul>${plugin.dependencies?.map(dep => `<li>${dep.name} (version: ${dep.version}, optional: ${dep.optional})</li>`).join('') || 'None'}</ul></div>`;
//             }
//             return html;
//           },
//         },
//         series: [
//           {
//             type: 'graph',
//             layout: 'force',
//             animation: false,
//             data: graphData.nodes,
//             links: graphData.links,
//             roam: true,
//             label: {
//               show: true,
//               position: 'right',
//             },
//             force: {
//               repulsion: 20,
//               edgeLength: 100,
//               friction: 0.02,
//             },
//           },
//         ],
//       };

//       chart.setOption(option);

//       return () => {
//         chart.dispose();
//       };
//     }
//   }, [graphData]);

//   const getGraphData = (plugins: Record<string, Plugin>, filter: string) => {
//     const nodes = [];
//     const links = [];

//     const filterRegexp = filter ? new RegExp(filter, 'i') : null;

//     for (const pluginKey in plugins) {
//       const plugin = plugins[pluginKey];
//       if (!filterRegexp || plugin.name.match(filterRegexp)) {
//         nodes.push({
//           id: plugin.name,
//           name: plugin.title,
//           symbolSize: 10,
//           itemStyle: { color: '#83548B' },
//         });

//         if (plugin.dependencies) {
//           plugin.dependencies.forEach((dep) => {
//             links.push({
//               source: plugin.name,
//               target: dep.name,
//               lineStyle: { color: '#AAAAAA' },
//             });
//           });
//         }

//         links.push({
//           source: plugin.name,
//           target: 'Jenkins Core',
//           lineStyle: { color: '#AAAAAA' },
//         });
//       }
//     }

//     nodes.push({
//       id: 'Jenkins Core',
//       name: 'Jenkins Core',
//       symbolSize: 15,
//       itemStyle: { color: '#23A4FF' },
//     });

//     return { nodes, links };
//   };

//   return (
//     <Box sx={{
//       display: 'flex',
//       flexDirection: 'column',
//       height: '100%',
//       width: '100%',
//     }}>
//       <input
//         type="text"
//         placeholder="Filter plugins..."
//         value={filter}
//         onChange={(e) => setFilter(e.target.value)}
//       />
//       <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
//     </Box>  );
// };

// export default EChartsGraph;



// // EChartsGraph.tsx
// import React, { useEffect, useRef } from 'react';
// import * as echarts from 'echarts';
// import pluginData from '../../data/infra-statistics/update-center.actual.json';

// interface Dependency {
//   name: string;
//   optional: boolean;
//   version: string;
// }

// interface Developer {
//   developerId: string;
//   name: string;
// }

// interface IssueTracker {
//   reportUrl: string;
//   type: string;
//   viewUrl: string;
// }

// interface Plugin {
//   buildDate: string;
//   defaultBranch?: string;
//   dependencies?: Dependency[];
//   developers?: Developer[];
//   excerpt: string;
//   gav: string;
//   issueTrackers?: IssueTracker[];
//   labels?: string[];
//   name: string;
//   popularity: number;
//   previousTimestamp?: string;
//   previousVersion?: string;
//   releaseTimestamp: string;
//   requiredCore: string;
//   scm?: string;
//   sha1: string;
//   sha256: string;
//   size: number;
//   title: string;
//   url: string;
//   version: string;
//   wiki?: string;
// }

// interface PluginData {
//   plugins: Record<string, Plugin>;
// }

// const pluginDataTyped = pluginData as PluginData;

// const EChartsGraph: React.FC = () => {
//   const chartRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (chartRef.current) {
//       const chart = echarts.init(chartRef.current);
//       const graphData = getGraphData(pluginDataTyped.plugins);

//       const option = {
//         tooltip: {
//           formatter: function (params: any) {
//             const plugin = pluginDataTyped.plugins[params.data.id];
//             let html = `<div class="tip-title">${params.name}</div>`;
//             if (plugin) {
//               html += `<div class="tip-text"><b>Excerpt:</b> ${plugin.excerpt}</div>`;
//               html += `<div class="tip-text"><b>Version:</b> ${plugin.version}</div>`;
//               html += `<div class="tip-text"><b>Build Date:</b> ${plugin.buildDate}</div>`;
//               html += `<div class="tip-text"><b>Required Core:</b> ${plugin.requiredCore}</div>`;
//               html += `<div class="tip-text"><b>Developers:</b> ${plugin.developers?.map(dev => `${dev.name} (${dev.developerId})`).join(', ')}</div>`;
//               html += `<div class="tip-text"><b>Dependencies:</b><ul>${plugin.dependencies?.map(dep => `<li>${dep.name} (version: ${dep.version}, optional: ${dep.optional})</li>`).join('') || 'None'}</ul></div>`;
//             }
//             return html;
//           },
//         },
//         series: [
//           {
//             type: 'graph',
//             layout: 'force',
            
//             animation: false,
//             data: graphData.nodes,
//             links: graphData.links,
//             roam: true,
//             label: {
//               show: true,
//               position: 'middle',
//             },
//             force: {
//               repulsion: 30,
//               friction: 0.02,
              
//             },
//           },
//         ],
//       };

//       chart.setOption(option);

//       return () => {
//         chart.dispose();
//       };
//     }
//   }, []);

//   const getGraphData = (plugins: Record<string, Plugin>) => {
//     const nodes = [];
//     const links = [];

//     for (const pluginKey in plugins) {
//       const plugin = plugins[pluginKey];
//       nodes.push({
//         id: plugin.name,
//         name: plugin.title,
//         symbolSize: 10,
//         itemStyle: { color: '#83548B' },
//       });

//       if (plugin.dependencies) {
//         plugin.dependencies.forEach((dep) => {
//           links.push({
//             source: plugin.name,
//             target: dep.name,
//             lineStyle: { color: '#AAAAAA' },
//           });
//         });
//       }

//       links.push({
//         source: plugin.name,
//         target: 'Jenkins Core',
//         lineStyle: { color: '#AAAAAA'},
//       });
//     }

//     nodes.push({
//       id: 'Jenkins Core',
//       name: 'Jenkins Core',
//       symbolSize: 15,
//       itemStyle: { color: '#23A4FF' },
//     });

//     return { nodes, links };
//   };

//   return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
// };

// export default EChartsGraph;








// import React from 'react';
// import pluginData from '../../data/infra-statistics/update-center.actual.json';

// interface Dependency {
//   name: string;
//   optional: boolean;
//   version: string;
// }

// interface Developer {
//   developerId: string;
//   name: string;
// }

// interface IssueTracker {
//   reportUrl: string;
//   type: string;
//   viewUrl: string;
// }

// interface Plugin {
//   buildDate: string;
//   defaultBranch?: string;
//   dependencies?: Dependency[];
//   developers?: Developer[];
//   excerpt: string;
//   gav: string;
//   issueTrackers?: IssueTracker[];
//   labels?: string[];
//   name: string;
//   popularity: number;
//   previousTimestamp?: string;
//   previousVersion?: string;
//   releaseTimestamp: string;
//   requiredCore: string;
//   scm?: string;
//   sha1: string;
//   sha256: string;
//   size: number;
//   title: string;
//   url: string;
//   version: string;
//   wiki?: string;
// }

// interface PluginData {
//   plugins: Record<string, Plugin>;
// }

// const pluginDataTyped = pluginData as PluginData;

// const PluginList: React.FC = () => {
//   const plugins = pluginDataTyped.plugins;

//   return (
//     <div>
//       <h1>Plugins List</h1>
//       <ul>
//         {Object.keys(plugins).map((pluginKey) => {
//           const plugin = plugins[pluginKey];
//           return (
//             <li key={pluginKey}>
//               <h2>{plugin.title}</h2>
//               <p><strong>Name:</strong> {plugin.name}</p>
//               <p><strong>Version:</strong> {plugin.version}</p>
//               <p><strong>Build Date:</strong> {plugin.buildDate}</p>
//               <p><strong>Default Branch:</strong> {plugin.defaultBranch}</p>
//               <p><strong>GAV:</strong> {plugin.gav}</p>
//               <p><strong>Popularity:</strong> {plugin.popularity}</p>
//               <p><strong>Excerpt:</strong> {plugin.excerpt}</p>
//               <p><strong>Release Timestamp:</strong> {plugin.releaseTimestamp}</p>
//               <p><strong>Required Core:</strong> {plugin.requiredCore}</p>
//               <p><strong>SCM:</strong> {plugin.scm}</p>
//               <p><strong>SHA1:</strong> {plugin.sha1}</p>
//               <p><strong>SHA256:</strong> {plugin.sha256}</p>
//               <p><strong>Size:</strong> {plugin.size}</p>
//               <p><strong>URL:</strong> <a href={plugin.url}>{plugin.url}</a></p>
//               <p><strong>Wiki:</strong> <a href={plugin.wiki}>{plugin.wiki}</a></p>
//               <p><strong>Labels:</strong> {plugin.labels?.join(', ')}</p>
//               <p><strong>Dependencies:</strong></p>
//               <ul>
//                 {plugin.dependencies?.map((dep, index) => (
//                   <li key={index}>{dep.name} (version: {dep.version}, optional: {dep.optional.toString()})</li>
//                 )) || <li>None</li>}
//               </ul>
//               <p><strong>Developers:</strong></p>
//               <ul>
//                 {plugin.developers?.map((dev, index) => (
//                   <li key={index}>{dev.name} (ID: {dev.developerId})</li>
//                 )) || <li>None</li>}
//               </ul>
//               <p><strong>Issue Trackers:</strong></p>
//               <ul>
//                 {plugin.issueTrackers?.map((tracker, index) => (
//                   <li key={index}>
//                     {tracker.type}: <a href={tracker.viewUrl}>{tracker.viewUrl}</a> (Report URL: <a href={tracker.reportUrl}>{tracker.reportUrl}</a>)
//                   </li>
//                 )) || <li>None</li>}
//               </ul>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default PluginList;
