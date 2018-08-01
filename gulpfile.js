'use strict';
const srcToVariable = require('gulp-content-to-variable');
const typescript = require('rollup-plugin-typescript2');
const expect = require('gulp-expect-file');
const webserver = require('gulp-webserver');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const ts = require("gulp-typescript");
const babel = require('gulp-babel');
const merge2 = require('merge2');
const rollup = require('rollup');
const gulp = require("gulp");
const fs = require('fs');

const tsProject = ts.createProject('tsconfig.json');

let exporterWorkerStream;


gulp.task('worker', () => {
    exporterWorkerStream = gulp.src('./dist/dist/gif.worker.js')
        .pipe(uglify())
        .pipe(srcToVariable({
            variableName: "ENV_WORKER"
        }));
});

gulp.task('merge', ['worker'], () => {
    return merge2(gulp.src('./dist/dist/gifExporter.js'), exporterWorkerStream)
        .pipe(concat('gif.exporter.js'))
        .pipe(gulp.dest('dist/'));
})

gulp.task('babel', () => {
    gulp.src('./examples/basic/game.js').
    pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist/dist/'))
})

gulp.task('serve', () => {
    gulp.src('')
        .pipe(webserver({
            livereload: true,
            // directoryListing: true,
            open: true,
            fallback: 'index.html'
        }))
})


gulp.task('default', ['worker', 'merge']);