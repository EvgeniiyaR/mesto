const dataPopupClasses = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

function enableValidation(dataPopupClasses) {
  const formList = document.querySelectorAll(dataPopupClasses.formSelector);
  const formListArray = Array.from(formList);

  formListArray.forEach(formElement => setEventListeners(dataPopupClasses, formElement));
}

function setEventListeners(dataPopupClasses, formElement) {
  const inputList = formElement.querySelectorAll(dataPopupClasses.inputSelector);
  const inputListArray = Array.from(inputList);
  const buttonElement = formElement.querySelector(dataPopupClasses.submitButtonSelector);

  toggleButtonState(dataPopupClasses, inputListArray, buttonElement);

  inputListArray.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkValid(dataPopupClasses, formElement, inputElement);
      toggleButtonState(dataPopupClasses, inputListArray, buttonElement);
    });
  });
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

function checkValid(dataPopupClasses, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(dataPopupClasses, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(dataPopupClasses, formElement, inputElement);
  }
}

function hasInvalidInput(inputListArray) {
  return inputListArray.some(inputElement => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(dataPopupClasses, inputListArray, buttonElement) {
  if (hasInvalidInput(inputListArray)) {
    buttonElement.classList.add(dataPopupClasses.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(dataPopupClasses.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

enableValidation(dataPopupClasses);
