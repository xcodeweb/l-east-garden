/**
 * Класс для анимирования элементов на данной странице
 */

class Animate {
  /**
   * Конструктор класса Animate
   * @param {HTMLElement} element Элемент для анимирования
   * @param {String} activeClass Класс анимации (без точки)
   */
  constructor(element, activeClass) {
    this.element = element;
    this.activeClass = activeClass;
    this.observer = this.observer.bind(this);
    this.observer();
  }

  observer() {
    const element = this.element;
    const activeClass = this.activeClass;
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
}

const element = document.querySelector(".inputs");
const activeClass = "inputs--active";
const fadeRightInputs = new Animate(element, activeClass);
