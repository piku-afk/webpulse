import { resolve } from 'node:path';
// @ts-ignore
import viteFastifyReact from '@fastify/react/plugin';
import viteReact from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const root = resolve('src', 'client');
const outDir = resolve('src', 'client', 'build');

export default defineConfig({
  root,
  plugins: [tsconfigPaths(), viteReact(), viteFastifyReact()],
  build: {
    outDir,
    emptyOutDir: true,
  },
  ssr: {
    external: ['use-sync-external-store'],
  },
});
