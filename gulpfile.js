import gulp from 'gulp';
import config from './gulp/config.js';
import clean from './gulp/tasks/clean.js';
import server from './gulp/tasks/server.js';
import { scripts, scriptsWatch } from './gulp/tasks/scripts.js';
import { pugBuild, pugWatch } from './gulp/tasks/pug.js';
import { stylesBuild, stylesWatch } from './gulp/tasks/styles.js';
import { ttfFontsBuild, fontsWatch, fontsBuild } from './gulp/tasks/fonts.js';
import { imagesBuild, imagesWatch } from './gulp/tasks/images.js';
import { spritesBuild, spritesWatch } from './gulp/tasks/sprites.js';
import { copyFavicons, faviconWatch } from './gulp/tasks/favicons.js';

config.setEnv();
const fontsBuildArray = [
  fontsBuild,
];
if (config.isBuildFonts) {
  fontsBuildArray.unshift(ttfFontsBuild);
}
export const build = gulp.series(
  clean,
  fontsBuildArray,
  gulp.parallel(
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
