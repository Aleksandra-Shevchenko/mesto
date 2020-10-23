let container = document.querySelector('.container');
let editButton = container.querySelector('.profile__edit-btn');
let profileNameElement = container.querySelector('.profile__title');
let profileJobElement = container.querySelector('.profile__subtitle');
let popup = container.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close');
let profileNameInput = popup.querySelector('.popup__input_text_name');
let profileJobInput = popup.querySelector('.popup__input_text_job');
let formElement = popup.querySelector('.popup__form');
let formButton = popup.querySelector('.submit-btn');

function showPopup () {
  popup.classList.add('popup_opened');
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileNameElement.textContent = profileNameInput.value;
    profileJobElement.textContent = profileJobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);

formButton.addEventListener('click', closePopup);

editButton.addEventListener('click', showPopup);

popupClose.addEventListener('click', closePopup);

