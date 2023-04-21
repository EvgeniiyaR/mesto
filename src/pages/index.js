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
  profileEditAvatarButton
} from '../utils/constants.js';

formListArray.forEach(formElement => {
  const form = new FormValidator(validationConfig, formElement);
  formValidationClassInstanceDict[form.formElement.name] = form;
  form.enableValidation();
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, initialCards]) => {
  userInfo.setUserInfo(userData.name, userData.about);
  userInfo.setUserAvatar(userData.name, userData.avatar);
  userInfo.setUserId(userData._id);
  cardSection.renderItems(initialCards);
})
.catch((err) => console.log(`Возникла ошибка: ${err}`));

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
        .then((res) => {
          card.isLike = true;
          card.addLike();
          card.elementLikesCount.textContent = res.likes.length;
        })
        .catch((err) => console.log(`Возникла ошибка: ${err}`));
      } else {
        api.deleteLikeCard(id)
        .then((res) => {
          card.isLike = false;
          card.deleteLike();
          card.elementLikesCount.textContent = res.likes.length;
        })
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

const userInfo = new UserInfo('.profile__name', '.profile__about', '.profile__avatar');

const cardSection = new Section({ renderer }, '.elements__list');

const imagePopup = new PopupWithImage('.popup_type_img');

const deletePopup = new PopupWithConfirmation('.popup_type_delete');

const popupTypeEdit = new PopupWithForm('.popup_type_edit', { submitForm: (inputList) => {
  
  return api.editUserInfo(inputList.author, inputList.about)
  .then(() => userInfo.setUserInfo(inputList.author, inputList.about))
  .catch((err) => console.log(`Возникла ошибка: ${err}`))

} });

const popupTypeAdd = new PopupWithForm('.popup_type_add', { submitForm: (inputList) => {

  cardSection.isDefault = false;
  return api.addNewCard(inputList.title, inputList.url)
  .then((res) => cardSection.renderItems([res]))
  .catch((err) => console.log(`Возникла ошибка: ${err}`))

}});

const popupTypeEditAvatar = new PopupWithForm('.popup_type_edit-avatar', { submitForm: (inputList) => {

  return api.editUserAvatar(inputList.avatar)
  .then(() => userInfo.setUserAvatar(inputList.author, inputList.avatar))
  .catch((err) => console.log(`Возникла ошибка: ${err}`))

} });

const openPopupEdit = () => {
  popupTypeEdit.open();
  const infoEdit = userInfo.getUserInfo();
  popupTypeEdit.setInputValues(infoEdit);
  formValidationClassInstanceDict.edit.resetValidation();
}

const openPopupAdd = () => {
  popupTypeAdd.open();
  formValidationClassInstanceDict.add.resetValidation();
}

const openPopupEditAvatar = () => {
  popupTypeEditAvatar.open();
  formValidationClassInstanceDict.editAvatar.resetValidation();
}

imagePopup.setEventListeners();
deletePopup.setEventListeners();
popupTypeEdit.setEventListeners();
popupTypeAdd.setEventListeners();
popupTypeEditAvatar.setEventListeners();

profileEditButton.addEventListener('click', openPopupEdit);
profileAddButton.addEventListener('click', openPopupAdd);
profileEditAvatarButton.addEventListener('click', openPopupEditAvatar);