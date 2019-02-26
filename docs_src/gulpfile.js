'use strict';

var gulp = require('gulp');
var webpack = require('webpack-stream');
var webpackUglifyJs = require('uglifyjs-webpack-plugin')
var sass = require('gulp-sass');
var tildeImporter = require('node-sass-tilde-importer');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var del = require('del');
var sequence = require('run-sequence');
var pkg = require('./package.json')

var production = false;

var file = {
  html:   'src/**/*.html',
  scss:   'src/assets/scss/**/*.scss',
  js:     'src/assets/js/src/**/*.js',
}

var page = {
  js:     'src/assets/js/src/page.js',
  scss:   'src/assets/scss/page.scss',
}

var dir = {
  css:    'src/assets/css/',
  js:     'src/assets/js/',
  font:   'src/assets/fonts/',
}

var browsers = [
  'Chrome >= 45',
  'Firefox >= 40',
  'Edge >= 12',
  'Explorer >= 11',
  'iOS >= 9',
  'Safari >= 9',
  'Android 2.3',
  'Android >= 4',
  'Opera >= 30'
];


/*
|--------------------------------------------------------------------------
| Serve
|--------------------------------------------------------------------------
|
*/
gulp.task('reload', function() {
  browserSync.reload();
});

gulp.task('serve', ['sass'], function() {
  browserSync({
    server: 'src/'
  });

  gulp.watch( file.scss, ['sass'] );
  gulp.watch( file.js, function() {
    sequence('js', 'reload');
  });
  gulp.watch( file.html, ['reload'] );
});


/*
|--------------------------------------------------------------------------
| SASS
|--------------------------------------------------------------------------
|
*/
gulp.task('sass', function() {

  var stream = gulp.src(page.scss)
    .pipe( sourcemaps.init() )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( sass({ importer: tildeImporter, outputStyle: 'compressed' }).on('error', sass.logError) )
    .pipe( autoprefixer({
      browsers: browsers
    }))
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest(dir.css) )
    .pipe( browserSync.stream() );

  // Create unminified version if it's in production mode
  if ( production ) {
    stream = gulp.src(page.scss)
      .pipe( sourcemaps.init() )
      .pipe( sass({importer: tildeImporter}).on('error', sass.logError) )
      .pipe( autoprefixer({
        browsers: browsers
      }))
      .pipe( sourcemaps.write('.') )
      .pipe( gulp.dest(dir.css) );
  }

  return stream;

});


/*
|--------------------------------------------------------------------------
| JS
|--------------------------------------------------------------------------
|
*/
gulp.task('js', function(cb) {

  if ( production ) {
    return sequence('js_production_minified', 'js_production_expanded', cb);
  }
  else {
    return gulp.src(page.js)
      .pipe(webpack({
        mode: 'none',
        devtool: 'source-map',
        output: {
          filename: 'page.min.js'
        }
      }))
      .pipe( gulp.dest(dir.js) );
  }

});


gulp.task('js_production_minified', function() {
  return gulp.src(page.js)
    .pipe(webpack({
      mode: 'none',
      devtool: 'source-map',
      output: {
        filename: 'page.min.js'
      },
      plugins: [
        new webpackUglifyJs()
      ]
    }))
    .pipe( gulp.dest(dir.js) );
});


gulp.task('js_production_expanded', function() {
  return gulp.src(page.js)
    .pipe(webpack({
      mode: 'none',
      devtool: 'source-map',
      output: {
        filename: 'page.js'
      }
    }))
    .pipe( gulp.dest(dir.js) );
});


/*
|--------------------------------------------------------------------------
| Copy
|--------------------------------------------------------------------------
|
*/
gulp.task('copyFonts', function() {
  //gulp.src( 'node_modules/@fortawesome/fontawesome-free-webfonts/webfonts/*').pipe(gulp.dest(dir.font));
  gulp.src( 'node_modules/font-awesome/fonts/*').pipe(gulp.dest(dir.font));
  gulp.src( 'node_modules/themify-icons/themify-icons/fonts/*').pipe(gulp.dest(dir.font));
  return gulp.src( 'node_modules/et-line/fonts/*').pipe(gulp.dest(dir.font));
});

gulp.task('distCopy', function() {
  return gulp.src( ['src/**/*', '!src/assets/{js/src,plugin/thesaas,scss}{,/**}'] ).pipe(gulp.dest('../docs/'));
});


/*
|--------------------------------------------------------------------------
| Clean /dist directory
|--------------------------------------------------------------------------
|
*/
gulp.task('distClean', function() {
  return del('../docs/', { force: true });
});

/*
|--------------------------------------------------------------------------
| Img
|--------------------------------------------------------------------------
|
*/
gulp.task('img', function() {
  return gulp.src('src/assets/img/**/*.{jpg,jpeg,png,gif}')
    .pipe( imagemin() )
    .pipe( gulp.dest('src/assets/img/') );
});

/*
|--------------------------------------------------------------------------
| Tasks
|--------------------------------------------------------------------------
|
*/
gulp.task('dev', function(cb) {
  sequence('copyFonts', 'sass', 'js', cb);
});

gulp.task('dist', function(cb) {
  production = true;
  sequence('distClean', 'dev', 'distCopy', cb);
});

gulp.task('watch', ['serve']);
gulp.task('default', ['serve']);
