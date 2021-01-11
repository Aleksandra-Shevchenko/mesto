// --- КЛАСС СОЗДАНИЯ КАРТОЧЕК ---

export default class Card {
  constructor( { data, handleCardClick, handleTrashClick }, templateSelector, userId) {
    this._cardSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._showPopup = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._idOwner = data.owner._id;
    this._userId = userId;
    this._cardId = data._id
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

    this._picture = this._element.querySelector('.element__pic');
    this._picture.src = this._link;
    this._picture.alt =`Фото ${this._name}`;
    this._element.querySelector('.element__title').textContent = this._name;
    this._delete = this._element.querySelector('.element__trash');

    this._setEventListeners();

    if(this._userId !== this._idOwner) {
      this._delete.remove();
    }

    return this._element;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }




  _setEventListeners() {
    this._picture.addEventListener('click', () => {
      this._showPopup(this._name, this._link);
    });

    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeCard();
    });


    this._delete.addEventListener('click', () => {
      this._handleTrashClick(this._cardId, this);
    });
  }

  _handleLikeCard() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }


}
