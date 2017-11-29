var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var cssimport = require("gulp-cssimport");
var cssimportOpt = {};


gulp.task('themes-base', function () {
    return gulp.src('./../packages/themes-base/*.css')
        .pipe(cssimport(cssimportOpt))
        /*.pipe(cssmin())*/
        .pipe(gulp.dest('./../libs/themes-base'));
});

gulp.task('themes-blue', function () {
    return gulp.src('./../packages/themes-blue/*.css')
        .pipe(cssimport(cssimportOpt))
        /*.pipe(cssmin())*/
        .pipe(gulp.dest('./../libs/themes-blue'));
});

gulp.task('copyfont', function () {
    return gulp.src('./../packages/font/font/**')
        .pipe(cssmin())
        .pipe(gulp.dest('./../libs/font'));
});

gulp.task('build', ['themes-base','themes-blue', 'copyfont']);
/*gulp.task('build', ['compile']);*/
