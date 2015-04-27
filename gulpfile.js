/** MODULES
  *
  *
  */
const gulp        =  require('gulp'),
      gutil       =  require('gulp-util'),
      concat      =  require('gulp-concat'),
      connect     =  require('gulp-connect'),
      sass        =  require('gulp-sass'),
      jshint      =  require('gulp-jshint'),
      stylish     =  require('jshint-stylish'),
      cssmin      =  require('gulp-minify-css'),
      htmlmin     =  require('gulp-minify-html'),
      uglify      =  require('gulp-uglify'),
      streamify   =  require('gulp-streamify'),
      browserify  =  require('browserify'),
      source      =  require('vinyl-source-stream'),
      rename      =  require('gulp-rename');


/** PATHS
  *
  *
  */
const app  = './app/',
      dest = app + 'static/',
      src  = './src/';


/** ERRORS
  * Returns so we don't break the watcher.
  * But who is watching the watcher?
  *
  */
function handleError (err) {
  return;
}


/** CSS: Sass preprocessing
  * sass
  *
  */
gulp.task('sass', function(){
  return gulp.src(src + 'sass/main.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest(dest + 'css'));
});


/** JS: concat & minify
  * concat, uglify
  *
  * TODO: this isn't the most elegant way to include these
  * scripts Since Bootstrap requires jQuery we have to place
  * jQuery before in the array... meh.
  *
  */
var js_src = [
  './node_modules/jquery/dist/jquery.min.js',
  './node_modules/bootstrap/dist/js/bootstrap.min.js',
  src + 'js/**/*.js'
];

gulp.task('js', ['lint'], function() {
  gulp.src(js_src)
    .pipe(concat('app.min.js'))
    .pipe(uglify({
      outSourceMap: true
    }))
    .on('error', handleError)
    .pipe(gulp.dest(dest + 'js'));
});


/** JS: linting
  * var jshint
  *
  */
gulp.task('lint', function() {
  return gulp.src(src + 'js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});


// gulp.task('copy', function(){
//   return gulp.src([
//     appstatic + 'favicon.ico',
//     ])
//     .pipe(gulp.dest(diststatic));
// });

// gulp.task('fonts', function(){
//   return gulp.src(appstatic + 'fonts/*')
//     .pipe(gulp.dest(diststatic + 'fonts/'));
// });

// var vendorEntryFiles = [
//         './node_modules/jquery/dist/jquery.js',
//         './node_modules/bootstrap/dist/js/bootstrap.js',
//         ];

// gulp.task('vendor', function(){
//   gulp.src(vendorEntryFiles)
//     .pipe(concat('vendor.js'))
//     .pipe(gulp.dest(appstatic + 'js/'))
//     .pipe(gulp.dest(diststatic + 'js/'));
// });

// gulp.task('glyphicons', function(){
//   return gulp.src('./node_modules/bootstrap/fonts/*')
//     .pipe(gulp.dest('./app/static/fonts/'))
//     .pipe(gulp.dest('./dist/static/fonts/'));
// });


// gulp.task('html', function() {
//   gulp.src(appdir + '*.html')
//     .pipe(htmlmin({
//       comments: true,
//       conditionals: true
//     })).pipe(cssmin())
//     .pipe(gulp.dest(distdir))
//     .pipe(connect.reload());
// });

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(src + 'js/**/*.js', ['js']);
    gulp.watch(src + 'sass/**/*.scss', ['sass']);
});


// gulp.task('connect', function(){
//   connect.server({
//     port: '3000',
//     root: 'app',
//     livereload: true
//   });
// });


gulp.task('build', ['js', 'sass']);
gulp.task('default', ['build', 'watch']);