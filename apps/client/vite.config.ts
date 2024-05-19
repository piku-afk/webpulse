import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  envPrefix: 'WEBPULSE_',
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'build',
  },
});
