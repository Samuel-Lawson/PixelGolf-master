// load plugins

import gulp from 'gulp';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import clean from 'gulp-clean';
import cleanCSS from 'gulp-clean-css';
import gcmq from 'gulp-group-css-media-queries';
import htmlmin from 'gulp-htmlmin';
import jshint from 'gulp-jshint';
import plumber from 'gulp-plumber';
import prettify from 'gulp-prettify';
import runSequence from 'run-sequence';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import twig from 'gulp-twig';
import uglify from 'gulp-uglify';
import util from 'gulp-util';
import webpack from 'webpack-stream';
import spritesmith from 'gulp.spritesmith';

const path = {
  src: './src',
  build: './build/assets',
  css: '/styles',
  js: '/scripts',
  images: '/img',
  sprites: '/img/sprites',
  fonts: '/fonts'
};

// browserSync

gulp.task('browserSync', () => {

  browserSync.init({
    server: './build',
    notify: false
  });

});

// plumber

const onError = function(err) {
  console.log(err.message);
  this.emit('end');
};

// styles

gulp.task('styles', () => {
  return gulp.src(path.src + path.css + '/**/*.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gcmq())
    .pipe(util.env.production ? cleanCSS() : util.noop())
    .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: './src/styles' } ))
    .pipe(gulp.dest(path.build + path.css))
    .pipe(browserSync.stream({ match: '**/*.css' }));
    //.pipe(notify({ title: 'styles', message: 'styles have been compiled into main.css' }));
});

// scripts

gulp.task('scripts', () => {
  return gulp.src([path.src + path.js + '/**/*.js'])
    .pipe(plumber({ errorHandler: onError }))
    .pipe(!util.env.production ? jshint('.jshintrc') : util.noop())
    .pipe(!util.env.production ? jshint.reporter('jshint-stylish') : util.noop())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(util.env.production ? uglify() : util.noop())
    .pipe(gulp.dest(path.build + path.js))
    .pipe(browserSync.reload({ stream: true }));
});

// twig

gulp.task('twig', () => {
  return gulp.src(path.src + '/templates/**/*.html')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(twig())
    .pipe(!util.env.production ? prettify({ indent_inner_html: true }) : util.noop())
    .pipe(util.env.production ? htmlmin({ collapseWhitespace: true }) : util.noop())
    .pipe(gulp.dest('./build'));
});

gulp.task('twig-watch', ['twig'], (done) => {
  browserSync.reload();
  done();
});

gulp.task('sprites', function () {
  let spriteData = gulp.src([path.src + path.sprites + '/**/*.png'])
    .pipe(spritesmith({
      imgName: 'sprites.png',
      imgPath: '../img/sprites.png',
      cssName: '_sprites.scss',
      retinaSrcFilter: [path.src + path.sprites + '/**/*@2x.png'],
      retinaImgName: 'sprite@2x.png',
      retinaImgPath: '../img/sprites@2x.png'
    }));

    spriteData.img.pipe(gulp.dest(path.src + path.images));

    return spriteData.css.pipe(gulp.dest(path.src + path.css + '/mixins'));
});


//  images

gulp.task('images', () => {
  return gulp.src([
    path.src + path.images + '/**/*.{png,gif,jpg,svg}',
    '!' + path.src + path.sprites + '/**/*'])
    .pipe(plumber({ errorHandler: onError }))
    .pipe(gulp.dest(path.build + path.images))
    .pipe(browserSync.reload({ stream: true }));
});

//  fonts

gulp.task('fonts', () => {
  return gulp.src([path.src + path.fonts + '/**/*.{otf,eot,svg,ttf,woff,woff2}'])
    .pipe(plumber({ errorHandler: onError }))
    .pipe(gulp.dest(path.build + path.fonts))
    .pipe(browserSync.reload({ stream: true }));
});

// clean

gulp.task('clean', () => {
  return gulp.src([path.build + path.css + '/*.css', path.build + path.js + '/*.js'], { read: false })
    .pipe(clean());
});

// build
// run with '--production' for minified output

gulp.task('build', () => {
  runSequence('clean', 'sprites', ['styles', 'scripts', 'images', 'fonts'], ['twig']);
});

// watch

gulp.task('watch', ['browserSync', 'build'], () => {
  gulp.watch(path.src + path.css + '/**/*.scss', ['styles']);
  gulp.watch(path.src + path.js + '/**/*.js', ['scripts']);
  gulp.watch(path.src + '/templates/**/*.html', ['twig-watch']);
  gulp.watch(path.src + path.images + '/**/*.{png,gif,jpg,svg}', ['sprites', 'images']);
});

// default

gulp.task('default', () => {
  gulp.start('watch');
});
