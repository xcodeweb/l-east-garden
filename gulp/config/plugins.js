import replace from "gulp-replace";
import browsersync from "browser-sync";
import newer from "gulp-newer";
import ifPlug from "gulp-if";
import plumber from "gulp-plumber";
import notify from "gulp-notify";

export const plugins = {
  replace,
  browsersync,
  newer,
  if: ifPlug,
  plumber,
  notify
};

