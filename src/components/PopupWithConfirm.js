// --- КЛАСС СОЗДАНИЯ ПОПАПА С КНОПКОЙ ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ ---

import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._buttonConfirm = this._popupElement.querySelector('.popup__submit-btn');
  }


  //при открытии попапа передаем id карточки с которой он был вызван и сам элемент
  open(cardId, element) {
    super.open();
    this._cardId = cardId;
    console.log(this._cardId);
  }

  // дополнительно добавляем обработчик клика подтверждения
  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirm.addEventListener("click", () => {
      this._handleSubmit(this._cardId);
    });
  }

}
