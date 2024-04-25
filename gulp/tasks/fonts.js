import gulp from 'gulp';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import config from '../config.js';

const ttf2woffBuild = () => (
  gulp.src(`${config.src.fonts}/*.ttf`)
    .pipe(ttf2woff())
    .pipe(gulp.dest(config.src.fonts))
);

const ttf2woff2Build = () => (
  gulp.src(`${config.src.fonts}/*.ttf`)
    .pipe(ttf2woff2())
    .pipe(gulp.dest(config.src.fonts))
);

export const ttfFontsBuild = gulp.parallel(ttf2woffBuild, ttf2woff2Build);

export const fontsBuild = () => (
  gulp.src(`${config.src.fonts}/*.{woff,woff2}`)
    .pipe(gulp.dest(config.dest.fonts))
);

export const fontsWatch = () => {
  gulp.watch(`${config.src.fonts}/*.ttf`, ttfFontsBuild);
  gulp.watch(`${config.src.fonts}/*.{woff,woff2}`, fontsBuild);
};
