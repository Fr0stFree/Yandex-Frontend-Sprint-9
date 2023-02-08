export default class Card {
  constructor({_id, name, link, likes, owner}, cardTemplateSelector, is_deletable,
              {handleCardClick, handleDeleteClick, handleLikeClick}) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._is_deletable = is_deletable;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  buildElement() {
    this._cardElement = document.querySelector(this._cardTemplateSelector)
      .content.cloneNode(true);
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._removeButton = this._cardElement.querySelector('.card__remove-button');
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._handleCardClick());
    this._likeButton.addEventListener('click', () => this._handleLikeClick());
    if (!this._is_deletable) {
      this._removeButton.remove();
    } else {
      this._removeButton.addEventListener('click', () => this._handleDeleteClick());
    }

  }

  get isLiked() {
    return this._likes.some(users => users._id === this._owner._id);
  }

  like() {
    this._likeButton.classList.add('card__like-button_active');
    this._likes.push(this._owner);
  }

  dislike() {
    this._likeButton.classList.remove('card__like-button_active');
    this._likes = this._likes.filter(users => users._id !== this._owner._id)
  }

  get data() {
    return {id: this._id, name: this._name, link: this._link};
  }
}


