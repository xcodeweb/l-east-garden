const fixFullheight = () => {
  let vh = window.innerHeight;
  document.documentElement.style.setProperty("--full-vh", `${vh}px`);
};

window.addEventListener("resize", fixFullheight);

export default fixFullheight;
