import gulp from 'gulp';
import ttf2woff2 from 'gulp-ttf2woff2';
import config from '../config.js';

export const ttf2woff2Build = () => (
  gulp.src(`${config.src.fonts}/*.ttf`)
    .pipe(ttf2woff2())
    .pipe(gulp.dest(config.src.fonts))
);

export const fontsBuild = () => (
  gulp.src(`${config.src.fonts}/*.woff2`)
    .pipe(gulp.dest(config.dest.fonts))
);

export const fontsWatch = () => {
  gulp.watch(`${config.src.fonts}/*.ttf`, ttf2woff2Build);
  gulp.watch(`${config.src.fonts}/*.woff2`, fontsBuild);
};
