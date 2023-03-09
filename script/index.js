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

const formElement = body.querySelector('.popup__container');
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

  listElements.append(cardElement);
}

initialCards.forEach((item) => addCard(item.name, item.link));

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
}

profileEditButton.addEventListener('click', editPopup);
profileAddButton.addEventListener('click', addPopup);

function exitPopup(evt) {
  const target = evt.target.closest('.popup');
  target.classList.remove('popup_opened');
}

//Закрытие попапа

popupExitButtonArray.forEach(item => item.addEventListener('click', exitPopup));

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputTypeName.value;
  profileAbout.textContent = popupInputTypeAbout.value;
  exitPopup(evt);
}

formElement.addEventListener('submit', handleFormSubmit);
