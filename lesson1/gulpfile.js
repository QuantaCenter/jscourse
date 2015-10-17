/**
 * Created by zjy on 2015/10/14.
 */
var gulp = require("gulp"),
    less= require("gulp-less");

gulp.task("less", function () {
    gulp.src("css/less/*.less")
        .pipe(less())
        .pipe(gulp.dest("ex/less"));
});