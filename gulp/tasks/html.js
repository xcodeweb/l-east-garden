// gulp-file-include: https://www.npmjs.com/package/gulp-file-include
import fileinclude from "gulp-file-include";
// gulp-webp-html-nosvg: https://www.npmjs.com/package/gulp-webp-html-nosvg
import webpHtmlNosvg from "gulp-webp-html-nosvg";
// gulp-version-number: https://www.npmjs.com/package/gulp-version-number
import versionNum from "gulp-version-number";
// gulp-typograf: https://www.npmjs.com/package/gulp-typograf
import typograf from "gulp-typograf";
// gulp-pug: https://www.npmjs.com/package/gulp-pug
import gpug from "gulp-pug";
// Default node module
import * as path from "path";

// Set root folder
const rootFolder = path.basename(path.resolve());

// Gulp func for HTML
export const html = () => {
  return app.gulp
    .src(app.path.src.html)
    .pipe(
      fileinclude({
        basepath: "../" + rootFolder + "/src/"
      })
    )
    .pipe(app.plugins.replace(/@img\//g, "img/"))
    .pipe(app.plugins.replace(/@vid\//g, "video/"))
    .pipe(app.plugins.if(app.config.htmlWebp, webpHtmlNosvg()))
    .pipe(
      versionNum({
        value: "%DT%",
        append: {
          key: "_v",
          cover: 0,
          to: ["css", "js"]
        }
        // 'output': {
        //   'file': 'gulp/version.json'
        // }
      })
    )
    .pipe(
      typograf({
        locale: ["ru", "en-US"]
      })
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream());
};

// Gulp func for PUG/Jade
export const pug = () => {
  return app.gulp
    .src(app.path.src.pug)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "PUG",
          message: "Error: <%= error.message %>"
        })
      )
    )
    .pipe(
      gpug({
        pretty: true,
        verbose: true,
        basedir: "src"
      })
    )
    .pipe(app.plugins.replace(/@img\//g, "img/"))
    .pipe(app.plugins.replace(/@vid\//g, "video/"))
    .pipe(app.plugins.if(app.config.htmlWebp, webpHtmlNosvg()))
    .pipe(
      versionNum({
        value: "%DT%",
        append: {
          key: "_v",
          cover: 0,
          to: ["css", "js"]
        }
        // 'output': {
        //   'file': 'gulp/version.json'
        // }
      })
    )
    .pipe(
      typograf({
        locale: ["ru", "en-US"]
      })
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream());
};
