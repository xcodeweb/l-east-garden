/**
 * Класс для создания модальных окон
 */
class Modal {
  /**
   * Конструктор класса Modal
   * @param {NodeListOf<HTMLElement>} buttons Коллекция кнопок триггеров модального окна
   * @param {HTMLElement} modal Контейнер модального окна
   * @param {string} modalBody Класс тела модального окна
   * @param {string} modalActive Класс активного модального окна
   * @param {string} modalClose Класс кнопки закрытия
   */
  constructor(buttons, modal, modalBody, modalActive, modalClose) {
    this.buttons = buttons;
    this.modal = modal;
    this.modalBody = modalBody;
    this.modalActive = modalActive;
    this.modalClose = modalClose;
    this.init();
  }

  init = () => {
    const buttons = this.buttons;
    const modal = this.modal;
    const modalBody = this.modalBody;
    const modalClose = modal.querySelector(this.modalClose);

    buttons.forEach((element) => {
      element.addEventListener("click", this.toggleModal);
    });

    modal.addEventListener("click", (e) => {
      if (!e.target.closest(modalBody)) {
        this.toggleModal();
      }
    });

    modalClose.addEventListener("click", () => {
      this.toggleModal();
    });
  };

  toggleModal = () => {
    const modal = this.modal;
    const modalActive = this.modalActive;
    modal.classList.toggle(modalActive);
    document.querySelector("body").classList.toggle("body--modal");
  };
}

const modal = new Modal(
  document.querySelectorAll(".button"),
  document.querySelector(".modal"),
  ".main-form",
  "modal--active",
  ".main-form__close-btn"
);
