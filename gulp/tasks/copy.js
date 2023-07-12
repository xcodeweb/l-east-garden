// Copy fonts from src
export const copyFonts = () => {
  return app.gulp.src(app.path.src.fonts)
    .pipe(app.gulp.dest(app.path.build.html))
};

// Copy woff fonts in build folder without convert
export const copyFontsWoff = () => {
  return app.gulp.src(app.path.copy.fonts)
    .pipe(app.gulp.dest(app.path.build.fonts))
};

// Copy video from src
export const copyVideo = () => {
  return app.gulp.src(app.path.src.vid)
    .pipe(app.gulp.dest(app.path.build.vid))
};