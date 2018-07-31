import typescript from 'rollup-plugin-typescript2';

const libName = 'GIFExporter';
export default {
    input: './src/gif.exporter.ts',
    output: {
        entryFileNames: '[name].js',
        file: 'dist/dist/gifExporter.js',
        name: libName,
        format: 'iife'
    },
    plugins: [typescript({
        tsconfig: "tsconfig.json"
    })]
}

// const libName = 'GIFWorker';
// export default {
//     input: './src/gif.creator.service.ts',
//     output: {
//         entryFileNames: '[name].js',
//         // file: 'dist/dist/gifExporter.js',
//         name: libName,
//         format: 'iife'
//     },
//     plugins: [typescript({
//         tsconfig: "tsconfig.json"
//     })]
// }