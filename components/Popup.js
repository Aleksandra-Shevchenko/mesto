export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
    this._popupCloseButton = this._popupElement.querySelector('.popup__close');
  }

  open() {
    this._popupElement.classList.add('popup_opened');

    // document.addEventListener('keydown', () => {
    //   this.__handleEscClose();
    // });
  }

  close() {
    this._popupElement.classList.remove('popup_opened');

    // document.removeEventListener('keydown', () => {
    //   this.__handleEscClose();
    // });
  }

  // __handleEscClose(evt) {
  //   if (evt.key === 'Escape') {
  //     this.close();
  //   }
  // }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => {
        this.close();
    });
  }
}
