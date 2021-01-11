// --- КЛАСС СОЗДАНИЯ ПОПАПА С КНОПКОЙ ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ ---

import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonConfirm = this._popupElement.querySelector('.popup__form');
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }

  // дополнительно добавляем обработчик клика подтверждения
  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback()
    });
  }

}
