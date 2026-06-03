const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['agent-loop.mjs'],
    bundle: true,
    platform: 'node',
    outfile: 'agent-loop-run.js',
}).then(() => console.log("⚡ Build successful!"))
  .catch(() => process.exit(1));
