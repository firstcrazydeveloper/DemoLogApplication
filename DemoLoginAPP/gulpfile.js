var gulp = require('gulp'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    inject = require('gulp-inject'),
    gulpif = require('gulp-if'),
    argv = require('yargs').argv,
    gulpIngore = require('gulp-ignore'),
    angularFilesort = require('gulp-angular-filesort'),
    rev = require('gulp-rev'),
    using = require('gulp-using'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean');

var src_path = 'src';
var dest_path = 'public';

// Not all tasks need to use streams 
// A gulpfile is just another node program and you can use all packages available on npm 
gulp.task('clean', function (cb) {
    gutil.log('clean data task');
    // You can use multiple globbing patterns as you would with `gulp.src` 
    return del(['Resources/Bundles', './common/bundles/gulp/*.js', './dest/*.js'], cb);
});

// JSHint task
gulp.task('lint', function () {
    gutil.log('in lint task fix');
    //gulp.src('./app/scripts/*.js')
    //.pipe(jshint())
    //// You can look into pretty reporters as well, but that's another story
    //.pipe(jshint.reporter('default'));
});

gulp.task('scriptsControllers', ['clean'], function () {
    // Minify and copy all JavaScript (except vendor scripts) 
    // with sourcemaps all the way down 
    return gulp.src(['./App/Home/*.js', './App/Home/Controller/*.js'])
      .pipe(concat('Control.js'))
      .pipe(uglify({ mangle: false }))
      .pipe(rename('Control.min.js'))
      .pipe(rev())
      .pipe(gulp.dest('Common/Bundles/Gulp'))
      .pipe(rev.manifest({
          base: 'Common/Bundles/Gulp',
          merge: true

      }))
     .pipe(gulp.dest('Common/Bundles/Gulp'));
});

gulp.task('scriptsDirectives', ['clean'], function () {
    // Minify and copy all JavaScript (except vendor scripts) 
    // with sourcemaps all the way down 
    return gulp.src('Common/Directives/*.js')
      .pipe(concat('Directives.js'))
      .pipe(uglify({ mangle: false }))
      .pipe(rename('Directives.min.js'))
      .pipe(rev())
      .pipe(gulp.dest('Common/Bundles/Gulp'))
      .pipe(rev.manifest({
          base: 'Common/Bundles/Gulp',
          merge: true

      }))
     .pipe(gulp.dest('Common/Bundles/Gulp'));
});

gulp.task('styles', ['clean'], function () {
    // Minify and copy all JavaScript (except vendor scripts) 
    // with sourcemaps all the way down 
    return gulp.src('./Resources/*.css')//['./Resources/normalize.css', './Resources/style.css']
      .pipe(concat('Style.css'))
      .pipe(minifycss())
      .pipe(rename('Style.min.css'))
      .pipe(rev())
      .pipe(gulp.dest('Resources/Bundles'));
});

gulp.task('scriptsServices', ['clean'], function () {

    gulp.src('./App/DemoLoginAPP.js')
                .pipe(angularFilesort())
                .pipe(concat('DemoLoginAPP.js'))
                .pipe(uglify())
                .pipe(rename('DemoLoginAPP.min.js'))
                .pipe(rev())
                .pipe(gulp.dest('./dest/'))
                .pipe(rev.manifest({ merge: true }))
                .pipe(gulp.dest('./dest/'))
    // Minify and copy all JavaScript (except vendor scripts) 
    // with sourcemaps all the way down 
    return gulp.src(['Common/Constants.js', 'Common/Directives/*.js', 'Common/Services/*.js'])
              .pipe(angularFilesort())
              .pipe(concat('Services.js'))
              .pipe(uglify({ mangle: false }))
              .pipe(rename('Services.min.js'))
              .pipe(rev())
              .pipe(gulp.dest('Common/Bundles/Gulp'))
              .pipe(rev.manifest({
                  base: 'Common/Bundles/Gulp',
                  merge: true

              }))
             .pipe(gulp.dest('Common/Bundles/Gulp'));
});

// Browserify task
//gulp.task('browserify', function () {
//    // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
//    gulp.src(['app/scripts/main.js'])
//    .pipe(browserify({
//        insertGlobals: true,
//        debug: true
//    }))
//    // Bundle to a single file
//    .pipe(concat('bundle.js'))
//    // Output it to our dist folder
//    .pipe(gulp.dest('dest/js'));
//});

gulp.task('watch', ['lint'], function () {
    // Watch our scripts
    gulp.watch('App/*.js', ['lint', 'scriptsControllers']);
    gulp.watch('Common/Directives/*.js', ['lint', 'scriptsDirectives']);
    gulp.watch('Common/Services/*.js', ['lint', 'scriptsServices']);
    gulp.watch('Resources/Bundles', ['styles']);

});

// Views task
//gulp.task('views', function () {
//    // Get our index.html
//    gulp.src('index.html')
//    // And put it in the dist folder
//    .pipe(gulp.dest('dist/'));

//    // Any other view files from app/views
//    gulp.src('./app/views/**/*')
//    // Will be put in the dist/views folder
//    .pipe(gulp.dest('dist/views/'))
//    .pipe(refresh(lrserver));
//});

gulp.task('index', ['scriptsControllers', 'scriptsDirectives', 'scriptsServices', 'styles'], function () {

    function injectFN(glob, path, tag) {
        return inject(
            gulp.src(glob, { cwd: path }), { starttag: '<!-- inject:' + tag + ':{{ext}} -->' }
            )
    }
    gutil.log('in index task');

    var condition_dev = '!./scripts/*.js';
    return gulp.src('./App/index.html')
    .pipe(inject(gulp.src('Resources/Bundles/*.css', { read: false }), { name: 'styles' }))
    .pipe(inject(gulp.src(['Scripts/angular.min.js', 'Scripts/angular-*.min.js', 'Scripts/ui-bootstrap-tpls-0.10.0.min.js', 'Scripts/bootstrap.js', 'Scripts/ng-grid.js'], { read: false }), { name: 'library' }))
    .pipe(inject(gulp.src('Common/Bundles/gulp/*.js', { read: false }), { relative: false }))
    .pipe(inject(gulp.src(['./dest/*.js', './AppConfig.js'], { read: false }), { name: 'DemoLoginAPP' }))
    .pipe(gulp.dest('./'))

});

gulp.task('build', ['lint', 'index']);

gulp.task('default', ['build'], function () {
    gutil.log('in complete task');


});