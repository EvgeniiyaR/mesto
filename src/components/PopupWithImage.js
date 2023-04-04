import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popupImage = this._selectorPopup.querySelector('.popup__image');
    this._popupTitle = this._selectorPopup.querySelector('.popup__title');
  }

  open(title, url) {
    super.open();

    this._popupImage.src = url;
    this._popupImage.alt = title;
    this._popupTitle.textContent = title;
  }
}
