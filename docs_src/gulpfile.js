'use strict';

import gulp from 'gulp';
import webpack from 'webpack-stream';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import tildeImporter from 'node-sass-tilde-importer';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import changed from 'gulp-changed';
import del from 'del';

let production = false;

const file = {
  html:   'src/**/*.html',
  scss:   'src/assets/scss/**/*.scss',
  js:     'src/assets/js/src/**/*.js',
};

const page = {
  js:     'src/assets/js/src/page.js',
  scss:   'src/assets/scss/page.scss',
};

const dir = {
  css:    'src/assets/css/',
  js:     'src/assets/js/',
  font:   'src/assets/fonts/',
};

/*
|--------------------------------------------------------------------------
| SASS
|--------------------------------------------------------------------------
|
*/
gulp.task('sass', function() {
  let stream = gulp.src(page.scss)
    .pipe(sourcemaps.init())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sass({ importer: tildeImporter, outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dir.css))
    .pipe(browserSync.stream());

  if (production) {
    stream = gulp.src(page.scss)
      .pipe(sourcemaps.init())
      .pipe(sass({ importer: tildeImporter }).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(dir.css));
  }

  return stream;
});

/*
|--------------------------------------------------------------------------
| Serve
|--------------------------------------------------------------------------
|
*/
gulp.task('reload', function() {
  browserSync.reload();
});

gulp.task('watch', function() {
  browserSync({
    server: 'src/',
  });

  gulp.watch(file.scss, gulp.series('sass'));
  gulp.watch(file.js, function () {
    gulp.series('js', 'reload');
  });
  gulp.watch(file.html, gulp.series('reload'));
});

gulp.task('serve', gulp.series('sass', 'watch'));

/*
|--------------------------------------------------------------------------
| JS
|--------------------------------------------------------------------------
|
*/
gulp.task('js_production_minified', function(done) {
  if (production) {
    return gulp.src(page.js)
      .pipe(webpack({
        mode: 'none',
        devtool: 'source-map',
        output: {
          filename: 'page.min.js'
        },
      }))
      .pipe(gulp.dest(dir.js));
  }
  done();
});

gulp.task('js_production_expanded', function(done) {
  if (production) {
    return gulp.src(page.js)
      .pipe(webpack({
        mode: 'none',
        devtool: 'source-map',
        output: {
          filename: 'page.js'
        }
      }))
      .pipe(gulp.dest(dir.js));
  }
  done();
});

gulp.task('wp', function(done) {
  if (!production) {
    gulp.src(page.js)
      .pipe(webpack({
        mode: 'none',
        devtool: 'source-map',
        output: {
          filename: 'page.min.js'
        }
      }))
      .pipe(gulp.dest(dir.js));
  }
  done();
});

gulp.task('js', gulp.series('wp', 'js_production_minified', 'js_production_expanded'), function(done) {
  done();
});

/*
|--------------------------------------------------------------------------
| Copy
|--------------------------------------------------------------------------
|
*/
gulp.task('copyFonts', function() {
  gulp.src( 'node_modules/@fortawesome/fontawesome-free-webfonts/webfonts/*').pipe(gulp.dest(dir.font));
  gulp.src( 'node_modules/themify-icons/themify-icons/fonts/*').pipe(gulp.dest(dir.font));
  return gulp.src( 'node_modules/et-line/fonts/*').pipe(gulp.dest(dir.font));
});

gulp.task('distCopy', function() {
  console.log('COPY');
  return gulp.src( ['src/**/*', '!src/assets/{js/src,plugin/thesaas,scss}{,/**}'] ).pipe(gulp.dest('../docs/'));
});

/*
|--------------------------------------------------------------------------
| Clean /dist directory
|--------------------------------------------------------------------------
|
*/
gulp.task('distClean', function(done) {
  del('../docs/', { force: true });
  done();
});

/*
|--------------------------------------------------------------------------
| Img
|--------------------------------------------------------------------------
|
*/
gulp.task('img', function() {
  return gulp.src('src/assets/img/**/*.{jpg,jpeg,png,gif}')
    .pipe(gulp.dest('src/assets/img/'));
});

/*
|--------------------------------------------------------------------------
| Tasks
|--------------------------------------------------------------------------
|
*/
gulp.task('dev', gulp.series('copyFonts', 'sass', 'js'), function(done) {
  done();
});

gulp.task('setProd', function(done){
  production = true;
  done();
});

gulp.task('dist', gulp.series('setProd', 'distClean', 'dev', 'distCopy'), function(done) {
  done();
});

gulp.task('watch', gulp.series('serve'));
gulp.task('default', gulp.series('serve'));
