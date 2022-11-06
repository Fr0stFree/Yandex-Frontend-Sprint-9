const popupTemplateElement = document.querySelector('#popup-template').content;
const cardTemplate = document.querySelector('#card-template').content;
const popupImageTemplateElement = document.querySelector('#popup-image-template').content;
const cardList = document.querySelector('.elements__element-list');
const initialCards = [
  {
    name: 'Карачаевск',
    link: 'https://images.unsplash.com/photo-1538819285938-6a9b4eda500b'
  },
  {
    name: 'Гора Эльбрус',
    link: 'https://images.unsplash.com/photo-1521311587563-6a3fb9fbaff7'
  },
  {
    name: 'Домбай',
    link: 'https://images.unsplash.com/photo-1556780183-f523058dc29b'
  },
  {
    name: 'Озеро Байкал',
    link: 'https://images.unsplash.com/photo-1602256976419-c82585fe73a7'
  },
  {
    name: 'Алтай',
    link: 'https://images.unsplash.com/photo-1658898294566-b3fa4f8241cd'
  },
  {
    name: 'Сибирь',
    link: 'https://images.unsplash.com/photo-1590414731158-459a3c3d98ca'
  }
];

// Функция создания/открытия попапа для формы редактирования информации о пользователе
const createProfilePopup = (title,
                            inputOneValue, inputOnePlaceholder, inputOneName,
                            inputTwoValue, inputTwoPlaceholder, inputTwoName) => {
  const popupClass = '.profile-popup';
  const popupInstance = document.querySelector(popupClass) || popupTemplateElement.cloneNode(true).querySelector('.popup');
  
  setFormData(popupInstance, title, inputOneValue, inputOnePlaceholder, 
              inputOneName, inputTwoValue, inputTwoPlaceholder, inputTwoName);
            
  if (!document.querySelector(popupClass)) {
    setPopupEventListeners(popupInstance, popupClass, setProfileData, inputOneValue, inputTwoValue);
    document.querySelector('.footer').after(popupInstance);
  }
  setTimeout(() => popupInstance.classList.add('popup_opened'), 0);
}

// Функция создания/открытия попапа для формы создания экземпляра карточки
const createCardPopup = (title, inputOneValue, inputOnePlaceholder, inputOneName,
                         inputTwoValue, inputTwoPlaceholder, inputTwoName) => {
  const popupClass = '.card-popup';
  const popupInstance = document.querySelector(popupClass) || popupTemplateElement.cloneNode(true).querySelector('.popup');
  
  setFormData(popupInstance, title, inputOneValue, inputOnePlaceholder, 
              inputOneName, inputTwoValue, inputTwoPlaceholder, inputTwoName);
  if (!document.querySelector(popupClass)) {
    setPopupEventListeners(popupInstance, popupClass, addCard, inputOneValue, inputTwoValue, false);
    document.querySelector('.footer').after(popupInstance);
  }
  setTimeout(() => popupInstance.classList.add('popup_opened'), 0);
}

// Функция создания/открытия попапа для просмотра картинки
const createImagePopup = (caption, link) => {
  const popupClass = '.image-popup';
  const popupInstance = document.querySelector(popupClass) || popupImageTemplateElement.cloneNode(true).querySelector('.image-popup');

  popupInstance.querySelector('.popup__image-caption').textContent = caption;
  popupInstance.querySelector('.popup__image').src = link;

  if (!document.querySelector(popupClass)) {
    popupInstance.querySelector('.popup__close-button')
                 .addEventListener('click', evt => evt.target.closest(popupClass).classList.remove('popup_opened'));
    document.querySelector('.footer').after(popupInstance);
  }
  setTimeout(() => popupInstance.classList.add('popup_opened'), 0);
}

// Функция добавления новой карточки на страницу
const addCard = (title, link, append=true) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__image').addEventListener('click', () => createImagePopup(title, link));
  cardElement.querySelector('.card__remove-button')
             .addEventListener('click', evt => evt.target.closest('.elements__element').remove()
  );
  cardElement.querySelector('.card__like-button')
             .addEventListener('click', evt => evt.target.classList.toggle('card__like-button_active')
  );
  append ? cardList.append(cardElement) : cardList.prepend(cardElement);
};

// Функция утсановки персональных данных пользователя, полученных из формы
const setProfileData = (name, description) => {
  document.querySelector('.profile__name').textContent = name;
  document.querySelector('.profile__description').textContent = description;
};

// Вспомогательная функция для заполнения формы атрибутов формы
const setFormData = (popup, title, inputOneValue, inputOnePlaceholder, inputOneName,
                     inputTwoValue, inputTwoPlaceholder, inputTwoName) => {
  popup.querySelector('.popup__title').textContent = title;
  inputOne = popup.querySelector('.popup__input_field-one')
  inputOne.value = inputOneValue;
  inputOne.placeholder = inputOnePlaceholder;
  inputOne.name = inputOneName;

  inputTwo = popup.querySelector('.popup__input_field-two')
  inputTwo.value = inputTwoValue;
  inputTwo.placeholder = inputTwoPlaceholder;
  inputTwo.name = inputTwoName;
  inputTwo.value = inputTwoValue;
};

// Вспомогательная функция для установки слушателей событий на попап и форму
const setPopupEventListeners = (popup, className, sumbitEvent) => {
  popup.classList.add(className.slice(1));
  popup.querySelector('.popup__close-button')
       .addEventListener('click', evt => evt.target.closest(className).classList.remove('popup_opened'));
  popup.querySelector('.popup__form')
       .addEventListener('submit', evt => {
          evt.preventDefault();
          sumbitEvent(evt.target.querySelector('.popup__input_field-one').value,
                      evt.target.querySelector('.popup__input_field-two').value,
                      false);
          evt.target.closest(className).classList.remove('popup_opened');
       });
};

// Построение карточек из исходного массива
const buildCards = cards => cards.forEach(card => addCard(card.name, card.link, true));
buildCards(initialCards);

// Слушатель события на кнопку редактирования профиля
document.querySelector('.profile__edit-button').addEventListener('click', () => createProfilePopup(
  'Редактировать профиль',
  document.querySelector('.profile__name').textContent, 'Введите имя', 'name',
  document.querySelector('.profile__description').textContent, 'О себе', 'description'
));

// Слушатель события на кнопку добавления карточки
document.querySelector('.profile__add-button').addEventListener('click', () => createCardPopup(
  'Новое место',
  '', 'Название', 'place',
  '', 'Ссылка на картинку', 'link'
));
