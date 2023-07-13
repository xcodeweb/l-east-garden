/**
 * Класс для инициализации меню бургер
 */

class Burger {
  /**
   * @typedef {Object} BurgerOptions
   * @property {HTMLElement} burger - Элемент кнопки-бургера
   * @property {HTMLElement} menu - Элемент меню
   * @property {string} menuActive - Класс для активного состояния меню (без точки)
   */

  /**
   * Конструктор класса Burger
   * @param {BurgerOptions} options Объект с опциями для инициализации
   * @param {boolean} test Флаг для отладки
   */
  constructor(options, test) {
    this.options = options;
    this.burger = document.querySelector(options.burger);
    this.menu = document.querySelector(options.menu);
    this.menuActive = options.menuActive;
    this.test = test;
    this.init();
  }

  init = () => {
    if (this.test) {
      console.log(this.burger);
      console.log(this);
    }

    const burger = this.burger;
    burger.addEventListener("click", this.toggleMenu);

    document.addEventListener("click", this.closeMenu);
  };

  toggleMenu = () => {
    this.menu.classList.toggle(this.menuActive);
  };

  closeMenu = (event) => {
    const target = event.target;
    if (!target.closest(this.options.burger) && !target.closest(this.options.menu)) {
      this.menu.classList.remove(this.menuActive);
    }
  };
}

const burger = new Burger({
  burger: ".burger",
  menu: ".nav",
  menuActive: "nav--active"
});
