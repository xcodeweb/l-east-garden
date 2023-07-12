// del: https://www.npmjs.com/package/del
import { deleteAsync as del} from "del";

// Delete HTML from build folder
export const deleteHTML = () => {
  return del(app.path.clean.html);
};

// Delete CSS from build folder
export const deleteCss = () => {
  return del(app.path.clean.css);
};

// Delete JS from build folder
export const deleteJs = () => {
  return del(app.path.clean.js);
};

// Delete images from build folder
export const deleteImages = () => {
  return del(app.path.clean.img);
};

// Delete fonts from build folder
export const deleteFonts = () => {
  return del(app.path.clean.fonts);
};

// Delete SVG from build folder
export const deleteSvg = () => {
  return del(app.path.clean.svg);
};

// Delete SVG sprites stack files from build folder
export const deleteSvgStack = () => {
  return del(`${app.path.build.img}/stack`);
};
