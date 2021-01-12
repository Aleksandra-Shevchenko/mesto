// --- КЛАСС СОЗДАНИЯ КАРТОЧЕК ---

export default class Card {
  constructor( { data, handleCardClick, handleTrashClick, handleLikeClick }, templateSelector, userId) {
    this._cardSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._showPopup = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
    this._idOwner = data.owner._id;
    this._userId = userId;
    this._cardId = data._id;
    this._likes = data.likes;
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
    this._like = this._element.querySelector('.element__like');

    if(this._userId !== this._idOwner) {
      this._delete.remove();
    }

    this._setEventListeners();

    return this._element;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _checkLike() {
    return this._likes.some(like => {
      return like._id === this._userId;
    })
  }

  _setEventListeners() {
    this._picture.addEventListener('click', () => {
      this._showPopup(this._name, this._link);
    });

    this._delete.addEventListener('click', () => {
      this._handleTrashClick(this._cardId, this);
    });

    this._like.addEventListener('click', () => {
      this._handleLikeClick(this._cardId, this._checkLike(), this);
    });
  }


  //метод принимает данные лайков карточки и обновляет отображение карточки. Он используется при первой отрисовке карточки и при ответе сервера на установку и снятие лайка
  setLikes(arr){
    this._element.querySelector('.element__sum-like').textContent = arr.length;
    this._likes = arr;
    if(this._checkLike()){
      this._like.classList.add('element__like_active');
    } else {
      this._like.classList.remove('element__like_active');
    }
  }
}
