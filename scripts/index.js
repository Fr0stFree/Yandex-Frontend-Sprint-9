const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_profile');
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');
const profileNameInputElement = profilePopup.querySelector('.popup__input_type_name');
const profileDescriptionInputElement = profilePopup.querySelector('.popup__input_type_description');

const cardAddButton = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.popup_type_card');
const cardPlaceInputElement = cardPopup.querySelector('.popup__input_type_place');
const cardLinkInputElement = cardPopup.querySelector('.popup__input_type_link');
const cardList = document.querySelector('.elements__element-list');
const cardTemplate = document.querySelector('#card-template');

const imagePopup = document.querySelector('.popup_type_image');
const imageZoomedLinkElement = imagePopup.querySelector('.popup__image');
const imageZoomedCaptionElement = imagePopup.querySelector('.popup__image-caption');


// Функция cоздания экземпляра карточки
const createCard = (title, link) => {
  const cardElement = cardTemplate.cloneNode(true).content;
  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image')
             .addEventListener('click', () => {
                imageZoomedLinkElement.src = link;
                imageZoomedCaptionElement.textContent = title;
                openPopup(imagePopup);
             });
  cardElement.querySelector('.card__remove-button')
             .addEventListener('click', evt => evt.target.closest('.elements__element').remove());
  cardElement.querySelector('.card__like-button')
             .addEventListener('click', evt => evt.target.classList.toggle('card__like-button_active'));
  return cardElement;
};

// Функция рендеринга карточки в DOM
const renderCard = (instance, append=true) => append ? cardList.append(instance) : cardList.prepend(instance);

// Функции открытия/закрытия попапов
const openPopup = popup => popup.classList.add('popup_opened');
const closePopup = popup => popup.classList.remove('popup_opened');

// Слушатели события на кнопки закрытия попапов
document.querySelectorAll('.popup__close-button')
        .forEach(button => button.addEventListener('click', evt => closePopup(evt.target.closest('.popup'))));

// Слушатель события на кнопку открытия формы создания новой карточки
cardAddButton.addEventListener('click', () => openPopup(cardPopup));

// Слушатель события на кнопку редактирования данных профиля
profileEditButton.addEventListener('click', () => {
  profileNameInputElement.value = profileNameElement.textContent;
  profileDescriptionInputElement.value = profileDescriptionElement.textContent;
  openPopup(profilePopup);
});

// Слушатель события на кнопку сохранения данных профиля
profilePopup.addEventListener('submit', evt => {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInputElement.value;
  profileDescriptionElement.textContent = profileDescriptionInputElement.value;
  closePopup(profilePopup);
});

// Слушатель события на кнопку сохранения новой карточки
cardPopup.addEventListener('submit', evt => {
  evt.preventDefault();
  const cardTitle = cardPlaceInputElement.value;
  const cardLink = cardLinkInputElement.value;
  renderCard(createCard(cardTitle, cardLink), false);
  closePopup(cardPopup);
});

// Рендеринг исходных карточек
initialCards.forEach(card => renderCard(createCard(card.name, card.link)));