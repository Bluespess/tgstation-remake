'use strict';
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var less = require('gulp-less');
var concat = require('gulp-concat');

var bundler = browserify('./index.js', {debug: true});

function bundle(used_bundler = bundler) {
	return used_bundler.bundle()
		.on('error', function(err) {console.error(err); this.emit('end'); })
		.pipe(source('client.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('../res'));
}

gulp.task('js', function() {
	bundle();
});

gulp.task('css', function() {
	return gulp.src("./css/**/*.less")
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(concat('client.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('../res'));
});

gulp.task('watch', function() {
	var w = watchify(bundler);
	bundle(w);
	w.on('update', function() {
		console.log("-> bundling");
		bundle(w);
	});
	return gulp.watch(['css/**/*.less'], ['css']);
});

gulp.task('default', ['js', 'css']);
