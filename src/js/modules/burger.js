/**
 * @param {String} selector - css selector for burger element
 * @param {Function} callback - callback for click event
 * @param {boolean} test - on/off log mode
 */

class Burger {
  constructor(selector, callback, test) {
    this.burger = document.querySelector(selector);
    this.callback = callback;
    this.test = test;
    this.init = this.init.bind(this);
    this.init();
  }

  init() {
    if (this.test) {
      console.log(this.burger);
      console.log(this);
    }

    const burger = this.burger;
    burger.addEventListener("click", this.callback);
  }
}

const selectors = {
  burger: ".burger",
  menu: ".nav",
  menuActive: "nav--active"
};

const burger = new Burger(selectors.burger, (e) => {
  document.querySelector(selectors.menu).classList.toggle(selectors.menuActive);
});
