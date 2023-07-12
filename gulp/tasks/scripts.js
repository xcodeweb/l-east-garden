// webpack-stream: https://www.npmjs.com/package/webpack-stream
import webpack from "webpack-stream";
// Webpack config
import { configWebpack } from "../config/webpack.config.js";

// Gulp func for JS
export const scripts = () => {
  return app.gulp
    .src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "JS",
          message: "Error: <%= error.message %>"
        })
      )
    )
    .pipe(webpack(configWebpack()))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream());
};
