'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var easysprite = require('./index.js');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');

gulp.task('test', ['project:basic', 'lint'], function() {
  var mocha = require('gulp-mocha');
  return gulp.src('test/*.js', { read: false }).pipe(mocha());
});

gulp.task('project:basic', function() {
  gulp
    .src('./test/basic/input.css')
    .pipe(
      postcss([
        easysprite({
          imagePath: './test/basic/images',
          spritePath: './test/basic/sprites',
        }),
      ])
    )
    .pipe(rename('output.css'))
    .pipe(gulp.dest('./test/basic/'));
});

gulp.task('linting', function() {
  return gulp.src('./index.js').pipe(eslint()); // hint (optional)
});

gulp.task('runtest', function() {
  var mocha = require('gulp-mocha');

  return gulp.src('test/basic.js', { read: false }).pipe(mocha());
});

gulp.task('watch', function() {
  gulp.watch(['test/basic/input.css'], ['project:basic']);
});

gulp.task('project', ['project:basic']);
gulp.task('default', ['watch']);
gulp.task('test', ['linting', 'runtest']);
