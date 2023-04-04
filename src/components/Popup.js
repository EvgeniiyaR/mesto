export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = document.querySelector(selectorPopup);
  }

  open() {
    this._selectorPopup.classList.add('popup_opened');
    document.addEventListener('keyup', (evt) => this._handleEscClose(evt));
  }

  close() {
    this._selectorPopup.classList.remove('popup_opened');
    document.removeEventListener('keyup', (evt) => this._handleEscClose(evt));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    const popupExitButton = this._selectorPopup.querySelector('.popup__exit-button');
    popupExitButton.addEventListener('click', () => this.close());

    this._selectorPopup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
