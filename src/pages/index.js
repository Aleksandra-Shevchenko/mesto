import './index.css';

import { validationObject, initialCards, selectorObj, editButton, addPhotoButton, popupProfileInputs } from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/popup-with-image.js";
import PopupWithForm from "../components/popup-with-form.js";
import UserInfo from "../components/user-info.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";


// --- ФУНКЦИИ ---
//функция открытия попапа с картинкой (при клике на карточку)
function handleCardClick(title, link) {
  popupWithImage.open(title, link);
}

//функция открытия попапа с подтверждением (при клике на корзину)
function handleTrashClick(cardId) {
  popupWithConfirm.open(cardId);
  console.log(element)
}


// функция редактирования профиля (сабмит формы)
//ОТРЕДАКТИРОВАНА
function handlePopupProfile(inputsData) {
  userInfo.setUserInfo(inputsData);
  api.saveUserChanges(inputsData);
  popupFormProfile.close();
}

// функция заполнения полей формы данными из профиля
function handleTextInput() {
  const userData = userInfo.getUserInfo();
  popupProfileInputs.forEach(input => {
    input.value = userData[input.name];
  });
}

// функция создания карточек
function createCard(dataCard) {
  const card = new Card({ data: dataCard, handleCardClick, handleTrashClick }, selectorObj.cardId);
  const newCard = card.generateCard();

  // if(dataCard.owner.name !== userInfo.getUserInfo().popupName){
  //   newCard.querySelector(selectorObj.trashCard).remove();
  // }

  return newCard;
}

// функция добавления новых карточек от пользователя (сабмит формы)
function handlePopupAddCard(inputsData) {
  cardList.addItem( createCard(inputsData) );
  api.postNewCard(inputsData);
  popupFormAddCard.close();
}

// функция удаления карточек от пользователя (подтверждение)
function handlePopupConfirm(cardId) {
  api.deleteCard(cardId)
  popupWithConfirm.close();
}

const popupWithConfirm = new PopupWithConfirm(selectorObj.popupConfirmSelector, handlePopupConfirm);
popupWithConfirm.setEventListeners();







// --- СЛУШАТЕЛИ СОБЫТИЙ ---
//обработчик клика открытия попапа по кнопке 'Редактирования профиля'
editButton.addEventListener('click', () => {
  popupFormProfile.open();
  handleTextInput();
  validFormPopupProfile.resetValidationState();
});

//oбработчик клика открытия попапа по кнопке 'Добавление карточки'
addPhotoButton.addEventListener('click', () => {
  popupFormAddCard.open();
  validFormPopupAddCard.resetValidationState();
});



// --- ДЕЙСТВИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---
//создаем экземпляр класса Section
const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      cardList.addItem( createCard(cardItem) );
    },
  },
  selectorObj.elementsSelector
);


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
  selectorName: selectorObj.profileNameSelector,
  selectorJob: selectorObj.profileJobSelector
});


//ПРОЕКТНАЯ 9

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: '249de57f-61eb-4f88-a95a-b462a0c3429a',
    'Content-Type': 'application/json'
  }
});

api.getUserData();

api.getInitialCards()
  .then(result => {
    cardList.renderItems(result);
  })
  .catch((err) => {
    console.log(err);
    cardList.renderItems();
  });
