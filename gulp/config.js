const srcPath = 'source';
const destPath = 'build';

const config = {
  src: {
    root: srcPath,
    sass: `${srcPath}/scss`,
    js: `${srcPath}/js`,
    fonts: `${srcPath}/assets/fonts`,
    images: `${srcPath}/img`,
    iconsMono: `${srcPath}/img/.svg/mono`,
    icons: `${srcPath}/img/.svg`,
    favicons: `${srcPath}/assets/favicons`,
    pug: `${srcPath}/pug`,
  },

  dest: {
    root: destPath,
    html: destPath,
    css: `${destPath}/css`,
    js: `${destPath}/js`,
    fonts: `${destPath}/fonts`,
    images: `${destPath}/img`,
    favicons: destPath,
  },

  setEnv() {
    this.isProd = process.argv.includes('--prod');
    this.isDev = !this.isProd;
    this.isFonts = process.argv.includes('--fonts');
  },
};

export default config;
