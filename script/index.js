let body = document.querySelector('.body');
let profileEditButton = body.querySelector('.profile__edit-button');
let popup = body.querySelector('.popup');
let popupInputTypeName = body.querySelector('.popup__input_type_name');
let popupInputTypeAbout = body.querySelector('.popup__input_type_about');
let profileName = body.querySelector('.profile__name');
let profileAbout = body.querySelector('.profile__about');
let formElement = body.querySelector('.popup__container');
let popupExitButton = body.querySelector('.popup__exit-button');
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

initialCards.forEach((item) => addCard(item.name, item.link));

function addCard(title, imageUrl) {
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const imageElement = cardElement.querySelector('.elements__image');
  const titleElement = cardElement.querySelector('.elements__title');

  imageElement.src = imageUrl;
  imageElement.alt = title;
  titleElement.textContent = title;

  listElements.append(cardElement);
}

function openPopup() {
  popup.classList.add('popup_opened');
  popupInputTypeName.value = profileName.textContent;
  popupInputTypeAbout.value = profileAbout.textContent;
}

profileEditButton.addEventListener('click', openPopup);

function exitPopup() {
  popup.classList.remove('popup_opened');
}

popupExitButton.addEventListener('click', exitPopup);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputTypeName.value;
  profileAbout.textContent = popupInputTypeAbout.value;
  exitPopup();
}

formElement.addEventListener('submit', handleFormSubmit);
