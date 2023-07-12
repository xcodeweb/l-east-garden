// gulp-svgmin: https://www.npmjs.com/package/gulp-svgmin
import svgmin from "gulp-svgmin";
// gulp-svg-sprite: https://www.npmjs.com/package/gulp-svg-sprite
import gulpSvg from "gulp-svg-sprite";
// gulp-cheerio: https://www.npmjs.com/package/gulp-cheerio
import cheerio from "gulp-cheerio";

// Gulp func for create sprites from app.path.src.svg
export const createSvgSprites = () => {
  return app.gulp
    .src(app.path.src.svg)
    .pipe(
      svgmin({
        js2svg: {
          pretty: true
        }
      })
    )
    // .pipe(
    //   cheerio({
    //     run: function ($) {
    //       $("[fill]").removeAttr("fill");
    //       $("[stroke]").removeAttr("stroke");
    //       $("[style]").removeAttr("style");
    //     },
    //     parserOptions: {
    //       xmlMode: true
    //     }
    //   })
    // )
    .pipe(
      gulpSvg({
        mode: {
          stack: {
            sprite: `../sprite/sprite`,
            example: app.isBuild ? false : true
          }
        }
      })
    )
    .pipe(app.gulp.dest(app.path.build.img));
};

// Gulp func for build sprites (minify)
export const buildSvgSprites = () => {
  return app.gulp
    .src(`${app.path.build.img}/sprite/sprite.svg`, { allowEmpty: true })
    .pipe(
      svgmin()
    )
    .pipe(app.gulp.dest(`${app.path.build.img}/sprite`));
};
