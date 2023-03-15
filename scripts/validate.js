const enableValidation = () => {
  const formList = document.querySelectorAll('.popup__form');
  const formListArray = Array.from(formList);

  formListArray.forEach(formElement => setEventListeners(formElement));
};

const setEventListeners = (formElement) => {
  const inputList = formElement.querySelectorAll('.popup__input');
  const inputListArray = Array.from(inputList);
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState(inputListArray, buttonElement);

  inputListArray.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputListArray, buttonElement);
    });
  });
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__input_type_error');
  errorElement.classList.add('popup__input-error_active');
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputListArray) => {
  console.log(inputListArray);
  return inputListArray.some(inputElement => {
    console.log(inputElement);
    console.log(inputElement.validity.valid);
    console.log(inputElement.validity.valueMissing);

    return !inputElement.validity.valid
  });
};

const toggleButtonState = (inputListArray, buttonElement) => {
  if (hasInvalidInput(inputListArray)) {
    buttonElement.classList.add('popup__button_inactive');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__button_inactive');
    buttonElement.disabled = false;
  }
};
