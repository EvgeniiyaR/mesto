export default class Card {
  constructor(initialCard, templateSelector, { handleCardClick, handleDeleteCardClick, handleLikeClick }) {
    this._title = initialCard.name;
    this._imageUrl = initialCard.link;
    this._id = initialCard._id;
    this.owner = initialCard.owner;
    this.likesList = initialCard.likes;
    this.likesCount = initialCard.likes.length;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteCardClick = handleDeleteCardClick;

    this.islike = false;
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
    this._elementBasket = this._element.querySelector('.elements__basket-button');
    this._elementLike = this._element.querySelector('.elements__like-button');
    this._elementLikesCount = this._element.querySelector('.elements__like-count');
    this._element.querySelector('.elements__title').textContent = this._title; 
    this._elementImage.src = this._imageUrl;
    this._elementImage.alt = this._title;
    this._elementLikesCount.textContent = this.likesCount;

    if (this.isLike) {
      this._elementLike.classList.add('elements__like-button_active');
    }
    if (!this.isBasket) {
      this._elementBasket.classList.add('elements__basket-button_hidden');
    }

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', (evt) => {
      if (this._elementLike.classList.contains('elements__like-button_active')) {
        this._deleteLike(evt);
        this.likesCount -= 1;
      } else {
        this._addLike(evt);
        this.likesCount += 1;
      } 
      this._elementLikesCount.textContent = this.likesCount;
      this._handleLikeClick(this._id);
    });

    this._elementBasket.addEventListener('click', (evt) => {
      this._handleDeleteCardClick(this._id, this.owner);
      this._getCard(evt);
    });

    this._elementImage.addEventListener('click', () => this._handleCardClick(this._title, this._imageUrl));
  }

  _addLike(evt) {
    evt.target.classList.add('elements__like-button_active');
  }

  _deleteLike(evt) {
    evt.target.classList.remove('elements__like-button_active');
  }

  _getCard(evt) {
    this.getCard = evt.target.closest('.elements__element');
  }

  deleteCard() {
    this.getCard.remove();
  } 
}
