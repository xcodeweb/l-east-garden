// ------------------------- MAIN MODULES -----------------
import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";
import { server } from "./gulp/tasks/server.js";
import { config } from "./gulp/config/config.js";

// --------------------- IMPORTS -----------------------
// Copy module
import { copyFonts, copyFontsWoff, copyVideo } from "./gulp/tasks/copy.js";
// Delete module
import {
  deleteHTML,
  deleteCss,
  deleteJs,
  deleteImages,
  deleteFonts,
  deleteSvg,
  deleteSvgStack,
} from "./gulp/tasks/del.js";
// HTML module
import { html, pug } from "./gulp/tasks/html.js";
// CSS Module
import { scss, less } from "./gulp/tasks/styles.js";
// Scripts module
import { scripts } from "./gulp/tasks/scripts.js";
// Images module
import { images, imagesNoWebp } from "./gulp/tasks/images.js";
// Fonts module
import { otfToTtf, ttfToWoff, createFontsStyles } from "./gulp/tasks/fonts.js";
// SVG module
import { createSvgSprites, buildSvgSprites } from "./gulp/tasks/sprites.js";
// Gulp-mode module
import setMode from "./gulp/tasks/install.js";

// Globs
global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path,
  gulp,
  plugins,
  config,
};

global.mode = {
  html,
  pug,
  scss,
  less,
};

const htmlMode = config.mode.html;
const styleMode = config.mode.style;

function overwatch() {
  // Watch HTML
  gulp.watch(
    app.path.watch[htmlMode],
    { delay: 800 },
    gulp.series(deleteHTML, global.mode[htmlMode])
  );
  // Watch CSS
  gulp.watch(
    app.path.watch[styleMode],
    { delay: 800 },
    gulp.series(deleteCss, global.mode[styleMode])
  );
  // Watch JS
  gulp.watch(app.path.watch.js, gulp.series(deleteJs, scripts));
  // Watch images
  if (config.clearImages) {
    gulp.watch(
      app.path.watch.img,
      gulp.series(deleteImages, config.convertImages ? images : imagesNoWebp)
    );
  } else {
    gulp.watch(
      app.path.watch.img,
      gulp.series(config.convertImages ? images : imagesNoWebp)
    );
  }
  // Watch sprites
  gulp.watch(app.path.watch.svg, gulp.series(deleteSvg, createSvgSprites));
  // Watch video
  gulp.watch(app.path.watch.video, copyVideo);
}

// -------------- TASKS --------------------------
// Base task
const task = gulp.parallel(
  global.mode[htmlMode],
  global.mode[styleMode],
  scripts,
  config.convertImages ? images : imagesNoWebp,
  createSvgSprites
);

// Create fonts task
const createFonts = gulp.series(deleteFonts, copyFonts, otfToTtf, ttfToWoff);

// Copy video to build folder
const video = copyVideo;

// Clean task
const clean = gulp.series(deleteHTML, deleteCss, deleteJs, deleteImages);

// Dev and build tasks
const dev = gulp.series(clean, task, gulp.parallel(overwatch, server));
const build = gulp.series(clean, task, deleteSvgStack, buildSvgSprites);

// Set gulp mode task
const set = setMode;
// ------------------- END TASKS ------------------

// Default task
gulp.task("default", dev);

// ------------------ NPM ----------------

// build: build project
export { build };

// setmode: set gulp mode from config
export { set };

// clean: clean build folder
export { clean };

// clean-img: clean images in build folder
export { deleteImages };

// fonts: convert fonts to woff/woff2 and copy
export { createFonts };

// cfonts: copy ready woff fonts from src to build
export { copyFontsWoff };

// sfonts: create font styles in scss/fonts
export { createFontsStyles };

// svg: create svg sprites
export { createSvgSprites };

// vid: copy video
export { video };
