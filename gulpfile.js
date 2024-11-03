import gulp from 'gulp';
import config from './gulp/config.js';
import clean from './gulp/tasks/clean.js';
import server from './gulp/tasks/server.js';
import { scripts, scriptsWatch } from './gulp/tasks/scripts.js';
import { pugBuild, pugWatch } from './gulp/tasks/pug.js';
import { stylesBuild, stylesWatch } from './gulp/tasks/styles.js';
import { fontsWatch, fontsBuild, ttf2woff2Build } from './gulp/tasks/fonts.js';
import { imagesBuild, imagesWatch } from './gulp/tasks/images.js';
import { spritesBuild, spritesWatch } from './gulp/tasks/sprites.js';
import { copyFavicons, faviconWatch } from './gulp/tasks/favicons.js';

config.setEnv();
const fonts = [fontsBuild];
if (config.isFonts) fonts.unshift(ttf2woff2Build);

export const build = gulp.series(
  clean,
  fonts,
  gulp.parallel(
    fontsBuild,
    scripts,
    pugBuild,
    stylesBuild,
    imagesBuild,
    spritesBuild,
    copyFavicons,
  ),
);
export default gulp.series(
  build,
  server,
  gulp.parallel(
    scriptsWatch,
    pugWatch,
    stylesWatch,
    fontsWatch,
    imagesWatch,
    spritesWatch,
    faviconWatch,
  ),
);
