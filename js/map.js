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
// [ВОПРОС] Не понял почему '- 1' лишнее?
// Если убрать единицу:
// 'return array[(Math.random() * (array.length).toFixed(0)]',
// то возможен возврат несуществующего элемента массива 'undefined'.
// Добавление '- 1' исключает такой сценарий.
var getRandomArrayValue = function (array) {
  return array[(Math.random() * (array.length - 1)).toFixed(0)];
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

// Объявляем функции получения рандомных координат X, Y
var getRandomX = function () {
  return getRandomValue(MIN_X, MAX_X);
};
var getRandomY = function () {
  return getRandomValue(MIN_Y, MAX_Y);
};

// Объявляем функцию получения строки адреса объявления
// В результате выполнения функции 'getOfferAddress'
// случайные значения X и Y вычисляются заново. Так быть не должно.
// [ВОПРОС] Подскажи как исправить функцию 'getOfferAddress', чтобы
// она складывала в строку результаты функций 'getRandomX' и 'getRandomY',
// а не вызывала эти функции повторно?
var getOfferAddress = function () {
  return (getRandomX() + ', ' + getRandomY());
};

// Объявляем функцию получения случайной цены в заданном диапазоне
var getOfferPrice = function () {
  return getRandomValue(MIN_PRICE, MAX_PRICE);
};

// Объвляем функцию получения случайного значения из константы 'TYPES'
// [ВОПРОС] Из этой функции я возвращаю случайное значения типа недвижимости
// 'flat', 'house' или 'bungalo'. Эту функцию как-то сократить?
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

// Объявляем функцию получения времени заезда в размещение
var getCheckinTime = function () {
  return getRandomArrayValue(CHECK_TIMES);
};

// Объявляем функцию получения времени выезда из размещения
var getCheckoutTime = function () {
  return getRandomArrayValue(CHECK_TIMES);
};

// Объявляем функцию формирования массива из константы 'FEATURES'
// рандомного размера с рандомным наполнением
var getOfferFeatures = function () {
  var temporaryArray = FEATURES;
  var randomSize = getRandomValue(0, FEATURES.length);
  var randomFeatures = new Array(randomSize);
  for (var i = 0; i < randomSize; i++) {
    var x = getRandomValue(0, (FEATURES.length - 1));
    randomFeatures[i] = temporaryArray[x];
    temporaryArray.splice(x, 1);
  }
  return randomFeatures;
};

// Объявляем ассоциативные массивы, которые содержат блоки данных объявления:
// -автор
var author = {};
// -предложение
var offer = {};
// -локация
var location = {};

// Создаем массив объявлений
var ads = [];

// Заполняем массивы в цикле
for (var i = 0; i < ADS_QUANTITY; i++) {
  var j = i + 1;
  author[i] = {
    avatar: getAuthorAvatar(j)
  };
  offer[i] = {
    title: getOfferTitle(i),
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
  };
  location[i] = {
    x: getRandomX,
    y: getRandomY
  };
  ads[i] = [author[i], offer[i], location[i]];
}
