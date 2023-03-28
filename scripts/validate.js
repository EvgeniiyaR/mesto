const dataPopupClasses = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

class FormValidator {
  constructor(dataPopupClasses, formElement) {
    this.inputSelector = dataPopupClasses.inputSelector;
    this.submitButtonSelector = dataPopupClasses.submitButtonSelector;
    this.inactiveButtonClass = dataPopupClasses.inactiveButtonClass;
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
    if (hasInvalidInput(inputListArray)) {
      buttonElement.classList.add(this.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _checkValid(inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(dataPopupClasses, this.formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(dataPopupClasses, this.formElement, inputElement);
    }
  }
}

function showInputError(dataPopupClasses, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(dataPopupClasses.inputErrorClass);
  errorElement.classList.add(dataPopupClasses.errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(dataPopupClasses, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(dataPopupClasses.inputErrorClass);
  errorElement.classList.remove(dataPopupClasses.errorClass);
  errorElement.textContent = '';
}

function hasInvalidInput(inputListArray) {
  return inputListArray.some(inputElement => {
    return !inputElement.validity.valid;
  });
}

function validateForm(dataPopupClasses) {
  const formList = document.querySelectorAll(dataPopupClasses.formSelector);
  const formListArray = Array.from(formList);

  formListArray.forEach(formElement => {
    const form = new FormValidator(dataPopupClasses, formElement);
    const formElementValidated = form.enableValidation();

    return formElementValidated;
  });
}

validateForm(dataPopupClasses);
