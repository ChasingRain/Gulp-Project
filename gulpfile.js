"use strict";

var   gulp = require('gulp'),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
      sass = require("gulp-sass"),
      maps = require("gulp-sourcemaps"),
  cleanCSS = require('gulp-clean-css'),
    image = require('gulp-image'),
      del = require('del');

gulp.task("jsConcat", ['cleanScripts'],  function(){
  return gulp.src(['js/circle/autogrow.js',
            'js/circle/circle.js',
            'js/global.js'])
  .pipe(concat("app.js"))
  .pipe(gulp.dest('dist/scripts'));
});


gulp.task("scripts", ["jsConcat"], function(){
  return gulp.src("dist/scripts/app.js")
  .pipe(maps.init())
  .pipe(uglify())
  .pipe(rename("all.min.js"))
  .pipe(maps.write('./'))
  .pipe(gulp.dest("dist/scripts"));
});

gulp.task("concatCSS", function(){
  return gulp.src("sass/global.scss")
  .pipe(maps.init())
  .pipe(sass())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('dist/styles'))
});

gulp.task('styles', ['cleanStyles'],  function(){
  return gulp.src("sass/global.scss")
  .pipe(maps.init())
  .pipe(sass())
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(rename("all.min.css"))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('dist/styles'));
});


gulp.task('image', ['cleanImages'],  function () {
  gulp.src('./images/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/content'));
});

gulp.task('clean', function () {
  return del('dist/**/*');
});

gulp.task('cleanImages', function () {
  return del('dist/content/*');
});

gulp.task('cleanScripts', function () {
  return del('dist/scripts/*');
});

gulp.task('cleanStyles', function () {
  return del('dist/styles/*');
});

gulp.task('watch', function(){
  gulp.watch('sass/*.scss', ['styles'])
})

gulp.task('build', ['image','styles','scripts']);

gulp.task('default',['build']);
