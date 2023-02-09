import {
  profilePopupSelector, cardPopupSelector, confirmPopupSelector,
  avatarPopupSelector, baseCardTemplateSelector, cardListSelector, nameElementSelector,
  aboutElementSelector, avatarElementSelector, avatarUpdateButton,
  profileEditButton, cardAddButton,
  imagePopupSelector
} from './utils/constants.js';
import {avatarFormValidator, profileFormValidator, cardFormValidator} from './utils/validators.js';
import {praktikumApi} from './utils/priktikumApi.js';
import Card from '../../components/Card.js';
import Section from '../../components/Section.js';
import PopupWithForm from '../../components/PopupWithForm.js';
import PopupWithConfirmation from "../../components/PopupWithConfirmation";
import UserInfo from '../../components/UserInfo.js';
import PopupWithImage from "../../components/PopupWithImage";
import './index.css';


// Секция с карточками
const cardSection = new Section({renderer: card => createCard(card).buildElement()}, cardListSelector);

// Класс профиля
const profile = new UserInfo({nameElementSelector, aboutElementSelector, avatarElementSelector});

// Попап с картинкой
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
const confirmPopup = new PopupWithConfirmation(confirmPopupSelector, card => {
  confirmPopup.renderLoading(true);
  praktikumApi.deleteCard(card.data)
    .then(() => {
      card.remove();
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
    handleDeleteClick: () => confirmPopup.open(card),
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

// Загрузка данных пользователя и карточек
Promise.all([praktikumApi.getUserInfo(), praktikumApi.getInitialCards()])
  .then(([userData, cards]) => {
    profile.info = userData;
    cardSection.items = cards;
    cardSection.renderItems();
  })
  .catch(err => console.log(err));

// Установка слушателей на попапы и кнопки
[profilePopup, cardPopup, imagePopup, confirmPopup, avatarPopup].forEach(popup => popup.setEventListeners());
avatarUpdateButton.addEventListener('click', () => {
  avatarFormValidator.resetValidation();
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

// Активация валидации
[avatarFormValidator, profileFormValidator, cardFormValidator].forEach(validator => validator.enableValidation());

