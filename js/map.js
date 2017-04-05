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
  return array[(Math.random() * (array.length - 1)).toFixed(0)];
};

// Объявляем функцию получения пути к аватару автора объявления
var getAuthorAvatar = function (numeral) {
  return 'img/avatars/user0' + numeral + '.png';
};

// Объявляем функцию получения строки заголовка объявления
var getOfferTitle = function (arrayValue) {
  return TITLES[arrayValue];
};

// Объявляем переменные получения рандомных координат X, Y
var randomX = getRandomValue(MIN_X, MAX_X);
var randomY = getRandomValue(MIN_Y, MAX_Y);

// Объявляем функцию получения строки адреса объявления
var getOfferAddress = function () {
  return (randomX + ', ' + randomY);
};

// Объявляем функцию получения случайной цены в заданном диапазоне
var getOfferPrice = function () {
  return getRandomValue(MIN_PRICE, MAX_PRICE);
};

// Объвляем функцию получения случайного значения из константы 'TYPES'
var getOfferType = function () {
  getRandomArrayValue(TYPES);
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

// Объявляем функцию формирования массива из константы 'FEATURES' рандомного размера
var getOfferFeatures = function () {
  var randomSize = FEATURES.indexOf(getRandomArrayValue(FEATURES));
  var randomFeatures = new Array(randomSize);
  for (var i = 0; i < randomSize; i++) {
    randomFeatures[i] = FEATURES[i];
  }
  return randomFeatures;
};

// Объявляем массив, состоящий из JS-объектов, которые
// будут описывать похожие объявления неподалеку
var ads = new Array(ADS_QUANTITY);

// Заполняем в цикле объявленный массив
// [ВОПРОС] Массив заполняется не корректно, подскажи как исправить?
for (var i = 0; i < ads.length; i++) {
  var j = i + 1;
  ads[i] = {
    avatar: getAuthorAvatar(j),
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
    photos: [],
    x: randomX,
    y: randomY
  };
}
