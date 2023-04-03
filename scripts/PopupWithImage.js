import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
  }

  open(title, url) {
    super.open();

    const popupImage = this._selectorPopup.querySelector('.popup__image');
    const popupTitle = this._selectorPopup.querySelector('.popup__title');

    popupImage.src = url;
    popupImage.alt = title;
    popupTitle.textContent = title;
  }
}
