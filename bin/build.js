import * as esbuild from 'esbuild'


const PRODUCTION = process.env.PRODUCTION === 'PRODUCTION'
const BACKEND_PORT = process.env.BACKEND_PORT
const ENTRY_POINTS_BACKEND = ['src/index.ts']

const BACKEND_BUILD_DIR = "./dist/backend"

const SERVE_ORIGIN = `http://localhost:${BACKEND_PORT}`


const context = await esbuild.context({
    bundle: true,
    entryPoints: ENTRY_POINTS_BACKEND,
    outdir: BACKEND_BUILD_DIR,
    minify: PRODUCTION,
    sourcemap: !PRODUCTION,
    target: PRODUCTION ? 'es2020' : 'esnext',
    inject: LIVE_RELOAD ? ['./bin/live-reload.js'] : undefined,
    define: {
        SERVE_ORIGIN: JSON.stringify(SERVE_ORIGIN),
    },
})

if (PRODUCTION) {
    await context.rebuild();
    context.dispose();
} else {
    await context.watch();
    await context
    .serve({
      servedir: BUILD_DIRECTORY,
      port: SERVE_PORT,
    })
}









