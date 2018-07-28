'use strict';
const srcToVariable = require('gulp-content-to-variable');
const expect = require('gulp-expect-file');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const ts = require("gulp-typescript");
const merge2 = require('merge2');
const gulp = require("gulp");
const fs = require('fs');

const tsProject = ts.createProject('tsconfig.json');

let worker = '';
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
            variableName: worker
        }));
    console.log(exporterWorkerStream);
});

gulp.task('merge', ['worker'], () => {
    return merge2(gulp.src('./dist/gif.exporter.js'), exporterWorkerStream)
        .pipe(concat('gif.exporter.js'))
        .pipe(gulp.dest('dist/'));
})


gulp.task('default', ['ts', 'worker', 'merge']);