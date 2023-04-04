import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, { submitForm }) {
    super(selectorPopup);
    this._submitForm = submitForm;
  }

  getInputValues() {
    this.inputDict = {};
    this._inputs = this._selectorPopup.querySelectorAll('.popup__input');
    this._inputs.forEach((input) => {
      this.inputDict[input.name] = input;
    });
    return this.inputDict;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form = this._selectorPopup.querySelector('.popup__form');
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this.getInputValues());
    });
    this._selectorPopup
  }

  close() {
    super.close();
    if (this._selectorPopup === document.querySelector('.popup_type_add')) {
      this.form.reset();
    }
  }
}
