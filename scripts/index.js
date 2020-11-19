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


const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content;

const container = document.querySelector('.container');

//элементы секции профайл
const profileNameElement = container.querySelector('.profile__title');
const profileJobElement = container.querySelector('.profile__subtitle');
const editButton = container.querySelector('.profile__edit-btn');
const addPhotoButton = container.querySelector('.profile__add-btn');

//элементы попапа для редактирования профайла
const popupProfile = document.querySelector('.popup_type_edit');
const popupCloseProfile = popupProfile.querySelector('.popup__close');
const formElementProfile = popupProfile.querySelector('.popup__form');
const profileNameInput = popupProfile.querySelector('.popup__input_text_name');
const profileJobInput = popupProfile.querySelector('.popup__input_text_job');

//элементы попапа для добавления фото
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupCloseAddCard = popupAddCard.querySelector('.popup__close');
const formElementAddCard = popupAddCard.querySelector('.popup__form');
const formInputCardName = popupAddCard.querySelector('.popup__input_add-card_name');
const formInputCardLink = popupAddCard.querySelector('.popup__input_add-card_link');

// элементы попапа открытия изображения в большом формате
const popupImage = document.querySelector('.popup_type_image');
const bigPhotoPopupImage = popupImage.querySelector('.popup__photo');
const popupImageTitle = popupImage.querySelector('.popup__photo-title');
const popupCloseImage = popupImage.querySelector('.popup__close');




// --- ФУНКЦИИ---

// функция открытия попапа
function showPopup(typePopup) {
  typePopup.classList.add('popup_opened');
  resetValidationState (typePopup, validationObject);
}

// функция закрытия попапа
function closePopup(typePopup) {
    typePopup.classList.remove('popup_opened');

    const popupForm = typePopup.querySelector('.popup__form');
    if (popupForm) {
      popupForm.reset();
    }
}

// функция редактирования профиля
function handlePopupProfile(evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileJobElement.textContent = profileJobInput.value;
  closePopup(popupProfile);
}

// функция создания карточки с фото
function createCard(itemArr) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImg = cardElement.querySelector('.element__pic');
  const cardTitle = cardElement.querySelector('.element__title');

  cardTitle.textContent = itemArr.name;
  cardImg.src = itemArr.link;
  cardImg.alt = (`Фото ${itemArr.name}`);

  return cardElement;
}


// функция добавления новых карточек от пользователя
function handlePopupAddCard(evt) {
  evt.preventDefault();
  const newObject = {
    name: formInputCardName.value,
    link: formInputCardLink.value
  }

  cardContainer.prepend( createCard(newObject) );
  closePopup(popupAddCard);
}


//функция обработки клика за пределами области popup__container
function handlePopupClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}


//функция обработки нажатия клавиши Esc
function handleEscDown(evt) {
  if (evt.key === 'Escape' && document.querySelector('.popup_opened')) {
    closePopup(document.querySelector('.popup_opened'));
  }

  document.removeEventListener('click', handleEscDown);
}



// --- СЛУШАТЕЛИ СОБЫТИЙ---

//обработчик к форме "Редактирования профиля"
formElementProfile.addEventListener('submit', handlePopupProfile);

//обработчик к форме "Добавление карточки"
formElementAddCard.addEventListener('submit', handlePopupAddCard);

// другие обработчики событий
addPhotoButton.addEventListener('click', () => showPopup(popupAddCard));

editButton.addEventListener('click', function() {
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;
  showPopup(popupProfile);
})



// popupCloseProfile.addEventListener('click', () => closePopup(popupProfile));
// popupCloseImage.addEventListener('click', () => closePopup(popupImage));
// popupCloseAddCard.addEventListener('click', () => closePopup(popupAddCard));

Array.from(document.querySelectorAll('.popup__close')).forEach(closeBtn => {
  closeBtn.addEventListener('click', () => closePopup(closeBtn.closest('.popup')));
})

// popupProfile.addEventListener('mousedown', handlePopupClick);
// popupAddCard.addEventListener('mousedown', handlePopupClick);
// popupImage.addEventListener('mousedown', handlePopupClick);

Array.from(document.querySelectorAll('.popup')).forEach(popup => {
  popup.addEventListener('mousedown', handlePopupClick);
})


//обработчик нажатия на Esc для закрытия попапа
document.addEventListener('keydown', handleEscDown);



//обработчик кнопки лайк на карточке
cardContainer.addEventListener('click', evt => {
  if (evt.target.classList.contains('element__like')) {
    evt.target.classList.toggle('element__like_active');
  }
});

//обработчик события - удаление карточки
cardContainer.addEventListener('click', evt => {
  if (evt.target.classList.contains('element__trash')) {
    const containerItem = evt.target.closest('.element');
    containerItem.remove();
  }
});

//обработчик события - открытие картинки в большом размере
cardContainer.addEventListener('click', evt => {
  if (evt.target.classList.contains('element__pic')) {
    showPopup(popupImage);
    popupImageTitle.textContent = evt.target.closest('.element').querySelector('.element__title').textContent;
    bigPhotoPopupImage.src = evt.target.src;
    bigPhotoPopupImage.alt = evt.target.alt;
  }
});



// вставляем элементы карточек в контейнер при загрузке страницы
initialCards.forEach(function (item) {
  const newCard = createCard(item);
  cardContainer.append(newCard);
})







