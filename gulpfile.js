const gulp = require('gulp');
const sass = require('gulp-sass');
const tap = require('gulp-tap');
const Handlebars = require('handlebars');
const markdown = require('gulp-markdown');

const BASE = '../../';

exports.watch = function watch(cb) {
  gulp.watch('src/style/**/*.scss', gulp.series(['sass'])); 
  gulp.watch('src/markdown/**/*.md', gulp.series(['pages']));
  cb();
}

function sassCompile(cb) {
	gulp.src('src/style/**/*.scss')
	    .pipe(sass())
	    .pipe(gulp.dest('assets/css'));
	cb();
}

function markdownCompile(cb) {
	gulp.src('template.hbs')
		.pipe(tap(function(file) {
	      var template = Handlebars.compile(file.contents.toString());

	      return gulp.src('src/markdown/**/*.md')
	        .pipe(markdown())
	        .pipe(tap(function(file) {
	        	var data = {
					contents: file.contents.toString(),
					BASE: BASE
				};
				var html = template(data);
				file.contents = new Buffer(html, "utf-8");
	        }))
	        .pipe(gulp.dest('./pages'));
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