export default class Card {
  constructor({_id, name, link, likes, owner}, cardTemplateSelector, myId,
              {handleCardClick, handleDeleteClick, handleLikeClick}) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._likeCounter = likes.length;
    this._myId = myId;
    this._isLiked = likes.some(like => like._id === myId);
    this._isDeletable = owner._id === myId;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  buildElement() {
    this._cardElement = document.querySelector(this._cardTemplateSelector)
      .content.querySelector('.card').cloneNode(true);
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._removeButton = this._cardElement.querySelector('.card__remove-button');
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._likeCounterElement = this._cardElement.querySelector('.card__like-counter');
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._updateLikeCounterElement();
    this._updateLikeButton();
    this._setEventListeners();
    return this._cardElement;
  }

  _updateLikeButton() {
    if (this._isLiked) {
      this._likeButton.classList.add('card__like-button_active');
    } else {
      this._likeButton.classList.remove('card__like-button_active');
    }
  }

  _updateLikeCounterElement() {
    this._likeCounterElement.textContent = this._likeCounter;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._handleCardClick());
    this._likeButton.addEventListener('click', () => this._handleLikeClick());
    if (!this._isDeletable) {
      this._removeButton.remove();
    } else {
      this._removeButton.addEventListener('click', () => this._handleDeleteClick());
    }
  }

  get isLiked() {
    return this._isLiked;
  }

  update({likes}) {
    this._likeCounter = likes.length;
    this._isLiked = likes.some(like => like._id === this._myId);
    this._updateLikeCounterElement();
    this._updateLikeButton();
  }

  remove() {
    this._cardElement.remove();
  }

  get data() {
    return {id: this._id, name: this._name, link: this._link};
  }
}


