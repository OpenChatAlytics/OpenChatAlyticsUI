var gulp = require('gulp');
var mocha = require('gulp-mocha');
var batch = require('gulp-batch');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var tslint = require("gulp-tslint");
var webpack = require('gulp-webpack');

gulp.task('compile', function() {
  return watch('src/**/*.ts*', function() {
        gulp.src('src/**/*.ts*', { base: '.' })
          .pipe(webpack(require('./webpack.config.js')))
          .pipe(gulp.dest('dist/'))
          .on('end', function() {
            gutil.log(gutil.colors.green('Compilation finished'));
          })
          .on('error', function (err) {
            if (err.stack) gutil.log(gutil.colors.red(err.stack));
          });
   });
})

gulp.task('test', function() {
   return watch('test/**/*.ts*', function() {
        gulp.src('test/**/*.ts*', { base: '.' })
          .pipe(webpack(require('./webpack.config.test.js')))
          .pipe(gulp.dest('dist/test/'))
          .on('error', function (err) {
            if (err.stack) gutil.log(gutil.colors.red(err.stack));
          });
   });
});

gulp.task('runTest', function() {
 return watch('dist/test/*.js', function() {
        gulp.src('dist/test/*.js', { base: '.' })
          .pipe(mocha({ reporter: 'dot', require: ['jsdom-global/register'] }))
          .on('error', function (err) {
            if (err.stack) gutil.log(gutil.colors.red(err.stack));
          });
   });
})

gulp.task('lint', function() {
  return watch('src/**/*.ts', function() {
        gulp.src('src/**/*.ts', { base: '.' })
          .pipe(tslint({
            formatter: "verbose"
          }))
          .pipe(tslint.report())
          .on('end', function() {
            gutil.log(gutil.colors.green('Linting finished'));
          })
          .on('error', function (err) {
            if (err.stack) gutil.log(gutil.colors.red(err.stack));
          });
   });
})

gulp.task('default', ['compile', 'lint', 'test', 'runTest']);