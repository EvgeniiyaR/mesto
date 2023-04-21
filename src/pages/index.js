import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import { api } from '../components/Api.js';
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

const userInfo = new UserInfo('.profile__name', '.profile__about', '.profile__avatar');

api.getUserInfo()
.then((res) => {
  userInfo.setUserInfo(res.name, res.about);
  userInfo.setUserAvatar(res.name, res.avatar);
  userInfo.setUserId(res._id);
})
.catch((err) => console.log(`Возникла ошибка: ${err}`));

api.getInitialCards()
.then((res) => cardSection.renderItems(res))
.catch((err) => console.log(`Возникла ошибка: ${err}`));

const imagePopup = new PopupWithImage('.popup_type_img');

const deletePopup = new PopupWithConfirmation('.popup_type_delete');

const renderer = (initialCard, isDefault) => {
  const card = new Card(initialCard, '#elements__element', { 
    handleCardClick: (title, url) => {
      imagePopup.open(title, url);
    }, 
    handleDeleteCardClick: (id, owner) => {
      deletePopup.open();
      deletePopup.submitForm({ submitForm: () => {
        if (userInfo.getUserId() === owner._id) {
          api.deleteCard(id)
          .then(() => {
            card.deleteCard();
            deletePopup.close();
          })
          .catch((err) => console.log(`Возникла ошибка: ${err}`));
        }
      }});
    },
    handleLikeClick: (id) => {
      if (!card.isLike) {
        api.addLikeCard(id)
        .then(() => card.isLike = true)
        .catch((err) => console.log(`Возникла ошибка: ${err}`));
      } else {
        api.deleteLikeCard(id)
        .then(() => card.isLike = false)
        .catch((err) => console.log(`Возникла ошибка: ${err}`));
      }
    }
  }); 
  if (card.likesCount >= 1) {
    card.likesList.forEach(element => {
      if (element._id === userInfo.getUserId()) {
        card.isLike = true;
      }
    });
  }
  if (userInfo.getUserId() === card.owner._id) {
    card.isBasket = true;
  }
  const cardElement = card.generateCard();
  isDefault ? cardSection.addItems(cardElement) : cardSection.addItem(cardElement);
}

const cardSection = new Section({ renderer }, '.elements__list');

const popupTypeEdit = new PopupWithForm('.popup_type_edit', { submitForm: (inputList) => {
  userInfo.setUserInfo(inputList.author, inputList.about);
  popupTypeEdit.renderLoading('Сохранение...');
  api.editUserInfo(inputList.author, inputList.about)
  .catch((err) => console.log(`Возникла ошибка: ${err}`))
  .finally(() => popupTypeEdit.close());
} });

const popupTypeAdd = new PopupWithForm('.popup_type_add', { submitForm: (inputList) => {
  popupTypeAdd.renderLoading('Загрузка...');
  api.addNewCard(inputList.title, inputList.url)
  .then((res) => cardSection.renderItems([res]))
  .catch((err) => console.log(`Возникла ошибка: ${err}`))
  .finally(() => popupTypeAdd.close());
  
  cardSection.isDefault = false;

}});

const popupTypeEditAvatar = new PopupWithForm('.popup_type_edit-avatar', { submitForm: (inputList) => {
  userInfo.setUserAvatar(inputList.author, inputList.avatar);
  popupTypeEditAvatar.renderLoading('Сохранение...');
  api.editUserAvatar(inputList.avatar)
  .catch((err) => console.log(`Возникла ошибка: ${err}`))
  .finally(() => popupTypeEditAvatar.close());
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

imagePopup.setEventListeners();
deletePopup.setEventListeners();
popupTypeEdit.setEventListeners();
popupTypeAdd.setEventListeners();
popupTypeEditAvatar.setEventListeners();

profileEditButton.addEventListener('click', openPopupEdit);
profileAddButton.addEventListener('click', openPopupAdd);
profileEditAvatarButton.addEventListener('click', openPopupEditAvatar);