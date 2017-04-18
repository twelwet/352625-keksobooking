// map.js
'use strict';

// Задаем константы
var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var TYPES = [
  'flat',
  'house',
  'bungalo'
];
var CHECK_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var MIN_ROOMS_QUANTITY = 1;
var MAX_ROOMS_QUANTITY = 5;
var MIN_GUESTS_QUANTITY = 1;
var MAX_GUESTS_QUANTITY = 10;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 100;
var MAX_Y = 500;
var ADS_QUANTITY = 8;

// Объявляем функцию получения случайного числа в заданном диапазоне
var getRandomValue = function (min, max) {
  return Math.floor((Math.random() * (max - min + 1) + min));
};

// Объявляем функцию получения случайного значения из массива
var getRandomArrayValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// Объявляем функцию получения пути к аватару автора объявления
var getAuthorAvatar = function (numeral) {
  if (numeral < 10) {
    return 'img/avatars/user0' + numeral + '.png';
  } else {
    return 'img/avatars/user' + numeral + '.png';
  }
};

// Объявляем функцию получения случайной строки заголовка объявления
var getOfferTitle = function () {
  return getRandomArrayValue(TITLES);
};

// Объявляем переменные получения рандомных координат X, Y
var randomX;
var randomY;

// Объявляем функцию получения строки адреса объявления
var getOfferAddress = function () {
  randomX = getRandomValue(MIN_X, MAX_X);
  randomY = getRandomValue(MIN_Y, MAX_Y);
  return (randomX + ', ' + randomY);
};

// Объявляем функцию получения случайной цены в заданном диапазоне
var getOfferPrice = function () {
  return getRandomValue(MIN_PRICE, MAX_PRICE);
};

// Объвляем функцию получения случайного значения из константы 'TYPES'
var getOfferType = function () {
  return getRandomArrayValue(TYPES);
};

// Объявляем функцию получения случайного количества комнат в заданном диапазоне
var getOfferRooms = function () {
  return getRandomValue(MIN_ROOMS_QUANTITY, MAX_ROOMS_QUANTITY);
};

// Объявляем функцию получения количества гостей, которое можно разместить
var getOfferGuests = function () {
  return getRandomValue(MIN_GUESTS_QUANTITY, MAX_GUESTS_QUANTITY);
};

// Объявляем функцию получения времени заезда
var getCheckinTime = function () {
  return getRandomArrayValue(CHECK_TIMES);
};

// Объявляем функцию получения времени выезда
var getCheckoutTime = function () {
  return getRandomArrayValue(CHECK_TIMES);
};

// Объявляем функцию формирования массива из константы 'FEATURES'
// рандомного размера с рандомным наполнением
var getOfferFeatures = function () {
  // Объявляем временный массив, рандомные элементы которого будут стираться в цикле
  var temporaryArray = FEATURES.slice();
  var randomSize = getRandomValue(0, FEATURES.length);
  // Объявляем массив, в который будем записывать рандомные элементы из temporaryArray
  var randomFeatures = [];
  for (var i = 0; i < (randomSize); i++) {
    var x = getRandomValue(0, (temporaryArray.length - 1));
    randomFeatures[i] = temporaryArray[x];
    temporaryArray.splice(x, 1);
  }
  return randomFeatures;
};

// Создаем массив объявлений
var ads = [];

// Заполняем массив в цикле
for (var i = 0; i < ADS_QUANTITY; i++) {
  ads[i] = {
    author: {
      avatar: getAuthorAvatar(i + 1)
    },
    offer: {
      title: getOfferTitle(),
      address: getOfferAddress(),
      price: getOfferPrice(),
      type: getOfferType(),
      rooms: getOfferRooms(),
      guests: getOfferGuests(),
      checkin: getCheckinTime(),
      checkout: getCheckoutTime(),
      features: getOfferFeatures(),
      description: '',
      photos: []
    },
    location: {
      x: randomX,
      y: randomY
    }
  };
}

// Объявляем переменную, внутри которой будет находится DIV-контейнер будущих меток
var pinMapElement = document.querySelector('.tokyo__pin-map');

// Объявляем массив, внутри которого будет находится DIV c разметкой метки
var pin = [];

// Объявляем функцию, которая в цикле вставляет в DIV-контейнер все метки
var insertAllPins = function () {
  // Объявляем переменную, внутри которой будет находится DOM-объект
  var fragment = document.createDocumentFragment();
  for (i = 0; i < ADS_QUANTITY; i++) {
    pin[i] = document.createElement('div');
    pin[i].className = 'pin';
    pin[i].style.left = (ads[i].location.x) + 'px';
    pin[i].style.top = (ads[i].location.y) + 'px';
    pin[i].innerHTML = '<img src=\'' + ads[i].author.avatar + '\' class=\'rounded\' width=\'40\' height=\'40\'>';
    pin[i].tabIndex = 0;
    fragment.appendChild(pin[i]);
  }
  pinMapElement.appendChild(fragment);
};

insertAllPins();

// Объявляем переменную, внутри которой находится TEMPLATE объявления
var lodgeTemplate = document.getElementById('lodge-template').content;

// Объявляем переменную, в которую клонируем шаблон объявления
var lodgeElement;

// Объявляем переменную-контейнер диалогового окна объявления
var dialogContainer = document.querySelector('.dialog');

// Объявляем переменную, в которой будет находится путь к аватару на объявлении
var dialogContainerTitleImg = dialogContainer.querySelector('.dialog__title img');
// var dialogContainerPanel = dialogContainer.querySelector('.dialog__panel');

// Объявляем функцию создания тегов SPAN по количеству особенностей размещения
var createSpans = function (x) {
  var featureSpan = [];
  var lodgeElementFeatures = lodgeElement.querySelector('.lodge__features');
  for (i = 0; i < ads[x].offer.features.length; i++) {
    featureSpan[i] = document.createElement('span');
    featureSpan[i].className = 'feature__image feature__image--' + ads[x].offer.features[i];
    lodgeElementFeatures.appendChild(featureSpan[i]);
  }
};

// Задаем функцию заполнения шаблона данными из 1-го элемента массива объявлений
var fillLodgeElement = function (x) {
  // Объявляем переменные-составляющие блока 'lodgeElement': title, address, price и т.д.
  var lodgeElementTitle = lodgeElement.querySelector('.lodge__title');
  var lodgeElementAddress = lodgeElement.querySelector('.lodge__address');
  var lodgeElementPrice = lodgeElement.querySelector('.lodge__price');
  var lodgeElementType = lodgeElement.querySelector('.lodge__type');
  var lodgeElementsRoomsAndGuests = lodgeElement.querySelector('.lodge__rooms-and-guests');
  var lodgeElementCheckinTime = lodgeElement.querySelector('.lodge__checkin-time');
  var lodgeElementDescription = lodgeElement.querySelector('.lodge__description');
  lodgeElementTitle.textContent = ads[x].offer.title;
  lodgeElementAddress.textContent = ads[x].offer.address;
  lodgeElementPrice.textContent = ads[x].offer.price + 'Р/ночь';
  switch (ads[x].offer.type) {
    case 'flat':
      lodgeElementType.textContent = 'Квартира';
      break;
    case 'bungalo':
      lodgeElementType.textContent = 'Бунгало';
      break;
    case 'house':
      lodgeElementType.textContent = 'Дом';
      break;
  }
  lodgeElementsRoomsAndGuests.textContent = 'Для ' + ads[x].offer.guests + ' гостей в ' + ads[x].offer.rooms + ' комнатах';
  lodgeElementCheckinTime.textContent = 'Заезд после ' + ads[x].offer.checkin + ', выезд до ' + ads[x].offer.checkout;
  createSpans(x);
  lodgeElementDescription.textContent = ads[x].offer.description;
};

// Задаем функцию вставки новых данных на страницу
var pasteNewData = function (x) {
  dialogContainerTitleImg.src = ads[x].author.avatar;
  dialogContainer.replaceChild(lodgeElement, dialogContainer.querySelector('.dialog__panel'));
};

// Задаем фнукцию деактивации всех активных пинов
var deactivateAllPins = function () {
  for (i = 0; i < pin.length; i++) {
    pin[i].classList.remove('pin--active');
  }
};

// Задаем функцию, которая по клику подсвечивает пин
var updateActivePin = function (x) {
  deactivateAllPins();
  pin[x].classList.add('pin--active');
};

// Задаем функцию, которая деактивирует подсвеченный

// Задаем функцию открытия диалогового окна объявления
var openDialogPanel = function (x) {
  lodgeElement = lodgeTemplate.cloneNode(true);
  fillLodgeElement(x);
  pasteNewData(x);
  dialogContainer.style.display = 'block';
};

// Описываем алгоритм 'click' по пину
var addClickHandler = function (elem, x) {
  elem.addEventListener('click', function () {
    updateActivePin(x);
    openDialogPanel(x);
  });
};

// Описываем алгоритм 'keydown' ENTER по сфокусированному пину
var addEnterHandler = function (elem, x) {
  elem.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      updateActivePin(x);
      openDialogPanel(x);
    }
  });
};

// Выполняем функции клика и нажатия на ENTER для всех pin[0...7]
for (i = 0; i < pin.length; i++) {
  addClickHandler(pin[i], i);
  addEnterHandler(pin[i], i);
}

// Задаем механизм закрытия диалогового окна и деактивации
// подсвеченного пина при клике на крестик
var dialogCloseButton = document.querySelector('.dialog__close');
dialogCloseButton.addEventListener('click', function () {
  dialogContainer.style.display = 'none';
  deactivateAllPins();
});

// Задаем механизм закрытия диалогового окна и деактивации
// подсвеченного пина при нажатии на ESC
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    dialogContainer.style.display = 'none';
    deactivateAllPins();
  }
});

// Объявим переменные полей объявления и кнопки
var form = document.querySelector('.notice__form');
var title = form.querySelector('#title');
var type = form.querySelector('#type');
var price = form.querySelector('#price');
var time = form.querySelector('#time');
var timeout = form.querySelector('#timeout');
var roomNumber = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');

// Объявим функцию автоселекта равнонаполненных полей INPUT
var autoSelect = function (elem1, elem2) {
  elem1.addEventListener('change', function () {
    for (i = 0; i < elem1.length; i++) {
      if (elem1.options[i].selected === true) {
        elem2.options[i].selected = true;
      }
    }
  });
};

autoSelect(time, timeout);
autoSelect(timeout, time);

// Зададим константу минимальной цены
var MIN_PRICES = [
  0,
  1000,
  10000
];

// Задаем механизм типа размещения от цены
price.addEventListener('input', function () {
  if (price.value >= MIN_PRICES[0] && price.value < MIN_PRICES[1]) {
    type.options[1].selected = true; // 'Лачуга'
  }
  if (price.value >= MIN_PRICES[1] && price.value < MIN_PRICES[2]) {
    type.options[0].selected = true; // 'Квартира'
  }
  if (price.value >= MIN_PRICES[2]) {
    type.options[2].selected = true; // 'Дворец'
  }
});

// Задаем механизм цены от типа размещения
type.addEventListener('change', function () {
  if (type.options[1].selected === true) { // 'Лачуга'
    price.value = MIN_PRICES[0];
  }
  if (type.options[0].selected === true) { // 'Квартира'
    price.value = MIN_PRICES[1];
  }
  if (type.options[2].selected === true) { // 'Дворец'
    price.value = MIN_PRICES[2];
  }
});

// Задаем механизм зависимости кол-ва мест от кол-ва комнат
roomNumber.addEventListener('change', function () {
  if (roomNumber.options[1].selected || roomNumber.options[2].selected) {
    capacity.options[0].selected = true;
  }
  if (roomNumber.options[0].selected === true) {
    capacity.options[1].selected = true;
  }
});

// Объявим функцию сброса формы в умолчание
var setDefaultForm = function () {
  form.reset();
  // Параметры заголовка объявления
  title.required = true;
  title.minLength = 30;
  title.maxLength = 100;
  // Параметры цены объявления
  price.required = true;
  price.type = 'number';
  price.min = 1000;
  price.max = 1000000;
  price.value = 1000;
  // Сменим значение по умолчания для селекта кол-ва мест чтобы соответсвовать логике ТЗ
  capacity.options[1].selected = true;
};

setDefaultForm();

// Задаем механизм зависимости кол-ва комнат от кол-ва мест
capacity.addEventListener('change', function () {
  if (capacity.options[0].selected === true) {
    roomNumber.options[1].selected = true;
  }
  if (capacity.options[1].selected === true) {
    roomNumber.options[0].selected = true;
  }
});

// Объявим функцию валидации текстового поля
var validateTitle = function (textField, textMin, textMax) {
  if (textField.value.length < textMin || textField.value.length > textMax) {
    textField.style.borderColor = 'red';
    return false;
  } else {
    textField.style.borderColor = '';
    return true;
  }
};

// Объявим функцию валидации числового поля
var validateNumber = function (numberField, numberMin, numberMax) {
  if (numberField.value < numberMin || numberField.value > numberMax) {
    numberField.style.borderColor = 'red';
    return false;
  } else {
    numberField.style.borderColor = '';
    return true;
  }
};

// Объявим функцию валидации формы
var validateForm = function () {
  var titleValid = validateTitle(title, title.minLength, title.maxLength);
  var numberValid = validateNumber(price, price.min, price.max);
  return titleValid && numberValid;
};

// Проверим правильность заполнения полей формы title.value и price.value
form.addEventListener('submit', function (evt) {
  // Отменяем действие по умолчанию
  evt.preventDefault();
  // Проводим валидацию
  if (validateForm()) {
    form.submit();
    setDefaultForm();
  }
});
