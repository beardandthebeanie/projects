//
// GULPFILE
//

var gulp            = require('gulp'),
    concat          = require('gulp-concat');
    cache           = require('gulp-cache'),
    gutil           = require("gulp-util"),
    browserSync     = require('browser-sync'),
    ghPages         = require('gulp-gh-pages');


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
    branch: "gh-pages"
};



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
        .pipe(ghPages(deploy.branch));
    gulp.src(deploy.path)
});
