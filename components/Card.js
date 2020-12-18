// --- КЛАСС СОЗДАНИЯ КАРТОЧЕК ---

export class Card {
  constructor( { data, handleCardClick }, templateSelector) {
    this._cardSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._showPopup = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const elementPic = this._element.querySelector('.element__pic');
    elementPic.src = this._link;
    elementPic.alt =`Фото ${this._name}`;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__pic').addEventListener('click', () => {
      this._showPopup(this._name, this._link);
    });

    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleDeleteCard();
    });
  }

  _handleLikeCard() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
}
