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

function addCard(title, imageUrl, templateSelector) {
  const card = new Card(title, imageUrl, templateSelector);
  const cardElement = card.generateCard();

  elementsList.prepend(cardElement);
}

//Создание карточки

class Card {
  constructor(title, imageUrl, templateSelector) {
    this._title = title;
    this._imageUrl = imageUrl;
    this._templateSelector = templateSelector;
  }

  //Получение шаблона

  _getTemplate() {
    const cardElement = body
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);

    return cardElement;
  }

  //Публичный метод создания карточки

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.elements__image').src = this._imageUrl;
    this._element.querySelector('.elements__image').alt = this._title;
    this._element.querySelector('.elements__title').textContent = this._title;

    return this._element;
  }

  //Навешивание слушателей на карточку

  _setEventListeners() {
    this._element.querySelector('.elements__like-button').addEventListener('click', this._addLike);
    this._element.querySelector('.elements__basket-button').addEventListener('click', this._deleteCard);
    this._element.querySelector('.elements__image').addEventListener('click', () => this._imgPopup(this._title, this._imageUrl));
  }

  //Лайк

  _addLike(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  }

  //Удаление карточки

  _deleteCard(evt) {
    evt.target.closest('.elements__element').remove();
  }

  //Открытие попапа по картинке

  _imgPopup(title, imageUrl) {
    openPopup(popupTypeImg);
    popupImage.src = imageUrl;
    popupImage.alt = title;
    popupTitle.textContent = title;
  }

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
  const inputListAddPopup = popupTypeAdd.querySelectorAll(dataPopupClasses.inputSelector);
  const inputListArrayAddPopup = Array.from(inputListAddPopup);
  const buttonElementAddPopup = popupTypeAdd.querySelector(dataPopupClasses.submitButtonSelector);
  toggleButtonState(dataPopupClasses, inputListArrayAddPopup, buttonElementAddPopup);
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

//Сбрасывание ошибок валидации при повторном открытии редактирования профиля, если до этого его уже открывали, некорректно редактировали и потом закрыли

function resetValidateForEditPopup(dataPopupClasses, popupEdit) {
  const formElementPopupEdit = popupEdit.querySelector(dataPopupClasses.formSelector);
  const inputListPopupEdit = formElementPopupEdit.querySelectorAll(dataPopupClasses.inputSelector);
  const inputListArrayPopupEdit = Array.from(inputListPopupEdit);
  inputListArrayPopupEdit.forEach(inputElementPopupEdit => hideInputError(dataPopupClasses, formElementPopupEdit, inputElementPopupEdit));
}

initialCards.reverse().forEach(initialCard => addCard(initialCard.name, initialCard.link, '#elements__element'));

profileEditButton.addEventListener('click', () => editPopup(dataPopupClasses));
profileAddButton.addEventListener('click', () => addPopup(dataPopupClasses));

popupExitButtonArray.forEach(popupExitButton => popupExitButton.addEventListener('click', () => exitPopupByClickButton(popupExitButton)));

formElementEdit.addEventListener('submit', handleFormSubmitEdit);
formElementAdd.addEventListener('submit', handleFormSubmitAdd);

popupArray.forEach(popup => popup.addEventListener('mousedown', exitPopupByClickOverlay));
