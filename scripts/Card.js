export default class Card {
  constructor(title, imageUrl, templateSelector) {
    this._title = title;
    this._imageUrl = imageUrl;
    this._templateSelector = templateSelector;
  }

  //Получение шаблона

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);

    return cardElement;
  }

  //Публичный метод создания карточки

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.elements__image');
    this._setEventListeners();

    this._elementImage.src = this._imageUrl;
    this._elementImage.alt = this._title;
    this._element.querySelector('.elements__title').textContent = this._title;

    return this._element;
  }

  //Навешивание слушателей на карточку

  _setEventListeners() {
    this._element.querySelector('.elements__like-button').addEventListener('click', this._addLike);
    this._element.querySelector('.elements__basket-button').addEventListener('click', this._deleteCard);
    this._elementImage.addEventListener('click', () => this._imgPopup());
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

  _imgPopup() {
    const popupTypeImg = document.querySelector('.popup_type_img');
    const popupImage = popupTypeImg.querySelector('.popup__image');
    const popupTitle = popupTypeImg.querySelector('.popup__title');

    popupTypeImg.classList.add('popup_opened');
    document.addEventListener('keyup', this._exitPopupByPressEscape);
    popupImage.src = this._imageUrl;
    popupImage.alt = this._title;
    popupTitle.textContent = this._title;
  }

  _exitPopupByPressEscape(evt) {
    if (evt.key === 'Escape') {
      document.querySelector('.popup_opened').classList.remove('popup_opened');
      document.removeEventListener('keyup', this._exitPopupByPressEscape);
    }
  }
}
