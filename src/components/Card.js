export default class Card {
  constructor(initialCard, templateSelector, { handleCardClick, handleDeleteCardClick }) {
    this._title = initialCard.name;
    this._imageUrl = initialCard.link;
    this.id = initialCard._id;
    this.owner = initialCard.owner;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    // this._handleLikeClick = handleLikeClick;
    this._handleDeleteCardClick = handleDeleteCardClick;

    this.isBasket = false;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._elementImage = this._element.querySelector('.elements__image');
    this._elementImage.src = this._imageUrl;
    this._elementImage.alt = this._title;
    this._element.querySelector('.elements__title').textContent = this._title;
    if (!this.isBasket) {
      this._element.querySelector('.elements__basket-button').classList.add('elements__basket-button_hidden');
    }
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.elements__like-button').addEventListener('click', this._addLike);
    this._element.querySelector('.elements__basket-button').addEventListener('click', (evt) => {
      this._handleDeleteCardClick(this.id, this.owner);
      this._getCard(evt);
    });
    this._elementImage.addEventListener('click', () => this._handleCardClick(this._title, this._imageUrl));
  }

  _addLike(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  }

  _getCard(evt) {
    this.getCard = evt.target.closest('.elements__element');
  }

  deleteCard() {
    this.getCard.remove();
  } 
}
