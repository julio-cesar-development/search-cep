const
	gulp 	= 	require('gulp'),
	sass 	= 	require('gulp-sass'),
	browserSync = require('browser-sync'),
	autoprefixer 		= require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	minify = require('gulp-minify'),
	shell = require('shelljs');

// functions
const watchingBrowser = () => {
	gulp.watch('./dist/css/*.css').on('change', browserSync.reload);
	gulp.watch('./dist/js/*.js').on('change', browserSync.reload);
	gulp.watch('./*.html').on('change', browserSync.reload);
}
const watchingFiles = () => {
	gulp.watch('./sass/*.sass', ['sass']);
	gulp.watch('./css/*.css', ['minify-css']);
	gulp.watch('./js/*.js', ['minify-js']);
}
const watching = () => {
	watchingFiles();
	watchingBrowser();
}

gulp.task('minify-css', () => {
	gulp.src('./css/*.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('./dist/css/'));
});
gulp.task('minify-js', () => {
	gulp.src(['./js/*.js'])
		.pipe(minify())
		.pipe(gulp.dest('./dist/js/'))
});

const minifYing = () => {
	shell.exec('gulp minify-css && gulp minify-js')
}

gulp.task('sass', () => {
	gulp.src('./sass/*.sass')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest('./css/'));
});

gulp.task('serve', ['sass'], () => {
	browserSync.init({
		server: {
			baseDir: '.'
		}
	})
	watching()
});

gulp.task('mkdir', () => {
	shell.exec('mkdir dist')
});

gulp.task('minify', () => {
	minifYing();
});

gulp.task('default', ['serve']);
