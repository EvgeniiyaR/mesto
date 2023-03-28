import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const dataPopupClasses = {
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

function editPopup(dataPopupClasses) {
  openPopup(popupTypeEdit);
  popupInputTypeName.value = profileName.textContent;
  popupInputTypeAbout.value = profileAbout.textContent;
  resetValidateForEditPopup(dataPopupClasses, popupTypeEdit);
}

function addPopup(dataPopupClasses) {
  openPopup(popupTypeAdd);
  const form = new FormValidator(dataPopupClasses, popupTypeAdd.querySelector(dataPopupClasses.formSelector));
  form.enableValidation();
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

function handleFormSubmitAdd(evt, ) {
  evt.preventDefault();
  addCard(popupInputTypeTitle.value, popupInputTypeUrl.value, '#elements__element');
  closePopup(popupTypeAdd);
  evt.target.reset();
}

//Сбрасывание ошибок валидации при повторном открытии редактирования профиля

function resetValidateForEditPopup(dataPopupClasses, popupEdit) {
  const formElementPopupEdit = popupEdit.querySelector(dataPopupClasses.formSelector);
  const inputListPopupEdit = formElementPopupEdit.querySelectorAll(dataPopupClasses.inputSelector);
  const inputListArrayPopupEdit = Array.from(inputListPopupEdit);
  inputListArrayPopupEdit.forEach(inputElementPopupEdit => {
    const errorElement = formElementPopupEdit.querySelector(`.${inputElementPopupEdit.id}-error`);
    inputElementPopupEdit.classList.remove(dataPopupClasses.inputErrorClass);
    errorElement.classList.remove(dataPopupClasses.errorClass);
    errorElement.textContent = '';
  });
}

function validateForm(dataPopupClasses) {
  const formList = document.querySelectorAll(dataPopupClasses.formSelector);
  const formListArray = Array.from(formList);

  formListArray.forEach(formElement => {
    const form = new FormValidator(dataPopupClasses, formElement);
    const formElementValidated = form.enableValidation();

    return formElementValidated;
  });
}

initialCards.reverse().forEach(initialCard => addCard(initialCard.name, initialCard.link, '#elements__element'));

profileEditButton.addEventListener('click', () => editPopup(dataPopupClasses));
profileAddButton.addEventListener('click', () => addPopup(dataPopupClasses));

popupExitButtonArray.forEach(popupExitButton => popupExitButton.addEventListener('click', () => exitPopupByClickButton(popupExitButton)));

formElementEdit.addEventListener('submit', handleFormSubmitEdit);
formElementAdd.addEventListener('submit', handleFormSubmitAdd);

popupArray.forEach(popup => popup.addEventListener('mousedown', exitPopupByClickOverlay));

validateForm(dataPopupClasses);
