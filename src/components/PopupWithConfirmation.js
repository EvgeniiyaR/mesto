import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
	constructor(selectorPopup) {
    super(selectorPopup);
    // this._submitForm = submitForm;
  }

  submitForm({ submitForm }) {
    this._submitForm = submitForm;
  }

	setEventListeners() {
    super.setEventListeners();
    this.form = this._selectorPopup.querySelector('.popup__form');
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm();
    });
  }
}