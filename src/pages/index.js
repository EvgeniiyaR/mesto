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
  formValidationClassInstanceDict
} from '../utils/constants.js';

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
