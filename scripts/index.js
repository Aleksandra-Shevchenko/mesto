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
  console.log(evt.target);
  if (evt.target.classList.contains('popup')){
    closePopup();
  }
}

formElement.addEventListener('submit', handlePopup);

editButton.addEventListener('click', showPopup);

popupClose.addEventListener('click', closePopup);

popup.addEventListener('mousedown', handlePopupClick);


// Проектная работа №5
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

const cardContainer = document.querySelector('.elements'); //контейнер куда будем вставлять карточки

// Функция создания карточки должна решать только одну задачу - создавать DOM элемент карточки, но не вставлять её сразу в контейнер. Функция createCard: создает карточку из темплейта, подставляет данные, навешивает обработчики и возращает созданную карточку.


// функция создания карточки с фото, она принимает объект с данными карточки
function createCard(itemArr) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.cloneNode(true);

  const cardImg = cardElement.querySelector('.element__pic');
  const cardTitle = cardElement.querySelector('.element__title');

  cardTitle.textContent = itemArr.name;
  cardImg.src = itemArr.link;
  cardImg.alt = (`Фото ${itemArr.name}`);

  return cardElement;
}


//на вход получаем объект из массива, с каждым объектом создаем DOM элемент картчоки и вставляем полученный элемент в контейнер карточек
initialCards.forEach(function (item) {
  const newCard = createCard(item);
  // console.log (createCard(item));
  cardContainer.prepend(newCard);
})

