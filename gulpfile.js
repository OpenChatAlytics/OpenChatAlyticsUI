var gulp = require('gulp');
var mocha = require('gulp-mocha');
var batch = require('gulp-batch');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var tslint = require("gulp-tslint");

var tsconfig = {
  "moduleResolution": "node",
  "outDir": "./dist/",
  "sourceMap": true,
  "noImplicitAny": false,
  "allowSyntheticDefaultImports": true,
  "module": "commonjs",
  "target": "es6",
  "experimentalDecorators": true,
  "jsx": "react"
}

gulp.task('compile', function() {
  return watch('src/**/*.ts*', function() {
        gulp.src('src/**/*.ts*', { base: '.' })
          .pipe(ts(tsconfig))
          .pipe(gulp.dest('.build/'))
          .on('end', function() {
            gutil.log(gutil.colors.green('Compilation finished'));
          })
          .on('error', function (err) {
            if (err.stack) gutil.log(gutil.colors.red(err.stack));
          });
   });
})

gulp.task('test', function() {
   return watch('test/**/*.ts', function() {
        gulp.src('test/**/*.ts', { base: '.' })
          .pipe(ts(tsconfig))
          .pipe(gulp.dest('.build/'))
          .pipe(mocha({ reporter: 'dot' }))
          .on('error', function (err) {
            if (err.stack) gutil.log(gutil.colors.red(err.stack));
          });
   });
});

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

gulp.task('default', ['compile', 'test', 'lint']);