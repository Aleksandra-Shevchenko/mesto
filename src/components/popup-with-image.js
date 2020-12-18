// --- КЛАСС СОЗДАНИЯ ПОПАПА С ИЗОБРАЖЕНИЕМ ---

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupTitle = this._popupElement.querySelector('.popup__photo-title');
    this._popupPhoto = this._popupElement.querySelector('.popup__photo');
  }

  open(title, link) {
    super.open();
    this._popupTitle.textContent = title;
    this._popupPhoto.src = link;
    this._popupPhoto.alt = `Фото ${title}`;
  }
}
