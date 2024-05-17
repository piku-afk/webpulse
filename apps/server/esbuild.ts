import { join } from 'node:path';
import { build, context, type BuildOptions } from 'esbuild';

const entryPoint = join('src', 'index.ts');

const options: BuildOptions = {
  entryPoints: [entryPoint],
  bundle: true,
  outfile: 'build/index.js',
  platform: 'node',
  format: 'esm',
  minify: true,
  banner: {
    js: "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
  },
  alias: {
    '#utils/*': './src/utils/*',
  },
};

if (process.argv.includes('--dev')) {
  const { watch } = await context(options);
  await watch();
} else {
  await build(options);
}
