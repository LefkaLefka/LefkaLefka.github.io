var gulp = require("gulp"),
    browserify = require("browserify"),
    tsify = require("tsify"),
    source = require("vinyl-source-stream"),
    watch = require("gulp-watch"),
    prefixer = require("gulp-autoprefixer"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    rigger = require("gulp-rigger"),
    cssmin = require("gulp-clean-css"),
    rimraf = require("rimraf"),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;
var path = {
    build : {
        html : "./",
        script : "./build/js/",
        style : "./build/css/"
    },
    src : {
        html : "./src/index.html",
        script : "./src/ts/main.ts",
        style : "./src/style/main.scss"
    },
    watch : {
        html : "",
        script : "./src/ts/**/*.ts",
        style : "./src/style/**/*.scss"
    },
    clean : "./build/"
};
var configServer = {
    server : {
        baseDir : "./"
    },
    tunnel: true,
    host: "localhost",
    port: 9000,
    logPrefix: "Server start " + Date.now()
};
gulp.task("html:build", function() {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});
gulp.task("script:build", function() {
    return browserify({
        basedir: ".",
        debug: true,
        entries: [path.src.script],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest(path.build.script));
});
gulp.task("style:build", function() {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.style))
        .pipe(reload({stream: true}));
});
gulp.task("watch", function() {
    watch([path.watch.html], function(event, cb) {
        gulp.start("html:build");
    });
    watch([path.watch.script], function(event, cb) {
        gulp.start("script:build");
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start("style:build");
    });
});
gulp.task("webserver", function() {
    browserSync(configServer);
});
gulp.task("clean", function(cb) {
    rimraf(path.clean, cb);
});
gulp.task("build", ["html:build", "script:build", "style:build"]);
gulp.task("default", ["build", "webserver", "watch"]);