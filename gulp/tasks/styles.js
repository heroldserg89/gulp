import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as darsSass from 'sass';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';
import notify from 'gulp-notify';
import config from '../config.js';

const sass = gulpSass(darsSass);
const sassBuild = () => (
  gulp.src(`${config.src.sass}/style.scss`, { sourcemaps: config.isDev })
    .pipe(plumber(
      notify.onError({
        title: 'SCSS',
        message: 'Error: <%= error.message %>',
      }),
    ))
    .pipe(sass({
      includePaths: ['./node_modules'],
    }))
    .pipe(gulpif(config.isProd, gcmq()))
    .pipe(gulpif(config.isProd, autoprefixer()))
    .pipe(gulpif(config.isProd, cleanCSS({ level: 2 })))
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(config.dest.css, { sourcemaps: '.' }))
);

export const stylesBuild = sassBuild;

export const stylesWatch = () => {
  gulp.watch(`${config.src.sass}/**/*.scss`, sassBuild);
};
