/**
 * Created by zjy on 2015/10/14.
 */
var gulp = require("gulp"),
    uglify = require('gulp-uglify'),//js—πÀı£®≥ÛªØ£©
    minify= require("gulp-minify-css"),//css—πÀı
    concat = require('gulp-concat');

var paths = {
    js: "js/subjs/*.js",
    css: ['css/subcss/admin.css','css/subcss/datatable.css']
};
gulp.task('js', function() {
    gulp.src(paths.js)
        .pipe(uglify())
        .pipe(concat('min1.js'))
        .pipe(gulp.dest('ex/wt'));

    console.log("js finish");
});
gulp.task('css', function() {
    gulp.src(paths.css)
        .pipe(minify())
        .pipe(concat('min1.css'))
        .pipe(gulp.dest('ex/wt'));
    console.log("css finish");
});

gulp.task('watchbt',function() {
    // body...
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.css, ['css']);
});