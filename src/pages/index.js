import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import {
  validationConfig,
  profileEditButton,
  profileAddButton,
  formListArray,
  formValidationClassInstanceDict,
  popupInputTypeName,
  popupInputTypeAbout,
  profileEditAvatarButton
} from '../utils/constants.js';

formListArray.forEach(formElement => {
  const form = new FormValidator(validationConfig, formElement);
  formValidationClassInstanceDict[form.formElement.name] = form;
  form.enableValidation();
});

const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-64', 
  headers: {
    authorization: "2ac7f567-442d-413f-8934-d4f44e2290b8",
    "content-type": "application/json"
  }
});

const userInfo = new UserInfo('.profile__name', '.profile__about', '.profile__avatar');

api.getUserInfo()
.then((res) => {
  userInfo.setUserInfo(res.name, res.about);
  userInfo.setUserAvatar(res.name, res.avatar);
  userInfo.setUserId(res._id);
})
.catch((err) => console.log(`Возникла ошибка: ${err}`));

const imagePopup = new PopupWithImage('.popup_type_img');
const deletePopup = new PopupWithConfirmation('.popup_type_delete');
deletePopup.setEventListeners();

const renderer = (initialCard, isDefault) => {
  const card = new Card(initialCard, '#elements__element', { 
    handleCardClick: (title, url) => {
      imagePopup.open(title, url);
    }, 
    handleDeleteCardClick: (id, owner) => {
      deletePopup.open();
      deletePopup.submitForm({ submitForm: () => {
        if (userInfo.getUserId() == owner._id) {
          api.deleteCard(id)
          .then(() => {
            card.deleteCard();
            deletePopup.close();
          })
          .catch((err) => console.log(`Возникла ошибка: ${err}`));
        }
      }});
    } });
  if (userInfo.getUserId() === card.owner._id) {
    card.isBasket = true;
  }
  const cardElement = card.generateCard();
  if (isDefault) {
    cardSection.addItems(cardElement);
  } else {
    cardSection.addItem(cardElement);
  }
}

const cardSection = new Section({ renderer }, '.elements__list');

const popupTypeEdit = new PopupWithForm('.popup_type_edit', { submitForm: (inputList) => {
  userInfo.setUserInfo(inputList.author, inputList.about);
  api.editUserInfo(inputList.author, inputList.about)
  .catch((err) => console.log(`Возникла ошибка: ${err}`));
  popupTypeEdit.close();
} });

const popupTypeAdd = new PopupWithForm('.popup_type_add', { submitForm: (inputList) => {
  api.addNewCard(inputList.title, inputList.url).then((res) => {
    cardSection.renderItems([res]);
    popupTypeAdd.close();
  })
  .catch((err) => console.log(`Возникла ошибка: ${err}`));

  cardSection.isDefault = false;
  
}});

const popupTypeEditAvatar = new PopupWithForm('.popup_type_edit-avatar', { submitForm: (inputList) => {
  userInfo.setUserAvatar(inputList.author, inputList.avatar);
  api.editUserAvatar(inputList.avatar)
  .catch((err) => console.log(`Возникла ошибка: ${err}`));
  popupTypeEditAvatar.close();
} });

const openPopupEdit = () => {
  popupTypeEdit.open();
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

const openPopupEditAvatar = () => {
  popupTypeEditAvatar.open();
  formValidationClassInstanceDict.editAvatar.toggleButtonState();
  formValidationClassInstanceDict.editAvatar.inputListArray.forEach(inputElementPopup => {
    formValidationClassInstanceDict.editAvatar.hideInputError(inputElementPopup);
  });
}

api.getInitialCards()
.then((res) => cardSection.renderItems(res))
.catch((err) => console.log(`Возникла ошибка: ${err}`));

imagePopup.setEventListeners();
popupTypeEdit.setEventListeners();
popupTypeAdd.setEventListeners();
popupTypeEditAvatar.setEventListeners();

profileEditButton.addEventListener('click', openPopupEdit);
profileAddButton.addEventListener('click', openPopupAdd);
profileEditAvatarButton.addEventListener('click', openPopupEditAvatar);