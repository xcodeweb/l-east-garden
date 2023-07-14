import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./docs`;
const srcFolder = `./src`;

export const path = {
  build: {
    html: `${buildFolder}`,
    css: `${buildFolder}/css`,
    js: `${buildFolder}/js`,
    img: `${buildFolder}/img`,
    fonts: `${buildFolder}/fonts`,
    vid: `${buildFolder}/video`
  },
  src: {
    html: [`${srcFolder}/*.html`, `${srcFolder}/pages/**/*.html`],
    pug: [`${srcFolder}/*.pug`, `${srcFolder}/pages/**/*.pug`],
    scss: `${srcFolder}/scss/pages/**/*.scss`,
    less: `${srcFolder}/less/pages/**/*.less`,
    js: `${srcFolder}/js/app.{js,ts}`,
    img: [
      `${srcFolder}/img/**/*.{jpeg,jpg,png,gif,webp,svg}`,
      `!${srcFolder}/img/sprites/**/*.*`,
      `!${srcFolder}/img/svg/**/*.*`
    ],
    svg: `${srcFolder}/img/sprites/**/*.svg`,
    fonts: `${srcFolder}/fonts`,
    fontCss: `${srcFolder}/scss/_fonts.scss`,
    video: `${srcFolder}/video/*.mp4`
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    pug: `${srcFolder}/**/*.pug`,
    scss: `${srcFolder}/scss/**/*.scss`,
    less: `${srcFolder}/less/**/*.less`,
    js: `${srcFolder}/js/**/*.{js,ts}`,
    img: [
      `${srcFolder}/img/**/*.{jpeg,jpg,png,gif,webp,svg,ico}`,
      `!${srcFolder}/img/sprites/**/*.*`,
      `!${srcFolder}/img/svg/**/*.*`
    ],
    svg: `${srcFolder}/img/sprites/**/*.svg`,
    video: `${srcFolder}/video/*.mp4`
  },
  clean: {
    html: `${buildFolder}/*.html`,
    css: `${buildFolder}/css/*.css`,
    js: `${buildFolder}/js/*.js`,
    img: [`${buildFolder}/img/**/*.*`, `!${buildFolder}/img/sprite/**/*.svg`, `!${buildFolder}/img/stack/**/*.html`],
    fonts: `${buildFolder}/fonts`,
    svg: `${buildFolder}/img/sprites, ${buildFolder}/img/stack`
  },
  copy: {
    fonts: `${srcFolder}/fonts/*.{woff,woff2}`
  },
  buildFolder,
  srcFolder,
  rootFolder,
  ftp: ``
};
