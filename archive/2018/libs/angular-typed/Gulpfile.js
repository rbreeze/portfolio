var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    del = require('del'),
    SOURCES = 'src/**/*.js';

gulp.task('cleanDist', function(cb) {
    del(['dist/*'], cb);
});

gulp.task('build', ['cleanDist'], function() {
    return gulp.src(['src/angular-typed-module.js', SOURCES])
        .pipe(ngAnnotate())
        .pipe(concat('angular-typed.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
