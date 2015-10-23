var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('apitests', function() {
  return gulp.src('test/api/**/*test.js')
    .pipe(mocha())
    .once('error', function(err) {
      console.log(err)
      process.exit(1);
    })
    .once('end', function() {
      if(this.seq.length === 1 && this.seq[0] === 'apitests') {
        process.exit();
      }
    }.bind(this));
});
