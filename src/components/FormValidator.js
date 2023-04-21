export default class FormValidator {
  constructor(validationConfig, formElement) {
    this.inputSelector = validationConfig.inputSelector;
    this.submitButtonSelector = validationConfig.submitButtonSelector;
    this.inactiveButtonClass = validationConfig.inactiveButtonClass;
    this.inputErrorClass = validationConfig.inputErrorClass;
    this.errorClass = validationConfig.errorClass;
    this.formElement = formElement;
    this.inputListArray = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    this._buttonElement = this.formElement.querySelector(this.submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._toggleButtonState();

    this.inputListArray.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _checkValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this.inputErrorClass);
    errorElement.classList.add(this.errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = '';
  }

  resetValidation() {
    this._toggleButtonState();
    this.inputListArray.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _hasInvalidInput() {
    return this.inputListArray.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }
}
