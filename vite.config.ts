import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    // server: {
    //     fs: {
    //         // Allow serving files from the project root directory
    //         allow: [
    //             resolve(__dirname, 'src'),
    //             resolve(__dirname, 'node_modules/vite/dist/client'),
    //             resolve(__dirname, 'src/data/infra-statistics')
    //         ]
    //     }
    // },
    plugins: [
        react(),
        visualizer({
            open: true,
            filename: 'bundle-analysis.html',
        }),
    ],
});
