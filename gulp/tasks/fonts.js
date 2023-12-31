import gulp from 'gulp';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import config from '../config.js';

const ttf2woffBuild = () => (
  gulp.src(`${config.src.fonts}/**/*`)
    .pipe(ttf2woff())
    .pipe(gulp.dest(config.dest.fonts))
);

const ttf2woff2Build = () => (
  gulp.src(`${config.src.fonts}/**/*`)
    .pipe(ttf2woff2())
    .pipe(gulp.dest(config.dest.fonts))
);

export const fontsBuild = gulp.parallel(ttf2woffBuild, ttf2woff2Build);

export const fontsWatch = () => {
  gulp.watch(`${config.src.fonts}/**/*`, fontsBuild);
};
