const body = document.querySelector('.body');

const profileName = body.querySelector('.profile__name');
const profileAbout = body.querySelector('.profile__about');

const profileEditButton = body.querySelector('.profile__edit-button');
const profileAddButton = body.querySelector('.profile__add-button');

const cardTemplate = body.querySelector('#elements__element').content;
const elementsList = body.querySelector('.elements__list');

const popupTypeEdit = body.querySelector('.popup_type_edit');
const popupTypeAdd = body.querySelector('.popup_type_add');
const popupTypeImg = body.querySelector('.popup_type_img');

const formElementEdit = popupTypeEdit.querySelector('.popup__container');
const formElementAdd = popupTypeAdd.querySelector('.popup__container');

const popupExitButtons = body.querySelectorAll('.popup__exit-button');
const popupExitButtonArray = Array.from(popupExitButtons);

const popupInputTypeName = popupTypeEdit.querySelector('.popup__input_type_name');
const popupInputTypeAbout = popupTypeEdit.querySelector('.popup__input_type_about');
const popupInputTypeTitle = popupTypeAdd.querySelector('.popup__input_type_title');
const popupInputTypeUrl = popupTypeAdd.querySelector('.popup__input_type_url');

const popupImage = popupTypeImg.querySelector('.popup__image');
const popupTitle = popupTypeImg.querySelector('.popup__title');

//Добавление карточки

function addCard(title, imageUrl) {
  elementsList.prepend(createCard(title, imageUrl));
}

//Создание карточки

function createCard(title, imageUrl) {
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const imageElement = cardElement.querySelector('.elements__image');
  const titleElement = cardElement.querySelector('.elements__title');
  const buttonLikeElement = cardElement.querySelector('.elements__like-button');
  const buttonBasketElement = cardElement.querySelector('.elements__basket');

  imageElement.src = imageUrl;
  imageElement.alt = title;
  titleElement.textContent = title;

  buttonLikeElement.addEventListener('click', addLike);
  buttonBasketElement.addEventListener('click', deleteCard);
  imageElement.addEventListener('click', () => imgPopup(title, imageUrl));

  return cardElement;
}

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

//Закрытие попапа

function exitPopup(popupExit) {
  const targetExit = popupExit.closest('.popup');
  targetExit.classList.remove('popup_opened');
}

//Заполнение формы с редактированием профиля

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputTypeName.value;
  profileAbout.textContent = popupInputTypeAbout.value;
  exitPopup(popupTypeEdit);
}

//Заполнение формы для добавления картинки

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  addCard(popupInputTypeTitle.value, popupInputTypeUrl.value);
  exitPopup(popupTypeAdd);
  evt.target.reset();
}

//Лайк

function addLike(evt) {
  const targetLike = evt.target;
  targetLike.classList.toggle('elements__like-button_active');
}

//Удаление карточки

function deleteCard(evt) {
  const targetCardBasket = evt.target.closest('.elements__element');
  targetCardBasket.remove();
}

//Открытие попапа по картинке

function imgPopup(title, imageUrl) {
  openPopup(popupTypeImg);
  popupImage.src = imageUrl;
  popupImage.alt = title;
  popupTitle.textContent = title;
}

initialCards.reverse().forEach(initialCard => addCard(initialCard.name, initialCard.link));

profileEditButton.addEventListener('click', editPopup);
profileAddButton.addEventListener('click', addPopup);

popupExitButtonArray.forEach(popupExitButton => popupExitButton.addEventListener('click', () => exitPopup(popupExitButton)));

formElementEdit.addEventListener('submit', handleFormSubmitEdit);
formElementAdd.addEventListener('submit', handleFormSubmitAdd);

enableValidation();
