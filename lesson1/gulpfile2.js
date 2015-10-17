/**
 * Created by zjy on 2015/10/14.
 */
var gulp = require("gulp");

gulp.task("gulpcss", function () {
    //gulp.src("css/subcss/*.css")
    gulp.src("css/subcss/*.css",{base:"css"})
        .pipe(gulp.dest("ex"));
    console.log("gulpcss finish");
});

gulp.task("gulpjs",function(){
    gulp.src("js/subjs/*.js",{base:"js"})
        .pipe(gulp.dest("ex"));
    console.log("gulpjs finish");
});

gulp.task("gulp3",["gulpcss","gulpjs"],function(){
    console.log("gulp3 finish");
});

gulp.task("watch1",function(){
    gulp.watch("css/subcss/*.css",["gulpcss","gulpjs"]);
});

gulp.task("watch2", function () {
    var src=[
        "css/subcss/*.css",
        "js/subjs/*.js"
    ];
    gulp.watch(src, function () {
        console.log("i am working");
    });
});