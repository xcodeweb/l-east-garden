// html: html, pug
// style: scss, less
// framework: false, tailwind

export const config = {
  mode: {
    html: "html",
    style: "scss",
    framework: false
  },
  htmlWebp: true,
  styleWebp: true,
  convertImages: true,
  clearImages: true
};

// mode - set mode for html and css
// htmlWebp - Turn on/off srcset for webp in HTML
// styleWebp - Turn on/off for webp in styles
// convertImages - enable/disable convert to webp
// clearImages - clean images all time when watch
// framework - set css framework (example: "tailwind")