'use strict';
const srcToVariable = require('gulp-content-to-variable');
const expect = require('gulp-expect-file');
const webserver = require('gulp-webserver');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const ts = require("gulp-typescript");
const babel = require('gulp-babel');
const merge2 = require('merge2');
const gulp = require("gulp");
const fs = require('fs');

const tsProject = ts.createProject('tsconfig.json');

let exporterWorkerStream;

gulp.task('ts', () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
});

gulp.task('worker', ['ts'], () => {
    exporterWorkerStream = gulp.src('./dist/gif.creator.service.js')
        .pipe(uglify())
        .pipe(srcToVariable({
            variableName: "ENV_WORKER"
        }));
});

gulp.task('merge', ['worker'], () => {
    return merge2(gulp.src('./dist/gif.exporter.js'), exporterWorkerStream)
        .pipe(concat('gif.exporter.js'))
        .pipe(gulp.dest('dist/dist/'));
})

gulp.task('babel', () => {
    gulp.src('./examples/basic/game.js').
    pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist/dist/'))
})

gulp.task('serve', ['babel'], () => {
    gulp.src('./examples/basic/')
        .pipe(webserver({
            livereload: true,
            // directoryListing: true,
            open: true,
            fallback: './examples/basic/index.html'
        }))
})


gulp.task('default', ['ts', 'worker', 'merge']);