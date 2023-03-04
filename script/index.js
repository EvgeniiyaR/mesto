let body = document.querySelector('.body');
let profileEditButton = body.querySelector('.profile__edit-button');
let popup = body.querySelector('.popup');
let popupInputTypeName = body.querySelector('.popup__input_type_name');
let popupInputTypeAbout = body.querySelector('.popup__input_type_about');
let profileName = body.querySelector('.profile__name');
let profileAbout = body.querySelector('.profile__about');
let formElement = body.querySelector('.popup__container');
let popupExitButton = body.querySelector('.popup__exit-button');

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
