var gulp = require('gulp');
var browserSync = require('browser-sync');
var harp = require('harp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
  return gulp.src('src/css/agency.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('src/css'))
});

// Minify custom JS
gulp.task('minify-js', function() {
  return gulp.src('src/js/agency.js')
    .pipe(uglify())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('src/js'))
});

// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
gulp.task('copy', function() {
  gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/npm.js',
      '!**/bootstrap-theme.*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('src/vendor/bootstrap'))

  gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('src/vendor/jquery'))

  gulp.src(['node_modules/popper.js/dist/umd/popper.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest('src/vendor/popper'))

  gulp.src(['node_modules/jquery.easing/*.js'])
    .pipe(gulp.dest('src/vendor/jquery-easing'))

  gulp.src([
      'node_modules/font-awesome/**',
      '!node_modules/font-awesome/**/*.map',
      '!node_modules/font-awesome/.npmignore',
      '!node_modules/font-awesome/*.txt',
      '!node_modules/font-awesome/*.md',
      '!node_modules/font-awesome/*.json'
    ])
    .pipe(gulp.dest('src/vendor/font-awesome'))
})

/**
 * Serve the Harp Site from the src directory
 */
gulp.task('dev', function() {
    harp.server(__dirname + '/src', {
      port: 9001
    }, function() {
        browserSync({
          proxy: "localhost:9001",
          port: 9000,
          open: false,
          /* Hide the notification. It gets annoying */
           notify: {
            styles: ['opacity: 0', 'position: absolute']
          }
        });
        /**
         * Watch for scss changes, tell BrowserSync to refresh agency.css
         */
        gulp.watch("src/css/*.scss", function() {
          browserSync.reload("agency.css", { stream: true });
        });
        /**
         * Watch for all other changes, reload the whole page
         */
        gulp.watch([
          "src/**/*.ejs",
          "src/**/*.json",
          "src/js/agency.js"
        ], function() {
          browserSync.reload();
        });
    })
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the harp site, launch BrowserSync & watch files.
 */
gulp.task('default', ['dev']);