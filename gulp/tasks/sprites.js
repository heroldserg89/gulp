import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import imagemin, { svgo } from 'gulp-imagemin';
import config from '../config.js';

const svgClear = () => (
  gulp.src(`${config.src.iconsMono}/**/*.svg`)
    .pipe(imagemin([
      svgo({
        plugins: [
          {
            name: 'removeAttrs',
            params: {
              attrs: ['fill.*', 'stroke.*'],
            },
          },
        ],
      }),
    ]))
    .pipe(gulp.dest(config.src.icons))
);

const sprite = () => (
  gulp.src(`${config.src.icons}/*.svg`)
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg',
        },
      },
      shape: {
        transform: [
          {
            svgo: {
              plugins: [
                {
                  removeAttrs: {
                    attrs: ['class', 'data-name'],
                  },
                },
                {
                  removeUselessStrokeAndFill: false,
                },
                {
                  inlineStyles: true,
                },
              ],
            },
          },
        ],
      },
    }))
    .pipe(gulp.dest(config.dest.images))
);

export const spritesBuild = gulp.parallel(svgClear, sprite);

export const spritesWatch = () => {
  gulp.watch(`${config.src.iconsMono}/*.svg`, svgClear);
  gulp.watch(`${config.src.icons}/*.svg`, sprite);
};
