// Default node module
import fs from "fs";

// Func for npm install gulp mode
function setMode() {
  const mode = app.config.mode.html;
  const style = app.config.mode.style;

  if (mode === "html") {
    fs.cpSync("src/dev-html/", "src/html", { recursive: true });
    fs.rmSync("src/dev-html/", { recursive: true, force: true });
    fs.rmSync("src/dev-pug/", { recursive: true, force: true });
    fs.unlinkSync("src/index.pug");
  } else if (mode === "pug") {
    fs.cpSync("src/dev-pug/", "src/html", { recursive: true });
    fs.rmSync("src/dev-html/", { recursive: true, force: true });
    fs.rmSync("src/dev-pug/", { recursive: true, force: true });
    fs.unlinkSync("src/index.html");
  }

  if (style === "scss") {
    fs.rmSync("src/less", { recursive: true, force: true });
  } else if (style === "less") {
    fs.rmSync("src/scss", { recursive: true, force: true });
  }

  return new Promise((resolve) => {
    resolve();
  });
}

export default setMode;
