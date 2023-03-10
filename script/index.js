const body = document.querySelector('.body');

const profileEditButton = body.querySelector('.profile__edit-button');
const profileAddButton = body.querySelector('.profile__add-button');

const popup = body.querySelectorAll('.popup');

const popupTypeEdit = body.querySelector('.popup_type_edit');
const popupTypeAdd = body.querySelector('.popup_type_add');

const popupInputTypeName = body.querySelector('.popup__input_type_name');
const popupInputTypeAbout = body.querySelector('.popup__input_type_about');
const popupInputTypeTitle = body.querySelector('.popup__input_type_title');
const popupInputTypeUrl = body.querySelector('.popup__input_type_url');

const profileName = body.querySelector('.profile__name');
const profileAbout = body.querySelector('.profile__about');

const formElement = body.querySelectorAll('.popup__container');
const formElementArray = Array.from(formElement);

const popupExitButton = body.querySelectorAll('.popup__exit-button');
const popupExitButtonArray = Array.from(popupExitButton);

const cardTemplate = body.querySelector('#elements__element').content;
const listElements = body.querySelector('.elements__list');

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

//Добавление карточек

function addCard(title, imageUrl) {
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const imageElement = cardElement.querySelector('.elements__image');
  const titleElement = cardElement.querySelector('.elements__title');

  imageElement.src = imageUrl;
  imageElement.alt = title;
  titleElement.textContent = title;

  listElements.prepend(cardElement);
}

initialCards.reverse().forEach(initialCard => addCard(initialCard.name, initialCard.link));

//Открытие попапа

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function editPopup() {
  openPopup(popupTypeEdit);
  popupInputTypeName.value = profileName.textContent;
  popupInputTypeAbout.value = profileAbout.textContent;
}

function addPopup() {
  openPopup(popupTypeAdd);
  popupInputTypeTitle.value = '';
  popupInputTypeUrl.value = '';
}

profileEditButton.addEventListener('click', editPopup);
profileAddButton.addEventListener('click', addPopup);

//Закрытие попапа

function exitPopup(evt) {
  const targetExit = evt.target.closest('.popup');
  targetExit.classList.remove('popup_opened');
}

popupExitButtonArray.forEach(popupExitButton => popupExitButton.addEventListener('click', exitPopup));

function handleFormSubmit(evt) {
  evt.preventDefault();
  if (evt.target.name === "edit") {
    formSubmitEdit();
  } else if (evt.target.name === "add") {
    formSubmitAdd();
  }
  exitPopup(evt);
}

function formSubmitEdit() {
  profileName.textContent = popupInputTypeName.value;
  profileAbout.textContent = popupInputTypeAbout.value;
}

function formSubmitAdd() {
  addCard(popupInputTypeTitle.value, popupInputTypeUrl.value);
}

formElementArray.forEach(formElement => formElement.addEventListener('submit', handleFormSubmit));

//лайк

const elementsLikeButton = body.querySelectorAll('.elements__like-button');
const elementsLikeButtonArray = Array.from(elementsLikeButton);

elementsLikeButtonArray.forEach(elementsLikeButton => elementsLikeButton.addEventListener('click', addLike));

function addLike(evt) {
  const targetLike = evt.target;
  targetLike.classList.toggle('elements__like-button_active');
}

//удаление карточки

const elementsBasketButton = body.querySelectorAll('.elements__basket');
const elementsBasketButtonArray = Array.from(elementsBasketButton);

elementsBasketButtonArray.forEach(elementsBasketButton => elementsBasketButton.addEventListener('click', deleteCard));

function deleteCard(evt) {
  const targetCardBasket = evt.target.closest('.elements__element');
  targetCardBasket.remove();
}

//Открытие попапа по картинке

const popupTypeImg = body.querySelector('.popup_type_img');
const elementsContainerButton = body.querySelectorAll('.elements__image');
const elementsContainerButtonArray = Array.from(elementsContainerButton);
const popupImage = body.querySelector('.popup__image');
const popupTitle = body.querySelector('.popup__title');


function imgPopup(evt) {
  openPopup(popupTypeImg);
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupTitle.textContent = evt.target.alt;
}

elementsContainerButtonArray.forEach(elementsContainerButton => elementsContainerButton.addEventListener('click', imgPopup));
