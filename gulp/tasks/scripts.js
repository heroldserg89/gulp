import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import rename from 'gulp-rename';
import webpackStream from 'webpack-stream';
import config from '../config.js';

export const scripts = (done) => {
  gulp.src(`${config.src.js}/main.js`)
    .pipe(plumber(
      notify.onError({
        title: 'JS',
        message: 'Error: <%= error.message %>',
      }),
    ))
    .pipe(webpackStream({
      mode: config.isProd ? 'production' : 'development',
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: 'defaults',
                }],
              ],
            },
          },
        }],
      },
      devtool: !config.isProd ? 'source-map' : false,
    }))
    .on('error', function (err) {
      console.error('WEBPACK ERROR', err);
      this.emit('end');
    })
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(config.dest.js));
  done();
};
export const scriptsWatch = () => gulp.watch(`${config.src.js}/**/*.js`, scripts);
