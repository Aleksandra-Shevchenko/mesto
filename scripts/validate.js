//СКРИПТ ВАЛИДАЦИИ ФОРМ

//объект параметров для валидации форм
const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

// --- ФУНКЦИИ ---
//функция появления сообщения об ошибке
function showInputError(formElement, inputElement, errorMessage, obj) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
}

//функция скрытия сообщения об ошибке
function hideInputError(formElement, inputElement, obj) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
}

//функция управления сообщениями об ошибках
function checkInputValidity(formElement, inputElement, obj) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
}


//функция проверки на невалидные поля
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
}


//функция включения/выключения кнопки submit в форме
function toggleButtonState(inputList, buttonElement, obj) {
  if(hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(obj.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(obj.inactiveButtonClass);
  }
}


//функция добавления слушателей для каждого поля ввода
function setEventListeners(formElement, obj) {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, obj);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, obj);

      toggleButtonState(inputList, buttonElement, obj);
    });
  });
}


//функция включения валидации всех форм
function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, obj);
  });
}


//функция сброса проверки
function resetValidationState (typePopup, obj) {
  const form = typePopup.querySelector(obj.formSelector);

  if (form) {
    const inputsArr = Array.from(form.querySelectorAll(obj.inputSelector));
    const buttonElement = form.querySelector(obj.submitButtonSelector);

    toggleButtonState(inputsArr, buttonElement, obj);

    inputsArr.forEach((inputElement) => {
      hideInputError(form, inputElement, obj);
    })
  }
  return;
}




enableValidation(validationObject);
