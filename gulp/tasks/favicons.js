import gulp from 'gulp';
import imagemin, { svgo } from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import gulpif from 'gulp-if';
import config from '../config.js';

export const copyFavicons = () => (
  gulp.src(`${config.src.favicons}/**/*`)
    .pipe(gulpif(config.isProd, imagemin([
      imageminPngquant({ quality: [0.8, 0.9] }),
      svgo(),
    ])))
    .pipe(gulp.dest(config.dest.favicons))
);

export const faviconWatch = () => gulp.watch(`${config.src.favicons}/**/*`, copyFavicons);
