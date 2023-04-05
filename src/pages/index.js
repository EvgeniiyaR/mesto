import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  validationConfig,
  profileEditButton,
  profileAddButton,
  formListArray,
  formValidationClassInstanceDict,
  popupInputTypeName,
  popupInputTypeAbout
} from '../utils/constants.js';

formListArray.forEach(formElement => {
  const form = new FormValidator(validationConfig, formElement);
  formValidationClassInstanceDict[form.formElement.name] = form;
  form.enableValidation();
});

const imagePopup = new PopupWithImage('.popup_type_img');

const renderer = (initialCard, isDefault) => {
  const card = new Card(initialCard.name, initialCard.link, '#elements__element', { handleCardClick: (title, url) => {
  imagePopup.open(title, url);
  } });
  const cardElement = card.generateCard();
  if (isDefault) {
    cardSection.addItems(cardElement);
  } else {
    cardSection.addItem(cardElement);
  }
}

const cardSection = new Section({ renderer }, '.elements__list');

const userInfo = new UserInfo('.profile__name', '.profile__about');

const popupTtypeEdit = new PopupWithForm('.popup_type_edit', { submitForm: (inputList) => {
  userInfo.setUserInfo(inputList.author, inputList.about);
  popupTtypeEdit.close();
} });

const popupTypeAdd = new PopupWithForm('.popup_type_add', { submitForm: (inputList) => {
  const inputValuesDict = {
    name: inputList.title,
    link: inputList.url
  };
  cardSection.isDefault = false;
  cardSection.renderItems([inputValuesDict]);
  popupTypeAdd.close();
}});

const openPopupEdit = () => {
  popupTtypeEdit.open();
  const infoEdit = userInfo.getUserInfo();
  popupInputTypeName.value = infoEdit.name;
  popupInputTypeAbout.value = infoEdit.about;
  formValidationClassInstanceDict.edit.inputListArray.forEach(inputElementPopup => {
    formValidationClassInstanceDict.edit.hideInputError(inputElementPopup);
  });
}

const openPopupAdd = () => {
  popupTypeAdd.open();
  formValidationClassInstanceDict.add.toggleButtonState();
  formValidationClassInstanceDict.add.inputListArray.forEach(inputElementPopup => {
    formValidationClassInstanceDict.add.hideInputError(inputElementPopup);
  });
}

cardSection.renderItems(initialCards);

imagePopup.setEventListeners();
popupTtypeEdit.setEventListeners();
popupTypeAdd.setEventListeners();

profileEditButton.addEventListener('click', openPopupEdit);
profileAddButton.addEventListener('click', openPopupAdd);
