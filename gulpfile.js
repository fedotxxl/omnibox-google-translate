var gulp = require('gulp');
var clean = require('gulp-clean');
var fileinclude = require('gulp-file-include');
var es = require('event-stream');

GLOBAL.shared = {
    params: {}
};

(function() {
    function copyEnv(env) {
        return gulp.src("env/" + env + "/**/*.*").pipe(gulp.dest("build/"));
    }

    gulp.task('clean', function() {
        return gulp.src("build", {read: false}).pipe(clean());
    });

    gulp.task('copy', ['clean'], function() {
        var copyStatic = function() {
            return gulp.src(["**/*.*", '!./node_modules/**', "!**/*.html", '!./other/**', '!./env/**'])
                .pipe(gulp.dest("build/"));
        };

        var copyHtml = function() {
            return gulp.src("**/*.html")
                .pipe(fileinclude())
                .pipe(gulp.dest("build/"));
        };

        return es.concat(copyStatic(), copyHtml());
    });

    gulp.task('env.chrome.dev', ['copy'], function() {
        return copyEnv("chrome.dev")
    });

    gulp.task('env.chrome.prod', ['copy'], function() {
        return copyEnv("chrome.prod")
    });

    gulp.task('env.opera.dev', ['copy'], function() {
        return copyEnv("opera.dev")
    });

    gulp.task('env.opera.prod', ['copy'], function() {
        return copyEnv("opera.prod")
    });
}());

gulp.task('watch', function () {
    gulp.watch(["**/*.*", '!./node_modules/**', '!./build/**'], ['env.chrome.dev']);
});