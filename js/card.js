// card.js
'use strict';

window.card = (function () {

  // Подключаем переменные из глобальной области видимости
  var ads = window.data.ads;
  // var deactivateAllPins = window.pin.deactivateAllPins;

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
    for (var i = 0; i < ads[x].offer.features.length; i++) {
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

  // Задаем функцию открытия диалогового окна объявления
  var openDialogPanel = function (x) {
    lodgeElement = lodgeTemplate.cloneNode(true);
    fillLodgeElement(x);
    pasteNewData(x);
    dialogContainer.style.display = 'block';
  };

  // Задаем функцию закрытия диалогового окна объявления
  var closeDialogPanel = function () {
    dialogContainer.style.display = 'none';
  };

  return {
    openDialogPanel: openDialogPanel,
    closeDialogPanel: closeDialogPanel
  };

})();
