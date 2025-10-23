import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        port: 3000,
        host: '0.0.0.0',
    },
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    },
    optimizeDeps: {
        // Force pre-bundling for @google/genai to resolve module issues
        include: ['@google/genai'],
    },
    build: {
        commonjsOptions: {
            include: [/node_modules/],
        },
    },
});