// sass: https://www.npmjs.com/package/sass
import mainSass from "sass";
// gulp-sass: https://www.npmjs.com/package/gulp-sass
import gulpSass from "gulp-sass";
// gulp-less: https://www.npmjs.com/package/gulp-less
import gulpLess from "gulp-less";
// gulp-rename: https://www.npmjs.com/package/gulp-rename
import rename from "gulp-rename";
// gulp-clean-css: https://www.npmjs.com/package/gulp-clean-css
import cleanCss from "gulp-clean-css";
// gulp-webpcssfix: https://www.npmjs.com/package/gulp-webpcssfix
import webpcss from "gulp-webpcssfix";
// autoprefixer: https://www.npmjs.com/package/autoprefixer
import autoprefixer from "autoprefixer";
// gulp-autoprefixer: https://www.npmjs.com/package/gulp-autoprefixer
import g_autoprefixer from "gulp-autoprefixer"; // Use original autoprefixer
// gulp-group-css-media-queries: https://www.npmjs.com/package/gulp-group-css-media-queries
import groupQueries from "gulp-group-css-media-queries";
// gulp-sourcemaps: https://www.npmjs.com/package/gulp-sourcemaps
import sourcemaps from "gulp-sourcemaps";
// Post CSS: https://www.npmjs.com/package/gulp-postcss
import postcss from "gulp-postcss";
// Tailwind: https://www.npmjs.com/package/tailwindcss
import tailwindcss from "tailwindcss";
// Tailwind config file
import tailwindConfig from "../config/tailwind.config.js";

// Config
const sass = gulpSass(mainSass);

// Gulp func for sass/scss
export const scss = () => {
  return app.gulp
    .src(app.path.src.scss)
    .pipe(app.plugins.if(!app.isBuild, sourcemaps.init()))
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>"
        })
      )
    )
    .pipe(
      sass({
        outputStyle: "expanded"
      })
    )
    .pipe(
      app.plugins.if(
        !app.config.mode.framework,
        g_autoprefixer({
          grid: true,
          cascade: true
        })
      )
    )
    .pipe(
      app.plugins.if(
        app.config.mode.framework === "tailwind",
        postcss([
          tailwindcss(tailwindConfig),
          autoprefixer({
            grid: true,
            cascade: true
          })
        ])
      )
    )
    .pipe(app.plugins.if(!app.isBuild, sourcemaps.write()))
    .pipe(app.plugins.if(app.isBuild, groupQueries()))
    .pipe(
      app.plugins.if(
        app.config.styleWebp,
        webpcss({
          webpClass: ".webp",
          noWebpClass: ".no-webp"
        })
      )
    )
    .pipe(app.plugins.if(app.isBuild, cleanCss()))
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(app.plugins.replace(/@img\//g, "../img/"))
    .pipe(app.plugins.replace(/@vid\//g, "../video/"))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
};

// Gulp func for LESS
export const less = () => {
  return app.gulp
    .src(app.path.src.less)
    .pipe(app.plugins.if(!app.isBuild, sourcemaps.init()))
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "LESS",
          message: "Error: <%= error.message %>"
        })
      )
    )
    .pipe(gulpLess())
    .pipe(
      app.plugins.if(
        !app.config.mode.framework,
        g_autoprefixer({
          grid: true,
          cascade: true
        })
      )
    )
    .pipe(
      app.plugins.if(
        app.config.mode.framework === "tailwind",
        postcss([
          tailwindcss(tailwindConfig),
          autoprefixer({
            grid: true,
            cascade: true
          })
        ])
      )
    )
    .pipe(app.plugins.if(!app.isBuild, sourcemaps.write()))
    .pipe(app.plugins.if(app.isBuild, groupQueries()))
    .pipe(
      app.plugins.if(
        app.config.htmlWebp,
        webpcss({
          webpClass: ".webp",
          noWebpClass: ".no-webp"
        })
      )
    )
    .pipe(app.plugins.if(app.isBuild, cleanCss()))
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(app.plugins.replace(/@img\//g, "../img/"))
    .pipe(app.plugins.replace(/@vid\//g, "../video/"))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
};
