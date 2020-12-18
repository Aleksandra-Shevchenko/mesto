import './index.css';

import { validationObject, initialCards, selectorObj, editButton, addPhotoButton, popupProfileInputs } from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/popup-with-image.js";
import PopupWithForm from "../components/popup-with-form.js";
import UserInfo from "../components/user-info.js";


// --- ФУНКЦИИ ---
//функция открытия попапа с картинкой (при клике на карточку)
function handleCardClick(title, link) {
  popupWithImage.open(title, link);
}

// функция редактирования профиля (сабмит формы)
function handlePopupProfile(inputsData) {
  userInfo.setUserInfo(inputsData);
  popupFormProfile.close();
}

// функция создания карточек
function createCard(dataCard) {
  const card = new Card({ data: dataCard, handleCardClick }, selectorObj.cardId);
  const newCard = card.generateCard();

  return newCard;
}

// функция добавления новых карточек от пользователя (сабмит формы)
function handlePopupAddCard(inputsData) {
  cardList.addItem( createCard(inputsData) );
  popupFormAddCard.close();
}



// --- СЛУШАТЕЛИ СОБЫТИЙ ---
//обработчик клика открытия попапа по кнопке 'Редактирования профиля'
editButton.addEventListener('click', () => {
  popupFormProfile.open();

  const userData = userInfo.getUserInfo();
  popupProfileInputs.forEach(input => {
    input.value = userData[input.name];
  });

  validFormPopupProfile.resetValidationState();
});

//oбработчик клика открытия попапа по кнопке 'Добавление карточки'
addPhotoButton.addEventListener('click', () => {
  popupFormAddCard.open();
  validFormPopupAddCard.resetValidationState();
});



// --- ДЕЙСТВИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---
//создаем экземпляр класса Section и отрисовываем все элементы на странице
const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      cardList.addItem( createCard(cardItem) );
    },
  },
  selectorObj.elementsSelector
);
cardList.renderItems();

//создаем экземпляр класса PopupWhithImage и навешиваем слушатели событий
const popupWithImage = new PopupWithImage(selectorObj.popupImageSelector);
popupWithImage.setEventListeners();

//создаем экземпляр класса PopupWhithForm для попапа 'Редактирование профиля'
//и навешиваем слушатели событий
const popupFormProfile = new PopupWithForm(selectorObj.popupProfileSelector, handlePopupProfile);
popupFormProfile.setEventListeners();

//создаем экземпляр класса PopupWhithForm для попапа 'Добавление карточки'
//и навешиваем слушатели событий
const popupFormAddCard = new PopupWithForm(selectorObj.popupAddCardSelector, handlePopupAddCard);
popupFormAddCard.setEventListeners();

//создаем экземпляры класса FormValidator и включаем валидацию форм
const validFormPopupAddCard = new FormValidator(validationObject, selectorObj.popupAddCardSelector);
validFormPopupAddCard.enableValidation();

const validFormPopupProfile = new FormValidator(validationObject, selectorObj.popupProfileSelector);
validFormPopupProfile.enableValidation();

//создаем экземпляр класса UserInfo
const userInfo = new UserInfo({
  selectorName: '.profile__title',
  selectorJob: '.profile__subtitle',
});

