/**
 * Created by zjy on 2015/10/14.
 */
var gulp = require("gulp"),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;


gulp.task("browser", function () {
    browserSync({
        server: {
            baseDir: './'
        }
    });

    gulp.watch(["html/*.html","css/subcss/reload.css"],reload);
});


var livereload = require('gulp-livereload');
gulp.task('reload111', function () {
    livereload.listen();
    gulp.watch(['minichat/views/*.ejs','public/stylesheets/*.css'], function (file) {
        //console.log("4444444");

        livereload.changed(file.path);
    });
});