/**
 * Created by zjy on 2015/10/14.
 */
var gulp = require("gulp"),
    uglify = require('gulp-uglify'),//jsѹ�����󻯣�
    minify= require("gulp-minify-css"),//cssѹ��
    imagemin=require("gulp-imagemin");//ͼƬѹ��


gulp.task("minify", function () {
    gulp.src("css/subcss/*.css",{base:"css"})
        .pipe(minify())
        .pipe(gulp.dest("ex"));

    gulp.src("js/subjs/*.js",{base:"js"})
        .pipe(uglify())
        .pipe(gulp.dest("ex"));

    gulp.src('img/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest("ex/img"));

});

//�ϲ�
var concat = require('gulp-concat');
gulp.task("concat", function () {
    gulp.src("css/subcss/*.css",{base:"css"})
        .pipe(concat("min.css"))
        .pipe(minify())
        .pipe(gulp.dest("ex"));

    gulp.src("js/subjs/*.js",{base:"js"})
        .pipe(concat("min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("ex"));
});