const { src, dest, series, watch, parallel } = require("gulp"),
    sass = require('gulp-sass'),
    gulp = require('gulp'),
    csso = require("gulp-csso"),
    htmlmin = require("gulp-htmlmin"),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    sync = require('browser-sync').create(),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    ttf2woff = require("gulp-ttf2woff"),
    ttf2woff2 = require('gulp-ttf2woff2'),
    fonter = require("gulp-fonter");
uglify = require("gulp-uglify-es").default;
function html() {
    return src("./src/index.html")
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest("dist"))

}
function js() {
    return src("./src/js/file.js")
        .pipe(uglify())
        .pipe(dest("dist/js"))
}
function scss() {
    return src("./src/scss/**.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ["last 2 versions"]
        }))
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest("dist"))
}
function clear() {
    return del('src/index.css')
}
function images() {
    return src("./src/imgs/**/*.{jpg,png,svg,gif,ico}")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3 // 0 to 7
        }))
        .pipe(dest("dist/imgs"))
}
function fonts() {
    src('./src/fonts/*.ttf')
        .pipe(ttf2woff())
        .pipe(dest('dist/fonts'))
    return src('./src/fonts/*.ttf')
        .pipe(ttf2woff2())
        .pipe(dest('dist/fonts/'))
}


function cb() { }


function serve() {
    sync.init({
        server: './dist'
    })
    watch("./src/index.html", series(html)).on('change', sync.reload)
    watch("./src/scss/**.scss", series(scss)).on('change', sync.reload)
    watch("./src/js/**.js", series(js)).on('change', sync.reload)
    watch("./src/imgs/**/*.{jpg,png,svg,gif,ico,webp}", series(images)).on('change', sync.reload)
}
gulp.task("otf2ttf", function () {
    return src('./src/fonts/*.otf')
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest('./src/fonts/'))
})
exports.build = series(clear, gulp.parallel(scss, html, images, fonts, js))
exports.serve = parallel(clear, scss, html, images, serve, js)
exports.js = js
exports.fonts = fonts
exports.clear = clear
exports.images = images