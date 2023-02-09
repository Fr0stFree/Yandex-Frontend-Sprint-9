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
const avatarUpdateButton = document.querySelector('.profile__avatar-button');

// Селекторы
const cardListSelector = '.elements__element-list';
const baseCardTemplateSelector = '#card-template';
const cardPopupSelector = '.popup_type_card';
const profilePopupSelector = '.popup_type_profile';
const confirmPopupSelector = '.popup_type_confirm';
const imagePopupSelector = '.popup_type_image';
const avatarPopupSelector = '.popup_type_avatar';
const nameElementSelector = '.profile__name';
const aboutElementSelector = '.profile__description';
const avatarElementSelector = '.profile__avatar';

// Формы
const profileForm = document.querySelector('.popup__profile-form');
const cardForm = document.querySelector('.popup__card-form');
const avatarForm = document.querySelector('.popup__avatar-form');


// Конфиг Практикум-АПИ
const praktikumApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    "Content-Type": "application/json",
    "authorization": "8a10ae20-3876-4243-a54a-b307b1f8ac17"
  }
})

// Попап для увеличения изображения
const imagePopup = new PopupWithImage(imagePopupSelector);

// Попап с формой редактирования данных профиля
const profilePopup = new PopupWithForm(profilePopupSelector, data => {
  profilePopup.renderLoading(true);
  praktikumApi.editUserInfo({name: data.name, about: data.description})
    .then(resp => {
      profile.info = resp;
      profilePopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => profilePopup.renderLoading(false));
});

// Попап с формой создания новой карточки
const cardPopup = new PopupWithForm(cardPopupSelector, data => {
  cardPopup.renderLoading(true);
  praktikumApi.addCard({name: data.place, link: data.link})
    .then(resp => {
      cardSection.addItem(resp);
      cardPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => cardPopup.renderLoading(false));
});

// Попап для подтверждения удаления карточки
const confirmPopup = new PopupWithConfirmation(confirmPopupSelector, id => {
  confirmPopup.renderLoading(true);
  praktikumApi.deleteCard(id)
    .then(() => {
      cardSection.removeItem(id);
      confirmPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => confirmPopup.renderLoading(false));
});

// Попап для редактирования аватара
const avatarPopup = new PopupWithForm(avatarPopupSelector, data => {
  avatarPopup.renderLoading(true);
  praktikumApi.updateUserAvatar(data)
    .then(resp => {
      profile.info = resp;
      avatarPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => avatarPopup.renderLoading(false));
});

// Функция создания экземпляра карточки
const createCard = data => {
  const card = new Card(data, baseCardTemplateSelector, profile.info.id, {
    handleCardClick: () => imagePopup.open(card.data),
    handleDeleteClick: () => confirmPopup.open(card.data),
    handleLikeClick: () => {
      if (card.isLiked) {
        praktikumApi.dislikeCard(card.data)
          .then(resp => card.update(resp))
          .catch(err => console.log(err));
      } else {
        praktikumApi.likeCard(card.data)
          .then(resp => card.update(resp))
          .catch(err => console.log(err));
      }
    }
  });
  return card;
}

// Загрузка и рендеринг изначальных карточек
const cardSection = new Section({renderer: card => createCard(card).buildElement()}, cardListSelector);
praktikumApi.getInitialCards()
  .then(cards => {
    cardSection.items = cards;
    cardSection.renderItems();
  })
  .catch(err => console.log(err));

// Загрузка и рендеринг данных профиля
const profile = new UserInfo({nameElementSelector, aboutElementSelector, avatarElementSelector});
praktikumApi.getUserInfo()
  .then(data => profile.info = data)
  .catch(err => console.log(err));

// Установка слушателей на попапы и кнопки
[profilePopup, cardPopup, imagePopup, confirmPopup, avatarPopup].forEach(popup => popup.setEventListeners());
avatarUpdateButton.addEventListener('click', () => {
  avatarPopup.open();
});
cardAddButton.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  cardPopup.open();
});
profileEditButton.addEventListener('click', () => {
  const {name, about} = profile.info;
  profileFormValidator.resetValidation();
  profilePopup.prefillForm({name: name, description: about})
  profilePopup.open();
});

// Валидация форм
const validationConfig = {
  submitButtonSelector: '.popup__input_type_submit',
  inputErrorClass: 'popup__input_type_error',
  inactiveButtonClass: 'popup__input_type_submit-disabled',
  errorClass: 'popup__input-error_active'
};
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
const profileFormValidator = new FormValidator(validationConfig, profileForm);
const cardFormValidator = new FormValidator(validationConfig, cardForm);
[profileFormValidator, cardFormValidator, avatarFormValidator].forEach(validator => validator.enableValidation());

