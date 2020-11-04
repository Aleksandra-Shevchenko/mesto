let container = document.querySelector('.container');
let editButton = container.querySelector('.profile__edit-btn');
let profileNameElement = container.querySelector('.profile__title');
let profileJobElement = container.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close');
let profileNameInput = popup.querySelector('.popup__input_text_name');
let profileJobInput = popup.querySelector('.popup__input_text_job');
let formElement = popup.querySelector('.popup__form');


// функция открытия попапа
function showPopup() {
  popup.classList.add('popup_opened');
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;
}

// функция закрытия попапа
function closePopup() {
  popup.classList.remove('popup_opened');
}

// функция редактирования профиля
function handlePopup(evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileJobElement.textContent = profileJobInput.value;
  closePopup();
}

// функция обработки клика за пределами области popup__container
function handlePopupClick(evt) {
  if (evt.target.classList.contains('popup')){
    closePopup();
  }
}


formElement.addEventListener('submit', handlePopup);

editButton.addEventListener('click', showPopup);

popupClose.addEventListener('click', closePopup);

popup.addEventListener('mousedown', handlePopupClick);
