import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._inputList = this._popupElement.querySelectorAll(".popup__input");
  }

  open(inputsData = {}) {
    super.open();
    this._inputsData = inputsData;

    if (Object.keys(this._inputsData).length) {
      this._inputList.forEach((input) => {
        input.value = this._inputsData[input.name];
      });
    }
  }

  // так как при закрытии попапа форма должна ещё и сбрасываться
  close() {
    super.close();
    this._popupForm.reset();
  }

  //приватный метод, который собирает данные всех полей формы
  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  // должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      console.log(this._getInputValues());
      this._handleSubmit(this._getInputValues());
    });
  }
}

// Для каждого попапа создавайте свой экземпляр класса `PopupWithForm`.
