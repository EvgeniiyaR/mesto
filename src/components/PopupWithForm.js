import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, { submitForm }) {
    super(selectorPopup);
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._inputDictValues = {};
    this._inputs = this._selectorPopup.querySelectorAll('.popup__input');
    this._inputs.forEach((input) => this._inputDictValues[input.name] = input.value);
    return this._inputDictValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form = this._selectorPopup.querySelector('.popup__form');
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this.form.reset();
  }
}
