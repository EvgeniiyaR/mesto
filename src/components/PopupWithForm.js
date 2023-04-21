import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, { submitForm }) {
    super(selectorPopup);
    this._submitForm = submitForm;
    this._submitButton = this._selectorPopup.querySelector('.popup__button');
    this._inputs = this._selectorPopup.querySelectorAll('.popup__input');
    this.form = this._selectorPopup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputDictValues = {};
    this._inputs.forEach((input) => this._inputDictValues[input.name] = input.value);
    return this._inputDictValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const initialText = this._submitButton.textContent;
      this._submitButton.textContent = 'Сохранение...';
      this._submitForm(this._getInputValues())
      .then(() => this.close())
      .finally(() => {
        this._submitButton.textContent = initialText;
      })
    });
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data.name;
      input.value = data.about;
    });
  }

  close() {
    super.close();
    this.form.reset();
  }
}
