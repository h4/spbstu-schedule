var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var envify = require('envify');
var source = require('vinyl-source-stream');

gulp.task('app-js', function() {
    browserify()
        .transform(reactify)
        .transform(envify)
        .add('src/js/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('src/assets'));
});
