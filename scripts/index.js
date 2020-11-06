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


// функция открытия попапа
function showPopup(typePopup) {
  typePopup.classList.add('popup_opened');
}

// функция закрытия попапа
function closePopup(typePopup) {
  typePopup.classList.remove('popup_opened');
}

// функция открывающая попап редактирования профиля с заполненными данными
function openProfilePopup(typePopup) {
  showPopup(typePopup);
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;
}

// функция очищающая поля ввода в попапе
function cleanInputPopup(inputOne, inputTwo) {
  inputOne.value = '';
  inputTwo.value = '';
}

// функция редактирования профиля
function handlePopupProfile(evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileJobElement.textContent = profileJobInput.value;
  closePopup(popupProfile);
}

// обработчик к форме "Редактирования профиля"
formElementProfile.addEventListener('submit', handlePopupProfile);

// другие обработчики событий
editButton.addEventListener('click', () => openProfilePopup(popupProfile));
addPhotoButton.addEventListener('click', () => showPopup(popupAddCard));

popupCloseProfile.addEventListener('click', () => closePopup(popupProfile));
popupCloseImage.addEventListener('click', () => closePopup(popupImage));
popupCloseAddCard.addEventListener('click', function () {
  closePopup(popupAddCard);
  cleanInputPopup(formInputCardName, formInputCardLink);
});


// функция создания карточки с фото
function createCard(itemArr) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.cloneNode(true);

  const cardImg = cardElement.querySelector('.element__pic');
  const cardTitle = cardElement.querySelector('.element__title');
  const cardLike = cardElement.querySelector('.element__like');
  const cardDelete = cardElement.querySelector('.element__trash');

  cardTitle.textContent = itemArr.name;
  cardImg.src = itemArr.link;
  cardImg.alt = (`Фото ${itemArr.name}`);

  // обработчик события - лайк на карточке
  cardLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  // обработчик события - удаление карточки
  cardDelete.addEventListener('click', function () {
    const containerItem = cardDelete.closest('.element');
    containerItem.remove();
  });

  // обработчик события - открытие картинки в большом размере
  cardImg.addEventListener('click', function () {
    showPopup(popupImage);
    popupImageTitle.textContent = cardTitle.textContent;
    bigPhotoPopupImage.src = cardImg.src;
    bigPhotoPopupImage.alt = cardImg.alt;
  });

  return cardElement;
}

// вставляем новый элемент в контейнер карточек
initialCards.forEach(function (item) {
  const newCard = createCard(item);
  cardContainer.append(newCard);
});


// функция добавления новых карточек от пользователя
function handlePopupAddCard(evt) {
  evt.preventDefault();
  const newObject = {
    name: formInputCardName.value,
    link: formInputCardLink.value
  }

  if (!!newObject.name && !!newObject.link) {
    cardContainer.prepend( createCard(newObject) );
  }

  cleanInputPopup(formInputCardName, formInputCardLink);
  closePopup(popupAddCard);
}

//обработчик к форме "Добавление карточки"
formElementAddCard.addEventListener('submit', handlePopupAddCard);


// Дополнительно
//функция обработки клика за пределами области popup__container
function handlePopupClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

popupProfile.addEventListener('mousedown', handlePopupClick);
popupAddCard.addEventListener('mousedown', handlePopupClick);
popupImage.addEventListener('mousedown', handlePopupClick);
