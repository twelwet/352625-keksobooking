// show-card.js
'use strict';

window.showCard = (function () {

  // Подключаем переменные из глобальной области видимости
  var ads = window.data.ads;

  // Объявляем переменную, внутри которой находится TEMPLATE объявления
  var lodgeTemplate = document.getElementById('lodge-template').content;

  // Объявляем переменную, в которую клонируем шаблон объявления
  var lodgeElement;

  // Объявляем переменную-контейнер диалогового окна объявления
  var dialogContainer = document.querySelector('.dialog');

  // Объявляем переменную, в которой будет находится путь к аватару на объявлении
  var dialogContainerTitleImg = dialogContainer.querySelector('.dialog__title img');

  // Объявляем функцию создания тегов SPAN по количеству особенностей размещения
  var createSpans = function (ad) {

    var featureSpan = [];
    var lodgeElementFeatures = lodgeElement.querySelector('.lodge__features');
    for (var i = 0; i < ad.offer.features.length; i++) {
      featureSpan[i] = document.createElement('span');
      featureSpan[i].className = 'feature__image feature__image--' + ad.offer.features[i];
      lodgeElementFeatures.appendChild(featureSpan[i]);
    }
  };

  // Задаем функцию заполнения шаблона данными из 1-го элемента массива объявлений
  var fillLodgeElement = function (ad) {
    // Объявляем переменные-составляющие блока 'lodgeElement': title, address, price и т.д.
    var lodgeElementTitle = lodgeElement.querySelector('.lodge__title');
    var lodgeElementAddress = lodgeElement.querySelector('.lodge__address');
    var lodgeElementPrice = lodgeElement.querySelector('.lodge__price');
    var lodgeElementType = lodgeElement.querySelector('.lodge__type');
    var lodgeElementsRoomsAndGuests = lodgeElement.querySelector('.lodge__rooms-and-guests');
    var lodgeElementCheckinTime = lodgeElement.querySelector('.lodge__checkin-time');
    var lodgeElementDescription = lodgeElement.querySelector('.lodge__description');
    lodgeElementTitle.textContent = ad.offer.title;
    lodgeElementAddress.textContent = ad.offer.address;
    lodgeElementPrice.textContent = ad.offer.price + 'Р/ночь';
    switch (ad.offer.type) {
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
    lodgeElementsRoomsAndGuests.textContent = 'Для ' + ad.offer.guests + ' гостей в ' + ad.offer.rooms + ' комнатах';
    lodgeElementCheckinTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    createSpans(ad);
    lodgeElementDescription.textContent = ad.offer.description;
  };

  // Задаем функцию вставки новых данных на страницу
  var pasteNewData = function (ad) {
    dialogContainerTitleImg.src = ad.author.avatar;
    dialogContainer.replaceChild(lodgeElement, dialogContainer.querySelector('.dialog__panel'));
  };

  // Задаем функцию открытия диалогового окна объявления
  var showCard = function (ad) {
    lodgeElement = lodgeTemplate.cloneNode(true);
    fillLodgeElement(ad);
    pasteNewData(ad);
    dialogContainer.style.display = 'block';
  };

  return showCard;

})();
