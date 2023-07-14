/**
 * Класс формы
 */
class Form {
  /**
   * Конструктор класса Form
   * @param {HTMLElement} form Элемент формы
   */
  constructor(form) {
    this.form = form;
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

      if (!validateResult) {
        console.log("Failed");
        return;
      }

      this.fetchForm(formData);
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

  fetchForm = (data) => {
    // Fetch code here...
  }
}

const form = document.querySelector(".inputs");

const validator = new Form(form);
