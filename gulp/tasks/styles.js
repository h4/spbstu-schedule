var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');

gulp.task('styles', function() {
    gulp.src('src/css/screen.styl')
        .pipe(stylus({
            errors: true
        }))
        .pipe(autoprefixer())
        .pipe(rename('bundle.css'))
        .pipe(gulp.dest('src/assets'));
});
