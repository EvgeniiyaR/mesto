import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
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

const profileEditButton = body.querySelector('.profile__edit-button');
const profileAddButton = body.querySelector('.profile__add-button');

const formListArray = Array.from(body.querySelectorAll(validationConfig.formSelector));

const formValidationClassInstanceDict = {};

formListArray.forEach(formElement => {
  const form = new FormValidator(validationConfig, formElement);
  formValidationClassInstanceDict[form.formElement.name] = form;
  form.enableValidation();
});

// Редактирование профиля

const userInfo = new UserInfo('.profile__name', '.profile__about');

const popupTtypeEdit = new PopupWithForm('.popup_type_edit', { submitForm: (inputsList) => {
  userInfo.setUserInfo(inputsList.author.value, inputsList.about.value);
  popupTtypeEdit.close();
} });

popupTtypeEdit.setEventListeners();
profileEditButton.addEventListener('click', () => {
  popupTtypeEdit.open();
  const infoEdit = userInfo.getUserInfo();
  const infoEditValues = popupTtypeEdit.getInputValues();
  infoEditValues.author.value = infoEdit.name;
  infoEditValues.about.value = infoEdit.about;
  formValidationClassInstanceDict.edit.inputListArray.forEach(inputElementPopup => {
    formValidationClassInstanceDict.edit.hideInputError(inputElementPopup);
  });
});

//Функция создания карточки

function addCard(item) {
  const cardSection = new Section({ items: item , renderer: (initialCard) => {
    const card = new Card(initialCard.name, initialCard.link, '#elements__element', { handleCardClick: (title, url) => {
    const imagePopup = new PopupWithImage('.popup_type_img');
      imagePopup.setEventListeners();
      imagePopup.open(title, url);
    } });
  const cardElement = card.generateCard();
  cardSection.addItem(cardElement);
  } }, '.elements__list')
  cardSection.renderItems();
}

//Создает картинки из попапа

const popupTypeAdd = new PopupWithForm('.popup_type_add', { submitForm: (inputsList) => {
  const inputValuesDict = {
    name: inputsList.title.value,
    link: inputsList.url.value
  };
  addCard([inputValuesDict]);
  popupTypeAdd.close();
}});

popupTypeAdd.setEventListeners();
profileAddButton.addEventListener('click', () => {
  popupTypeAdd.open();
  formValidationClassInstanceDict.add.toggleButtonState();
  formValidationClassInstanceDict.add.inputListArray.forEach(inputElementPopup => {
    formValidationClassInstanceDict.add.hideInputError(inputElementPopup);
  });
});

// Создает картинки из шаблона

addCard(initialCards);
