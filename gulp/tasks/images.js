// gulp-imagemin: https://www.npmjs.com/package/gulp-imagemin
import imagemin, {optipng} from "gulp-imagemin";
// gulp-newer: https://www.npmjs.com/package/gulp-newer
import newer from "gulp-newer";
// gulp-webp: https://www.npmjs.com/package/gulp-webp
import webp from "gulp-webp";

// Gulp func for convert and min images
export const images = () => {
  return app.gulp
    .src(app.path.src.img)
    .pipe(newer(app.path.build.img))
    .pipe(
      imagemin([optipng({ optimizationLevel: 2 })])
    )
    .pipe(app.gulp.dest(app.path.build.img))
    .pipe(webp())
    .pipe(app.gulp.dest(app.path.build.img))
    .pipe(app.plugins.browsersync.stream());
};

// Gulp func for minify images and copy to prod without convert
export const imagesNoWebp = () => {
  return app.gulp
    .src(app.path.src.img)
    .pipe(newer(app.path.build.img))
    .pipe(imagemin())
    .pipe(app.gulp.dest(app.path.build.img))
    .pipe(app.plugins.browsersync.stream());
};
