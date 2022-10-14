const gulp = require('gulp');
const prefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean-css');
const concat = require('gulp-concat');
const map = require('gulp-sourcemaps');
const connect = require('gulp-connect');
const babel = require('gulp-babel');
const {src, dest} = require('gulp');
const uglify = require('gulp-uglify-es').default;

gulp.task('min_js', function () {
    return src(['src/common/**/*.js', 'src/js/01_main.js'], {allowEmpty: true})
        .pipe(map.init())
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(map.write('../sourcemaps'))
        .pipe(gulp.dest('build/'))
})

gulp.task('js', function () {
    return src(['src/common/**/*.js', 'src/js/01_main.js'], {allowEmpty: true})
        .pipe(map.init())
        .pipe(uglify())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('main.js'))
        .pipe(map.write('../sourcemaps'))
        .pipe(gulp.dest('build/'))
})
gulp.task('html', function () {
    return gulp.src('src/pages/*.html')
        .pipe(map.init())
        .pipe(map.write('../sourcemaps/'))
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
});

gulp.task('min_css', function () {
    return gulp.src('src/common/**/*.css')
        .pipe(map.init())
        .pipe(concat("style.min.css"))
        .pipe(clean({level: 2}))
        .pipe(prefixer({
            grid: true,
        }))
        .pipe(map.write('../sourcemaps/'))
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
});

gulp.task('css', function () {
    return gulp.src('src/common/**/*.css')
        .pipe(map.init())
        .pipe(concat("style.css"))
        .pipe(prefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true,
        }))
        .pipe(map.write('../sourcemaps/'))
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
});


gulp.task('server', function () {
    return connect.server({
        root: 'build',
        livereload: true,
    });
});


gulp.task('watch', function () {
    gulp.watch('src/common/**/*.css', gulp.parallel('css', 'min_css'));
    gulp.watch('src/pages/*.html', gulp.parallel('html'));
    gulp.watch(['src/common/**/*.js', 'src/js/01_main.js'], gulp.parallel('js', 'min_js'))
})


gulp.task('build', gulp.parallel('css', 'min_css', 'html', 'js', 'min_js'), function () {
});

gulp.task('develop', gulp.parallel('server', 'watch'), function () {
});



