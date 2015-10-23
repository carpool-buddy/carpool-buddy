var config = require('../config').images;
var gulp   = require('gulp');

gulp.task('images', function(){
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
