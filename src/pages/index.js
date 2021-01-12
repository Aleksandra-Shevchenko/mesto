import './index.css';

import {
  validationObject,
  // initialCards,
  selectorObj,
  editButton,
  addPhotoButton,
  popupProfileInputs,
  changeAvatarButton
} from "../utils/constants.js";

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
function handleTrashClick(id, card) {
  popupWithConfirm.setSubmitAction(() => handlePopupConfirm(id, card))
  popupWithConfirm.open();
}

// функция удаления карточек от пользователя (подтверждение)
function handlePopupConfirm(id, card) {
  api.deleteCard(id)
    .then(() => {
      card.removeCard();
      popupWithConfirm.close();
    })
    .catch((err) => {
      console.log(err);
      popupWithConfirm.close();
    });
}

// функция отвечающая за постановку лайка
function handleLikeClick(id, isLiked, card) {
  if (isLiked) {
    //отправляем запрос снятия лайка
    api.dislikedCard(id)
      .then((data) => {
        card.setLikes(data.likes)
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    //отправляем запрос на установку лайка
    api.likedCard(id)
      .then((data) => {
        card.setLikes(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}


// функция редактирования профиля (сабмит формы)
function handlePopupProfile(inputsData) {
  api.saveUserChanges(inputsData)
    .then((data) => {
      userInfo.setUserInfo({
        popupName: data.name,
        popupJob: data.about,
        avatar: data.avatar
      });
      popupFormProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
}

// функция заполнения полей формы данными из профиля
function handleTextInput() {
  const userData = userInfo.getUserInfo();
  popupProfileInputs.forEach(input => {
    input.value = userData[input.name];
  });
}

// функция создания карточек
function createCard(dataCard, id) {
  const card = new Card({
      data: dataCard,
      handleCardClick,
      handleTrashClick,
      handleLikeClick,
    },
    selectorObj.cardId,
    id);
  const newCard = card.generateCard();
  card.setLikes(dataCard.likes);

  return newCard;
}


// функция добавления новых карточек от пользователя (сабмит формы)
function handlePopupAddCard(inputsData) {
  api.postNewCard(inputsData)
    .then((data) => {
      cardList.addItemPrepend(createCard(data, data.owner._id));
      popupFormAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
}

// функция редактирования аватара пользователя (сабмит формы)
function handlePopupChangeAvatar(inputsData) {
  api.changedAvatar(inputsData)
    .then((data) => {
      console.log(data);
      userInfo._avatar.src = data.avatar;
      popupFormChangeAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
}






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

//oбработчик клика открытия попапа по кнопке 'Редактирование аватара'
changeAvatarButton.addEventListener('click', () => {
  popupFormChangeAvatar.open();
  validFormPopupAddCard.resetValidationState();
});



// --- ДЕЙСТВИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---
//создаем экземпляр класса Section
const cardList = new Section({
    renderer: (cardItem, id) => {
      cardList.addItem(createCard(cardItem, id));
    },
  },
  selectorObj.elementsSelector
);


//создаем экземпляр класса PopupWhithImage и навешиваем слушатели событий
const popupWithImage = new PopupWithImage(selectorObj.popupImageSelector);
popupWithImage.setEventListeners();

//создаем экземпляр класса PopupWhithConfirm
//и навешиваем слушатели событий
const popupWithConfirm = new PopupWithConfirm(selectorObj.popupConfirmSelector);
popupWithConfirm.setEventListeners();



//создаем экземпляр класса PopupWhithForm для попапа 'Редактирование профиля'
//и навешиваем слушатели событий
const popupFormProfile = new PopupWithForm(selectorObj.popupProfileSelector, handlePopupProfile);
popupFormProfile.setEventListeners();

//создаем экземпляр класса PopupWhithForm для попапа 'Добавление карточки'
//и навешиваем слушатели событий
const popupFormAddCard = new PopupWithForm(selectorObj.popupAddCardSelector, handlePopupAddCard);
popupFormAddCard.setEventListeners();

//создаем экземпляр класса PopupWhithForm для попапа 'Редактирование аватара'
//и навешиваем слушатели событий
const popupFormChangeAvatar = new PopupWithForm(selectorObj.popupChangeAvatarSelector, handlePopupChangeAvatar);
popupFormChangeAvatar.setEventListeners();


//создаем экземпляры класса FormValidator и включаем валидацию форм
const validFormPopupAddCard = new FormValidator(validationObject, selectorObj.popupAddCardSelector);
validFormPopupAddCard.enableValidation();

const validFormPopupProfile = new FormValidator(validationObject, selectorObj.popupProfileSelector);
validFormPopupProfile.enableValidation();

const validFormPopupChangeAvatar = new FormValidator(validationObject, selectorObj.popupChangeAvatarSelector);
validFormPopupChangeAvatar.enableValidation();


//создаем экземпляр класса UserInfo
const userInfo = new UserInfo({
  selectorName: selectorObj.profileNameSelector,
  selectorJob: selectorObj.profileJobSelector,
  selectorAvatar: selectorObj.avatarSelector,
});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: '249de57f-61eb-4f88-a95a-b462a0c3429a',
    'Content-Type': 'application/json'
  }
});

//в Promise.all передаем массив промисов, которые нужно выполнить
Promise.all([
    api.getUserData(),
    api.getInitialCards()
  ])
  .then((values) => {
    userInfo.setUserInfo({
      popupName: values[0].name,
      popupJob: values[0].about,
      avatar: values[0].avatar,
    })

    cardList.renderItems(values[1], values[0]._id);
  })
  .catch((err) => {
    console.log(err);
  });
