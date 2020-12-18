// --- КЛАСС РАБОТЫ С ФОРМАМИ В ПОПАПАХ ---

import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
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

  close() {
    super.close();
    this._popupForm.reset();
  }

  // метод, который собирает данные всех полей формы
  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  // дополнительно добавляем обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }
}
