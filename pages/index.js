import { validationObject, initialCards } from "../utils/constants.js";

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const container = document.querySelector(".container");
const cardContainer = container.querySelector(".elements");

//элементы секции профайл
const profileNameElement = container.querySelector(".profile__title");
const profileJobElement = container.querySelector(".profile__subtitle");
const editButton = container.querySelector(".profile__edit-btn");
const addPhotoButton = container.querySelector(".profile__add-btn");

//элементы попапа для редактирования профайла
const popupProfile = document.querySelector(".popup_type_edit");
const formElementProfile = popupProfile.querySelector(".popup__form");
const profileNameInput = popupProfile.querySelector(".popup__input_text_name");
const profileJobInput = popupProfile.querySelector(".popup__input_text_job");

//элементы попапа для добавления фото
const popupAddCard = document.querySelector(".popup_type_add-card");
const formElementAddCard = popupAddCard.querySelector(".popup__form");
const formInputCardName = popupAddCard.querySelector(
  ".popup__input_add-card_name"
);
const formInputCardLink = popupAddCard.querySelector(
  ".popup__input_add-card_link"
);

//элементы попапа с большим фото
const popupImage = document.querySelector(".popup_type_image");
const bigPhotoPopupImage = popupImage.querySelector(".popup__photo");
const popupImageTitle = popupImage.querySelector(".popup__photo-title");




const userInfo = new UserInfo({
  selectorName: ".profile__title",
  selectorJob: ".profile__subtitle",
});

const popupFormProfile = new PopupWithForm(
  ".popup_type_edit",
  handlePopupProfile
);
popupFormProfile.setEventListeners();

editButton.addEventListener("click", () => {
  popupFormProfile.open(userInfo.getUserInfo());
  validFormPopupProfile.resetValidationState();
});

function handlePopupProfile(data) {
  userInfo.setUserInfo({
    name: data.popupName,
    job: data.popupJob,
  });
  popupFormProfile.close();
}

const popupFormAddCard = new PopupWithForm(
  ".popup_type_add-card",
  handlePopupAddCard
);
popupFormAddCard.setEventListeners();

addPhotoButton.addEventListener("click", () => {
  popupFormAddCard.open();
  validFormPopupAddCard.resetValidationState();
});

function handlePopupAddCard(inputsData) {
  const userCard = new Card(
    {
      data: inputsData,
      handleCardClick,
    },
    "#card"
  ).generateCard();
  cardList.addItemPrepend(userCard);
  popupFormAddCard.close();
}

const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();



// --- ФУНКЦИИ ---

//функция открытия попапа с картинкой (при клике на карточку)
function handleCardClick(title, link) {
  popupWithImage.open(title, link);
}

// функция открытия попапа
// function showPopup(typePopup) {
//   typePopup.classList.add("popup_opened");
//   document.addEventListener("keydown", handleEscDown);
// }

// функция закрытия попапа
// function closePopup(typePopup) {
//   typePopup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", handleEscDown);

//   const popupForm = typePopup.querySelector(".popup__form");
//   if (popupForm) {
//     popupForm.reset();
//   }
// }

// функция редактирования профиля
// function handlePopupProfile(evt) {
//   evt.preventDefault();
//   profileNameElement.textContent = profileNameInput.value;
//   profileJobElement.textContent = profileJobInput.value;
//   closePopup(popupProfile);
// }

// функция открытия попапа с большим изображением
// function showPopupImage(name, link) {
//   showPopup(popupImage);
//   popupImageTitle.textContent = name;
//   bigPhotoPopupImage.src = link;
//   bigPhotoPopupImage.alt = `Фото ${name}`;
// }

// функция добавления новых карточек от пользователя
// function handlePopupAddCard(evt) {
//   evt.preventDefault();
//   const newObject = {
//     name: formInputCardName.value,
//     link: formInputCardLink.value,
//   };

//   cardContainer.prepend(
//     new Card({ data:newObject, handleCardClick }, '#card').generateCard()
//   );
//   closePopup(popupAddCard);
// }

//функция обработки клика за пределами области popup__container
// function handlePopupClick(evt) {
//   if (evt.target.classList.contains("popup")) {
//     closePopup(evt.target);
//   }
// }

//функция обработки нажатия клавиши Esc
// function handleEscDown(evt) {
//   if (evt.key === "Escape") {
//     closePopup(document.querySelector(".popup_opened"));
//   }
// }

// --- СЛУШАТЕЛИ СОБЫТИЙ ---

//обработчик к сабмиту формы "Редактирования профиля"
// formElementProfile.addEventListener("submit", handlePopupProfile);

//обработчик к сабмиту формы "Добавление карточки"
// formElementAddCard.addEventListener("submit", handlePopupAddCard);

//обработчик клика открытия попапа "Редактирования профиля"
// editButton.addEventListener("click", () => {
//   profileNameInput.value = profileNameElement.textContent;
//   profileJobInput.value = profileJobElement.textContent;
//   showPopup(popupProfile);
//   validFormPopupProfile.resetValidationState();
// });

//oбработчик клика открытия попапа "Добавление карточки"
// addPhotoButton.addEventListener("click", () => {
//   showPopup(popupAddCard);
//   validFormPopupAddCard.resetValidationState();
// });

//обработчик закрытия попапов по нажатию на "крестик"
// Array.from(document.querySelectorAll(".popup__close")).forEach((closeBtn) => {
//   closeBtn.addEventListener("click", () =>
//     closePopup(closeBtn.closest(".popup"))
//   );
// });

//обработчик закрытия попапов по клику вне области формы
// Array.from(document.querySelectorAll(".popup")).forEach((popup) => {
//   popup.addEventListener("mousedown", handlePopupClick);
// });

// --- ДЕЙСТВИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---

//вставляем экземпляры карточек в контейнер при загрузке страницы
// initialCards.forEach(item => {
//   const card = new Card(item, '#card', showPopupImage);
//   const newCard = card.generateCard();

//   cardContainer.append(newCard);
// });

//создаем экземпляр класса Section и отрисовываем все элементы на странице
const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card({ data: cardItem, handleCardClick }, "#card");
      const newCard = card.generateCard();

      cardList.addItemAppend(newCard);
    },
  },
  ".elements"
);
cardList.renderItems();









//создаем экземпляры класса FormValidator и включаем валидацию форм
const validFormPopupAddCard = new FormValidator(validationObject, popupAddCard);
validFormPopupAddCard.enableValidation();

const validFormPopupProfile = new FormValidator(validationObject, popupProfile);
validFormPopupProfile.enableValidation();
