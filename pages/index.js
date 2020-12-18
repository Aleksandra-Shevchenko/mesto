import { validationObject, initialCards } from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";


const container = document.querySelector(".container");
const editButton = container.querySelector(".profile__edit-btn");
const addPhotoButton = container.querySelector(".profile__add-btn");



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

// функция добавления новых карточек от пользователя (сабмит формы)
function handlePopupAddCard(inputsData) {
  const userCard = new Card({ data: inputsData, handleCardClick }, '#card').generateCard();
  cardList.addItemPrepend(userCard);
  popupFormAddCard.close();
}



// --- СЛУШАТЕЛИ СОБЫТИЙ ---
//обработчик клика открытия попапа по кнопке 'Редактирования профиля'
editButton.addEventListener("click", () => {
  popupFormProfile.open(userInfo.getUserInfo());
  validFormPopupProfile.resetValidationState();
});

//oбработчик клика открытия попапа по кнопке 'Добавление карточки'
addPhotoButton.addEventListener("click", () => {
  popupFormAddCard.open();
  validFormPopupAddCard.resetValidationState();
});



// --- ДЕЙСТВИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---
//создаем экземпляр класса Section и отрисовываем все элементы на странице
const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card({ data: cardItem, handleCardClick }, '#card');
      const newCard = card.generateCard();

      cardList.addItemAppend(newCard);
    },
  },
  ".elements"
);
cardList.renderItems();

//создаем экземпляр класса PopupWhithImage и навешиваем слушатели событий
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

//создаем экземпляр класса PopupWhithForm для попапа 'Редактирование профиля'
//и навешиваем слушатели событий
const popupFormProfile = new PopupWithForm('.popup_type_edit', handlePopupProfile);
popupFormProfile.setEventListeners();

//создаем экземпляр класса PopupWhithForm для попапа 'Добавление карточки'
//и навешиваем слушатели событий
const popupFormAddCard = new PopupWithForm('.popup_type_add-card', handlePopupAddCard);
popupFormAddCard.setEventListeners();

//создаем экземпляры класса FormValidator и включаем валидацию форм
const validFormPopupAddCard = new FormValidator(validationObject, '.popup_type_add-card');
validFormPopupAddCard.enableValidation();

const validFormPopupProfile = new FormValidator(validationObject, '.popup_type_edit');
validFormPopupProfile.enableValidation();

//создаем экземпляр класса UserInfo
const userInfo = new UserInfo({
  selectorName: '.profile__title',
  selectorJob: '.profile__subtitle',
});

