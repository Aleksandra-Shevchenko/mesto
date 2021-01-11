// --- ДАННЫЕ  ---

//объект параметров для валидации форм
const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

//массив отображаемых карточек при загрузке страницы
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//селекторы для создания экземпляров классов
const selectorObj = {
  popupImageSelector: '.popup_type_image',
  popupProfileSelector: '.popup_type_edit',
  popupAddCardSelector: '.popup_type_add-card',
  elementsSelector: '.elements',
  profileNameSelector: '.profile__title',
  profileJobSelector: '.profile__subtitle',
  cardId: '#card',
  trashCard: '.element__trash',
  popupConfirmSelector: '.popup_type_confirm',
};


const container = document.querySelector(".container");
const editButton = container.querySelector(".profile__edit-btn");
const addPhotoButton = container.querySelector(".profile__add-btn");
const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileInputs = popupProfile.querySelectorAll('.popup__input');


export {
  validationObject,
  initialCards,
  editButton,
  addPhotoButton,
  selectorObj,
  popupProfileInputs
};
