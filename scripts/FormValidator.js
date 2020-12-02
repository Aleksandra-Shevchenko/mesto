//СКРИПТ ВАЛИДАЦИИ ФОРМ

export class FormValidator {
  constructor(config, form) {
    this._obj = config;
    this._formElement = form;
  }

  //метод появления сообщения об ошибке
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._obj.errorClass);
  }

  //метод скрытия сообщения об ошибке
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._obj.inputErrorClass);
    errorElement.classList.remove(this._obj.errorClass);
    errorElement.textContent = '';
  }


  //метод управления сообщениями об ошибках
  _checkInputValidity(inputElement) {
    if(inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  //метод проверки на невалидные поля
  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }


  //метод включения/выключения кнопки submit в форме
  _toggleButtonState(inputList, buttonElement) {
    if(this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._obj.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._obj.inactiveButtonClass);
    }
  }

  //метод добавления слушателей для каждого поля ввода
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._obj.inputSelector));
    const buttonElement = this._formElement.querySelector(this._obj.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);

        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  //метод сброса результатов проверки
  _resetValidationState () {
    const form = this._formElement.querySelector(this._obj.formSelector);
    const inputsArr = Array.from(form.querySelectorAll(this._obj.inputSelector));
    const buttonElement = form.querySelector(this._obj.submitButtonSelector);

    this._toggleButtonState(inputsArr, buttonElement);

    inputsArr.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //метод включения валидации
  enableValidation() {
    this._setEventListeners();
    this._resetValidationState();
  }
}
