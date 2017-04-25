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
  var createSpans = function (array, index) {

    var featureSpan = [];
    var lodgeElementFeatures = lodgeElement.querySelector('.lodge__features');
    for (var i = 0; i < array[index].offer.features.length; i++) {
      featureSpan[i] = document.createElement('span');
      featureSpan[i].className = 'feature__image feature__image--' + array[index].offer.features[i];
      lodgeElementFeatures.appendChild(featureSpan[i]);
    }
  };

  // Задаем функцию заполнения шаблона данными из 1-го элемента массива объявлений
  var fillLodgeElement = function (array, index) {
    // Объявляем переменные-составляющие блока 'lodgeElement': title, address, price и т.д.
    var lodgeElementTitle = lodgeElement.querySelector('.lodge__title');
    var lodgeElementAddress = lodgeElement.querySelector('.lodge__address');
    var lodgeElementPrice = lodgeElement.querySelector('.lodge__price');
    var lodgeElementType = lodgeElement.querySelector('.lodge__type');
    var lodgeElementsRoomsAndGuests = lodgeElement.querySelector('.lodge__rooms-and-guests');
    var lodgeElementCheckinTime = lodgeElement.querySelector('.lodge__checkin-time');
    var lodgeElementDescription = lodgeElement.querySelector('.lodge__description');
    lodgeElementTitle.textContent = array[index].offer.title;
    lodgeElementAddress.textContent = array[index].offer.address;
    lodgeElementPrice.textContent = array[index].offer.price + 'Р/ночь';
    switch (array[index].offer.type) {
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
    lodgeElementsRoomsAndGuests.textContent = 'Для ' + array[index].offer.guests + ' гостей в ' + array[index].offer.rooms + ' комнатах';
    lodgeElementCheckinTime.textContent = 'Заезд после ' + array[index].offer.checkin + ', выезд до ' + array[index].offer.checkout;
    createSpans(ads, index);
    lodgeElementDescription.textContent = array[index].offer.description;
  };

  // Задаем функцию вставки новых данных на страницу
  var pasteNewData = function (array, index) {
    dialogContainerTitleImg.src = array[index].author.avatar;
    dialogContainer.replaceChild(lodgeElement, dialogContainer.querySelector('.dialog__panel'));
  };

  // Задаем функцию открытия диалогового окна объявления
  var showCard = function (array, index) {
    lodgeElement = lodgeTemplate.cloneNode(true);
    fillLodgeElement(ads, index);
    pasteNewData(ads, index);
    dialogContainer.style.display = 'block';
  };

  return {
    showCard: showCard
  };

})();
