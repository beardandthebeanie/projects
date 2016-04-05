//
// GULPFILE
//

var gulp            = require('gulp'),
    concat          = require('gulp-concat');
    cache           = require('gulp-cache'),
    gutil           = require("gulp-util"),
    ghPages         = require('gulp-gh-pages');
    shell           = require('gulp-shell');
    browserSync     = require('browser-sync');


// -------------------------------------------------------------
// # Config
// -------------------------------------------------------------

var basePath = {
    src:    './',
    prod:   './_site/'
};

var src = {
    html:   [basePath.src + '_includes',
             basePath.src + '_layouts'],
    sass:   basePath.src + 'css/',
    js:     basePath.src + 'js/',
    img:    basePath.src + 'images/*'
};


var prod = {
    html:   basePath.prod,
    sass:   basePath.prod + 'css/',
    js:     basePath.prod + 'js/',
    img:    basePath.prod + 'images/'
};

// Deploy
var deploy = {
    path: basePath.prod + '**/*.*',
    branch: "gh-pages",
    remoteUrl: "https://github.com/beardandthebeanie/projects.git"
};


// Task for building blog when something changed:
// gulp.task('build', shell.task(['jekyll build --watch']));
// Or if you don't use bundle:
 gulp.task('build', shell.task(['jekyll build --watch']));

// Task for serving blog with Browsersync
gulp.task('serve', function () {
    browserSync.init({server: {baseDir: basePath.prod}});
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['build', 'serve']);


gulp.task('browser-sync', function() {
    browserSync({
        files: "css/*.css",
        server: {
            baseDir: "_site/" // Change this to your web root dir
        }
    });
});

// -------------------------------------------------------------
// # Jekyll task - run `gulp jekyll`
// -------------------------------------------------------------

gulp.task('jekyll', function (gulpCallBack){
    var spawn = require('child_process').spawn;
    var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit'});

    jekyll.on('exit', function(code) {
        gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
    });
});

// -------------------------------------------------------------
// # Deploy task - run `gulp deploy`
// -------------------------------------------------------------


gulp.task('deploy', function () {
    return gulp.src(deploy.path)
    .pipe(ghPages({
          branch: "gh-pages",
          remoteUrl: "https://github.com/beardandthebeanie/projects.git"
    }));
    gulp.src(deploy.path)
});
