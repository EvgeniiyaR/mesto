export default class FormValidator {
  constructor(dataPopupClasses, formElement) {
    this.inputSelector = dataPopupClasses.inputSelector;
    this.submitButtonSelector = dataPopupClasses.submitButtonSelector;
    this.inactiveButtonClass = dataPopupClasses.inactiveButtonClass;
    this.inputErrorClass = dataPopupClasses.inputErrorClass;
    this.errorClass = dataPopupClasses.errorClass;
    this.formElement = formElement;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    const inputList = this.formElement.querySelectorAll(this.inputSelector);
    const inputListArray = Array.from(inputList);
    const buttonElement = this.formElement.querySelector(this.submitButtonSelector);

    this._toggleButtonState(inputListArray, buttonElement);

    inputListArray.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkValid(inputElement);
        this._toggleButtonState(inputListArray, buttonElement);
      });
    });
  }

  _toggleButtonState(inputListArray, buttonElement) {
    if (this._hasInvalidInput(inputListArray)) {
      buttonElement.classList.add(this.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this.inactiveButtonClass);
      buttonElement.disabled = false;
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

  _hasInvalidInput(inputListArray) {
    return inputListArray.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }
}
