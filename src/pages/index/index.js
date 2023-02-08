import Card from '../../components/Card.js';
import FormValidator from '../../components/Validator.js';
import Section from '../../components/Section.js';
import PopupWithForm from '../../components/PopupWithForm.js';
import PopupWithImage from '../../components/PopupWithImage.js';
import PopupWithConfirmation from "../../components/PopupWithConfirmation";
import UserInfo from '../../components/UserInfo.js';
import Api from '../../components/Api.js';
import './index.css';


// Кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');


// Селекторы
const cardListSelector = '.elements__element-list';
const baseCardTemplateSelector = '#card-template';
const cardPopupSelector = '.popup_type_card';
const profilePopupSelector = '.popup_type_profile';
const confirmPopupSelector = '.popup_type_confirm';
const nameElementSelector = '.profile__name';
const aboutElementSelector = '.profile__description';
const avatarElementSelector = '.profile__avatar';
const imagePopupSelector = '.popup_type_image';

// Элементы
const profileNameInputElement = document.querySelector('.popup__input_type_name');
const profileDescriptionInputElement = document.querySelector('.popup__input_type_description');

// Формы
const profileForm = document.querySelector('.popup__profile-form');
const cardForm = document.querySelector('.popup__card-form');

// Конфиг валидации
const validationConfig = {
  submitButtonSelector: '.popup__input_type_submit',
  inputErrorClass: 'popup__input_type_error',
  inactiveButtonClass: 'popup__input_type_submit-disabled',
  errorClass: 'popup__input-error_active'
};

const praktikumApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    "Content-Type": "application/json",
    "authorization": "8a10ae20-3876-4243-a54a-b307b1f8ac17"
  }
})

// Класс для работы с полями пользователя
const profile = new UserInfo({nameElementSelector, aboutElementSelector, avatarElementSelector});

const cardLikeClickHandler = card => {
  if (card.isLiked) {
    praktikumApi.dislikeCard(card.data)
      .then(() => card.dislike())
      .catch(err => console.log(err));
  } else {
    praktikumApi.likeCard(card.data)
      .then(() => card.like())
      .catch(err => console.log(err));
  }
}

const cardDeleteClickHandler = card => {
  const confirmPopup = new PopupWithConfirmation(confirmPopupSelector, card.data, () => {
    // confirmPopup.renderLoading(true);
    cardSection.removeItem(card);
    // praktikumApi.deleteCard(card.data)
    //   .then(() => {
    //     cardSection.removeItem(card);
    //     confirmPopup.close();
    //   })
    //   .catch(err => console.log(err));
      // .finally(() => confirmPopup.renderLoading(false));
  });
  confirmPopup.setEventListeners();
  confirmPopup.open();
}


// Функция создания экземпляра карточки
const createCard = data => {
  const is_deletable = data.owner._id === profile.info.id;
  const card = new Card(data, baseCardTemplateSelector, is_deletable, {
    handleCardClick: () => imagePopup.open(card.data),
    handleLikeClick: () => cardLikeClickHandler(card),
    handleDeleteClick: () => cardDeleteClickHandler(card)
  });
  return card;
}

// Попап для увеличения изображения
const imagePopup = new PopupWithImage(imagePopupSelector);

// Секция с карточками
const cardSection = new Section(
  {
    items: [],
    renderer: item => this.addItem(createCard(item).buildElement())
  },
  cardListSelector
);

// Попап с формой редактирования данных профиля
const profilePopup = new PopupWithForm(profilePopupSelector, data => {
  profilePopup.renderLoading(true);
  praktikumApi.editUserInfo({name: data.name, about: data.description})
    .then(resp => {
      profile.setInfo(resp);
      profilePopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => profilePopup.renderLoading(false));
});

// Валидаторы
const profileFormValidator = new FormValidator(validationConfig, profileForm);
const cardFormValidator = new FormValidator(validationConfig, cardForm);

// Попап с формой создания новой карточки
const cardPopup = new PopupWithForm(cardPopupSelector, data => {
  praktikumApi.addCard({name: data.place, link: data.link})
  .then(resp => {
    cardSection.addItem(createCard(resp).buildElement());
    cardPopup.close();
  })
  .catch(err => console.log(err));

});

// Загрузка и рендеринг изначальных карточек
praktikumApi.getInitialCards()
  .then(cards => cards.forEach(card => cardSection.addItem(createCard(card).buildElement())))
  .catch(err => console.log(err));

// Загрузка и рендеринг данных профиля
praktikumApi.getUserInfo()
  .then(data => profile.setInfo(data))
  .catch(err => console.log(err));


// Установка слушателей на попапы и кнопки
[profilePopup, cardPopup, imagePopup].forEach(popup => popup.setEventListeners());
cardAddButton.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  cardPopup.open();
})
profileEditButton.addEventListener('click', () => {
  const {name, about} = profile.info;
  profileNameInputElement.value = name;
  profileDescriptionInputElement.value = about;
  profileFormValidator.resetValidation();
  profilePopup.open();
});

// Активация валидации форм
[profileFormValidator, cardFormValidator].forEach(validator => validator.enableValidation());
