const gulp = require('gulp');
const sass = require('gulp-sass');
const tap = require('gulp-tap');
const Handlebars = require('handlebars');
const markdown = require('gulp-markdown');
const path = require('path');

const BASE = '.';

exports.watch = function watch(cb) {
  gulp.watch('./style/**/*.scss', gulp.series(['sass'])); 
  gulp.watch('./markdown/**/*.md', gulp.series(['pages']));
  cb();
}

function sassCompile(cb) {
	gulp.src('./style/**/*.scss')
	    .pipe(sass({outputStyle: 'compressed'}))
	    .pipe(gulp.dest('../assets/css'));
	cb();
}

function markdownCompile(cb) {
	gulp.src('template.hbs')
		.pipe(tap(function(file) {
	      var template = Handlebars.compile(file.contents.toString());

	      return gulp.src('./markdown/**/*.md')
	        .pipe(markdown())
	        .pipe(tap(function(file) {
	        	var data = {
					contents: file.contents.toString(),
					BASE: path.dirname(path.relative(file.path, file.base))
				};
				var html = template(data);
				file.contents = new Buffer.from(html, "utf-8");
	        }))
	        .pipe(gulp.dest('../'));
    }));
	cb();
}

exports.build = function build(cb) {
	sassCompile();
	cb();
}

exports.pages = markdownCompile;
exports.default = exports.build;
exports.sass = sassCompile;