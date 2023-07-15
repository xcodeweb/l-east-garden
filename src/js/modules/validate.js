/**
 * Класс формы
 */
class Form {
  /**
   * Конструктор класса Form
   * @param {HTMLElement} form Элемент формы
   * @param {string} server URL сервера для запроса
   * @param {Function} afterSend Функция вызываемая после отправки формы
   * @param {boolean} test true/false Лог ответа сервера
   */
  constructor(form, server, afterSend, test) {
    this.form = form;
    this.server = server;
    this.test = test;
    this.afterSend = afterSend;
    this.init();
  }

  init = () => {
    const form = this.form;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = [...formData];

      const results = [];

      data.forEach((field) => {
        if (field[0] === "name") {
          results.push(this.validateName(field[1]));
        }

        if (field[0] === "phone") {
          results.push(this.validatePhone(field[1]));
        }
      });

      const validateResult = results.every((i) => i === true);

      if (validateResult) {
        this.fetchForm(formData);
      }
    });
  };

  validateName = (value) => {
    const regex = /[А-ЯЁA-Z][а-яёa-z]+/;
    if (regex.test(value)) {
      this.form.querySelector("input[name=name]").style.boxShadow = "0px 0px 15px green";
      return true;
    } else {
      this.form.querySelector("input[name=name]").style.boxShadow = "0px 0px 15px red";
      return false;
    }
  };

  validatePhone = (value) => {
    const regex = /\+{0,1}\d+/;
    if (regex.test(value)) {
      this.form.querySelector("input[name=phone]").style.boxShadow = "0px 0px 15px green";
      return true;
    } else {
      this.form.querySelector("input[name=phone]").style.boxShadow = "0px 0px 15px red";
      return false;
    }
  };

  fetchForm = async (data) => {
    const server = this.server;

    const request = await fetch(server, {
      method: "POST",
      body: data
    });

    const response = await request.json();

    if (this.test === true) {
      console.log(response);
    }

    this.afterSend();
  };
}

const form = document.querySelector(".inputs");

const validator = new Form(form, "server", () => {
  console.log("Form sended");
}, true);
