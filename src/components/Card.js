export default class Card {
  constructor(title, imageUrl, templateSelector, { handleCardClick }) {
    this._title = title;
    this._imageUrl = imageUrl;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._elementImage.src = this._imageUrl;
    this._elementImage.alt = this._title;
    this._element.querySelector('.elements__title').textContent = this._title;

    this._setEventListeners();

    return this._element;
  }

  //Навешивание слушателей на карточку

  _setEventListeners() {
    this._element.querySelector('.elements__like-button').addEventListener('click', this._addLike);
    this._element.querySelector('.elements__basket-button').addEventListener('click', this._deleteCard);
    this._elementImage.addEventListener('click', () => this._handleCardClick(this._title, this._imageUrl));
  }

  //Лайк

  _addLike(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  }

  //Удаление карточки

  _deleteCard(evt) {
    evt.target.closest('.elements__element').remove();
  }
}
