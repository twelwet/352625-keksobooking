// pin.js
'use strict';

window.pin = (function () {

  // Подключаем переменные из глобальной области видимости
  var ads = window.data.ads;

  // Объявляем переменную, внутри которой будет находится DIV-контейнер будущих меток
  var pinContainer = document.querySelector('.tokyo__pin-map');

  // Объявляем массив, внутри которого будет находится DIV c разметкой метки
  var pin = [];

  // Объявляем функцию, которая в цикле вставляет в DIV-контейнер все метки
  var insertAllPins = function () {
    // Объявляем переменную, внутри которой будет находится DOM-объект
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      pin[i] = document.createElement('div');
      pin[i].className = 'pin';
      pin[i].style.left = (ads[i].location.x) + 'px';
      pin[i].style.top = (ads[i].location.y) + 'px';
      pin[i].innerHTML = '<img src=\'' + ads[i].author.avatar + '\' class=\'rounded\' width=\'40\' height=\'40\'>';
      pin[i].tabIndex = 0;
      fragment.appendChild(pin[i]);
    }
    pinContainer.appendChild(fragment);
  };

  // Задаем функцию деактивации всех активных пинов
  var deactivateAllPins = function () {
    for (var i = 0; i < pin.length; i++) {
      pin[i].classList.remove('pin--active');
    }
  };

  // Задаем функцию, которая по клику подсвечивает пин
  var updateActivePin = function (x) {
    deactivateAllPins();
    pin[x].classList.add('pin--active');
  };

  return {
    pin: pin,
    insertAllPins: insertAllPins,
    updateActivePin: updateActivePin,
    deactivateAllPins: deactivateAllPins
  };

})();
