import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './constants.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const body = document.querySelector('.body');

const profileName = body.querySelector('.profile__name');
const profileAbout = body.querySelector('.profile__about');

const profileEditButton = body.querySelector('.profile__edit-button');
const profileAddButton = body.querySelector('.profile__add-button');

const elementsList = body.querySelector('.elements__list');

const popups = body.querySelectorAll('.popup');
const popupArray = Array.from(popups);

const popupTypeEdit = body.querySelector('.popup_type_edit');
const popupTypeAdd = body.querySelector('.popup_type_add');

const formElementEdit = popupTypeEdit.querySelector('.popup__container');
const formElementAdd = popupTypeAdd.querySelector('.popup__container');

const popupExitButtons = body.querySelectorAll('.popup__exit-button');
const popupExitButtonArray = Array.from(popupExitButtons);


const popupInputTypeName = popupTypeEdit.querySelector('.popup__input_type_name');
const popupInputTypeAbout = popupTypeEdit.querySelector('.popup__input_type_about');
const popupInputTypeTitle = popupTypeAdd.querySelector('.popup__input_type_title');
const popupInputTypeUrl = popupTypeAdd.querySelector('.popup__input_type_url');

const formList = body.querySelectorAll(validationConfig.formSelector);
const formListArray = Array.from(formList);
const formValidationClassInstanceDict = {};

//Добавление карточки

function addCard(title, imageUrl, templateSelector) {
  const card = new Card(title, imageUrl, templateSelector);
  const cardElement = card.generateCard();

  elementsList.prepend(cardElement);
}

//Открытие попапа

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', exitPopupByPressEscape);
}

function openEditProfilePopup(validationConfig) {
  openPopup(popupTypeEdit);
  popupInputTypeName.value = profileName.textContent;
  popupInputTypeAbout.value = profileAbout.textContent;
  resetValidateForPopup(validationConfig, popupTypeEdit);
}

function openAddCardPopup(validationConfig) {
  openPopup(popupTypeAdd);
  popupTypeAdd.querySelector(validationConfig.formSelector).reset();
  formValidationClassInstanceDict.add.toggleButtonState();
  resetValidateForPopup(validationConfig, popupTypeAdd);
}

//Закрытие попапа

function closePopup(targetClose) {
  targetClose.classList.remove('popup_opened');
  document.removeEventListener('keyup', exitPopupByPressEscape);
}

function exitPopupByClickButton(popupExit) {
  const targetExit = popupExit.closest('.popup');
  closePopup(targetExit);
}

function exitPopupByClickOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function exitPopupByPressEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(body.querySelector('.popup_opened'));
  }
}

//Заполнение формы с редактированием профиля

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputTypeName.value;
  profileAbout.textContent = popupInputTypeAbout.value;
  closePopup(popupTypeEdit);
}

//Заполнение формы для добавления картинки

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  addCard(popupInputTypeTitle.value, popupInputTypeUrl.value, '#elements__element');
  closePopup(popupTypeAdd);
  evt.target.reset();
}

//Сбрасывание ошибок валидации при повторном открытии редактирования профиля

function resetValidateForPopup(validationConfig, popup) {
  const formElement = popup.querySelector(validationConfig.formSelector);
  const formElementName = formElement.name;
  if (formElementName in formValidationClassInstanceDict) {
    const formValidationClassInstance = formValidationClassInstanceDict[formElementName];
    formValidationClassInstance.inputListArray.forEach(inputElementPopup => {
      formValidationClassInstance.hideInputError(inputElementPopup);
    });
  }
}

initialCards.reverse().forEach(initialCard => addCard(initialCard.name, initialCard.link, '#elements__element'));

profileEditButton.addEventListener('click', () => openEditProfilePopup(validationConfig));
profileAddButton.addEventListener('click', () => openAddCardPopup(validationConfig));

popupExitButtonArray.forEach(popupExitButton => popupExitButton.addEventListener('click', () => exitPopupByClickButton(popupExitButton)));

formElementEdit.addEventListener('submit', handleFormSubmitEdit);
formElementAdd.addEventListener('submit', handleFormSubmitAdd);

popupArray.forEach(popup => popup.addEventListener('mousedown', exitPopupByClickOverlay));

formListArray.forEach(formElement => {
  const form = new FormValidator(validationConfig, formElement);
  formValidationClassInstanceDict[form.formElement.name] = form;
  form.enableValidation();
});
