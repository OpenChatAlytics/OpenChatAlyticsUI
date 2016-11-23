var gulp = require("gulp");
var batch = require("gulp-batch");
var watch = require("gulp-watch");
var gutil = require("gulp-util");
var webpack = require("gulp-webpack");
var ava = require("gulp-ava");

gulp.task("compileTest", function() {
   return watch("test/**/*.ts*", function() {
        gulp.src("test/**/*.ts*", { base: "." })
          .pipe(webpack(require("./webpack.config.test.js")))
          .pipe(gulp.dest(".build/"))
          .on("error", function (err) {
            if (err.stack) {
              gutil.log(gutil.colors.red(err.stack));
            }
          });
   });
});

gulp.task("runTest", function() {
 return watch(".build/test/**/*.js", function() {
        gulp.src(".build/test/**/*.js", { base: "." })
          .pipe(ava({verbose: true}))
          .on("error", function (err) {
            if (err.stack) {
              gutil.log(gutil.colors.red(err.stack));
            }
          });
   });
});

gulp.task("default", ["compileTest", "runTest"]);
