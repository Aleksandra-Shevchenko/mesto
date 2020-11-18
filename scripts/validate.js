// Проектная работа №6

// функция enableValidation, которая включает валидацию, принимает на вход объект параметров, а затем передаёт параметры вложенным функциям.
const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}


function showInputError(formElement, inputElement, errorMessage, obj) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
}

function hideInputError(formElement, inputElement, obj) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, obj) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
}



// Она принимает массив полей формы и возвращает true, если в нём хотя бы одно поле не валидно, и false, если все валидны.
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid && !inputElement.value.length > 0;
  })
}



function toggleButtonState(inputList, buttonElement, obj) {
  if(hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(obj.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(obj.inactiveButtonClass);
  }
}



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



function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, obj);
  });
}




// Проще всего сделать функцию resetValidationState, которая принимает на вход форму и конфиг валидации, очищает ошибки валидации у всех полей ввода, устанавливает состояние кнопки. И вызывать эту функцию при открытии попапа

function resetValidationState (typePopup, obj) {
  const form = typePopup.querySelector(obj.formSelector);

  if (form) {
    const arrInputs = Array.from(form.querySelectorAll(obj.inputSelector));
    const buttonElement = form.querySelector(obj.submitButtonSelector);

    toggleButtonState(arrInputs, buttonElement, obj)

    arrInputs.forEach((inputElement) => {
      hideInputError(form, inputElement, obj);
    })
  }
  return;
}





enableValidation(validationObject);
