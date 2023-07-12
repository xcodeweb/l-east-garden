/**
  @param {HTMLElement} element - target element for animation
  @param {String} activeClass - class with animation
  @returns {null} nothing return
*/

function fadeRight(element, activeClass) {
  const observer = new IntersectionObserver((event) => {
    event.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(activeClass);
        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(element);
}

export default fadeRight;
