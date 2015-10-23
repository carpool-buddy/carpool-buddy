var gulp = require('gulp');
var config = require('../config').server;
var server = require('gulp-webserver');

gulp.task('serve', function() {
  require(__dirname + "/../../server");
});
