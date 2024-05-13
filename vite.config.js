import { resolve } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

const root = resolve('apps', 'client');
const outDir = resolve('build', 'client');

export default {
  root,
  plugins: [tsconfigPaths(), react()],
  build: {
    outDir,
    emptyOutDir: true,
  },
};
