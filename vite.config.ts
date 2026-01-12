import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        visualizer({
            open: true,
            filename: 'bundle-analysis.html',
        }),
    ],
    optimizeDeps: {
        include: [
            'react-force-graph-3d',
            // Bundle Jenkins IO components and their dependencies
            // This ensures the web components work offline and don't rely on CDN
            '@jenkinsci/jenkins-io-components',
            'lit',
        ],
    },
})
