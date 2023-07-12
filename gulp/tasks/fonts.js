// fs - default node module
import fs from "fs";
// gulp-fonter: https://www.npmjs.com/package/gulp-fonter
import fonter from "gulp-fonter";
// gulp-ttf2woff2: https://www.npmjs.com/package/gulp-ttf2woff2
import ttf2woff2 from "gulp-ttf2woff2";

// Set source folder for createFontsStyles
const SOURCE_FOLDER = "src";

// Convert otf to ttf
export const otfToTtf = () => {
  return app.gulp
    .src(`${app.path.src.fonts}/*.otf`)
    .pipe(
      fonter({
        formats: ["ttf"]
      })
    )
    .pipe(app.gulp.dest(app.path.src.fonts));
};

// Convert ttf to woff and woff2
export const ttfToWoff = () => {
  return app.gulp
    .src(`${app.path.src.fonts}/*.ttf`)
    .pipe(
      fonter({
        formats: ["woff"]
      })
    )
    .pipe(app.gulp.dest(app.path.build.fonts))
    .pipe(app.gulp.src(`${app.path.src.fonts}/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(app.path.build.fonts));
};

// Create @font-face rules
export async function createFontsStyles() {
  // Styles mode
  const mode = app.config.mode.style;
  // Root to file with font-face mixin
  const rootToStyles = `${SOURCE_FOLDER}/${mode}/_fonts.${mode}`;
  // Read file
  const stylesFile = fs.readFileSync(rootToStyles);
  // Include method
  let includeMethod;

  fs.writeFileSync(rootToStyles, `@import '../${mode}/mixins/_font-face.${mode}';\r\n`);

  fs.readdir(app.path.build.fonts, (err, items) => {
    if (items) {
      let currentFont;
      for (let i = 0; i < items.length; i++) {
        let fontName = items[i].split(".");
        fontName = fontName[0];

        if (currentFont != fontName) {
          let includeMethod;

          if (mode === "scss") {
            includeMethod = `@include font("${fontName}", "${fontName}", "400", "normal");\r\n`;
          } else if (mode === "less") {
            includeMethod = `.font("${fontName}", "${fontName}", "400", "normal");\r\n`;
          }

          fs.appendFileSync(rootToStyles, includeMethod);
        }
        currentFont = fontName;
      }
    }
  });
}
