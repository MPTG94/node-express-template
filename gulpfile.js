'use strtict';
var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var del = require('del');

// Default Gulp task to run including all necessary dependencies
gulp.task('default', ['browser-sync', 'build'], function() {
  gulp.watch(["./source/*.html", './source/js/*.js',
    './source/css/*.css'
  ], ['build']);
  gulp.watch(["./public/*.html", './public/js/*.js',
    './public/css/*.css'
  ], reload);
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
    script: 'app/index.js',
    env: {
      NODE_ENV: 'development'
    }
  }).on('start', function() {
    if (!callbackCalled) {
      callbackCalled = true;
      cb();
    }
  });
});

// Build task to initiate minify tasks for CSS and JS
gulp.task('build', ['minify-html', 'pack-minify-js', 'pack-minify-css',
  'copy-assets'
]);

// Task to minify HTML
gulp.task('minify-html', function() {
  return gulp.src('./source/*.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('./public/'));
});

// Task to minify JS
gulp.task('pack-minify-js', function() {
  return gulp.src(['./source/js/*.js', '!./source/js/*.min.js'])
    .pipe(concat('site.js'))
    .pipe(minify({
      ext: {
        min: '.min.js'
      },
      noSource: true
    }))
    .pipe(gulp.dest('./public/js'));
});

// Task to minify CSS
gulp.task('pack-minify-css', function() {
  return gulp.src(['./source/css/*.css', '!./source/css/*.min.css'])
    .pipe(concat('site.css'))
    .pipe(cleanCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./public/css'));
});

// Task to copy assets
gulp.task('copy-assets', function() {
  return gulp.src('./source/assets/**/*')
    .pipe(gulp.dest('./public/assets'));
});

// Task to delete target assets folder for recreation
/*
gulp.task('delete-assets', function() {
  return del([
    './public/assets/*
  ]);
});*/
