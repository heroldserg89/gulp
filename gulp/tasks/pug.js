import gulp from 'gulp';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import cached from 'gulp-cached';
import config from '../config.js';

export const pugBuild = () => gulp
  .src(`${config.src.pug}/*.pug`)
  .pipe(plumber())
  .pipe(pug({ pretty: true }))
  .pipe(cached('pug'))
  .pipe(gulp.dest('build'));

export const pugWatch = () => {
  gulp.watch(`${config.src.pug}/**/*.pug`, pugBuild);
};
