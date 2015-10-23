var gulp = require('gulp');
var config = require('../config').javascript;
var webpack = require('webpack-stream');

gulp.task('javascript', function(callback) {
  return gulp.src(config.src)
    .pipe(webpack({
      output: {
        filename: config.packedFile
      }
    }))
    .pipe(gulp.dest(config.dest));
});
