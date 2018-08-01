import typescript from 'rollup-plugin-typescript2';

export default [{
        input: './src/gif.creator.service.ts',
        output: {
            // entryFileNames: '[name].js',
            file: 'dist/dist/gif.worker.js',
            name: 'GIFExporter',
            format: 'iife'
        },
        plugins: [typescript({
            tsconfig: "tsconfig.json"
        })]
    },
    {
        input: './src/gif.exporter.ts',
        output: {
            entryFileNames: '[name].js',
            file: 'dist/dist/gifExporter.js',
            name: 'GIFWorker',
            format: 'iife'
        },
        plugins: [typescript({
            tsconfig: "tsconfig.json"
        })]
    }
]