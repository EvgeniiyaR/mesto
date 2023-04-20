export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const body = document.querySelector('.body');

export const profileEditButton = body.querySelector('.profile__edit-button');
export const profileAddButton = body.querySelector('.profile__add-button');
export const profileEditAvatarButton = body.querySelector('.profile__avatar-container');

export const popupInputTypeName = body.querySelector('.popup__input_type_name');
export const popupInputTypeAbout = body.querySelector('.popup__input_type_about');

export const formListArray = Array.from(body.querySelectorAll(validationConfig.formSelector));

export const formValidationClassInstanceDict = {};

