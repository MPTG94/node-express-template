'use strtict';
var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

// Default Gulp task to run including all necessary dependencies
gulp.task('default', ['browser-sync', 'build'], function() {
  gulp.watch(["./public/html/*.html", './public/js/*.js',
  './public/css/*.css'], reload);
});

// Task to initiate browser-sync proxy server
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000"
  });
});

// Task to run nodemon which watches the NodeJS server files for changes
gulp.task('nodemon', function(cb) {
  var callbackCalled = false;
  return nodemon({
    script: 'app/index.js'
  }).on('start', function() {
    if (!callbackCalled) {
      callbackCalled = true;
      cb();
    }
  });
});

// Build task to initiate minify tasks for CSS and JS
gulp.task('build', ['pack-js', 'pack-css']);

// Task to minify JS
gulp.task('pack-js', function() {
  return gulp.src(['./public/js/*.js', '!./public/js/*.min.js'])
              .pipe(concat('site.js'))
              .pipe(minify({
                ext: {
                  min: '.min.js'
                },
                noSource: false
              }))
              .pipe(gulp.dest('./public/js'));
});

// Task to minify CSS
gulp.task('pack-css', function() {
  return gulp.src(['./public/css/*.css', '!./public/css/*.min.css'])
              .pipe(concat('site.css'))
              .pipe(cleanCss())
              .pipe(rename({
                suffix: '.min'
              }))
              .pipe(gulp.dest('./public/css'));
});
