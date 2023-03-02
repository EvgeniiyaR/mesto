let body = document.querySelector('.body');
let profileEditButton = body.querySelector('.profile__edit-button');
let popup = body.querySelector('.popup');

profileEditButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
})

let popupExitButton = body.querySelector('.popup__exit-button');

popupExitButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
})

let popupInput = body.querySelectorAll('.popup__input');
let profileName = body.querySelector('.profile__name');
let profileAbout = body.querySelector('.profile__about');

popupInput[0].value = profileName.textContent;
popupInput[1].value = profileAbout.textContent;

let formElement = body.querySelector('.popup__container');

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = popupInput[0].value;
  profileAbout.textContent = popupInput[1].value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);
