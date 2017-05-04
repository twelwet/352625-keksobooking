// map.js
'use strict';

(function () {

  var filter = document.querySelector('.tokyo__filters');
  var typeFilter = filter.querySelector('#housing_type');
  var typeValue = typeFilter.value;
  var priceFilter = filter.querySelector('#housing_price');
  var priceValue = priceFilter.value;
  var roomFilter = filter.querySelector('#housing_room-number');
  var roomValue = roomFilter.value;
  var guestFilter = filter.querySelector('#housing_guests-number');
  var guestValue = guestFilter.value;

  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  var pins = [];

  var rank = [];

  var onLoad = function (data) {
    // Сохраним загруженные данные в переменную 'pins'
    pins = data;

    // Объявим функцию показа пина фильтром
    var showPinByFilter = function (element) {
      element.style.display = 'block';
    };

    // Объявим функцию скрытия пина фильтром
    var hidePinByFilter = function (element, callback) {
      element.style.display = 'none';
      callback();
      window.pin.deactivateAllPins();
    };

    // Объявим функцию набора очков каждым объявлением, объявления с
    // максимальным количеством очков будут отрисованы на карте
    var getRank = function (type, price, room, guest) {
      if (room !== 'any') {
        room = Number(room);
      }
      if (guest !== 'any') {
        guest = Number(guest);
      }
      for (var i = 0; i < window.pin.pin.length; i++) {
        rank[i] = 0;
        switch (type) {
          case 'any':
            rank[i] += 1;
            break;
          case pins[i].offer.type:
            rank[i] += 1;
            break;
          default:
            rank[i] += 0;
            break;
        }
        switch (price) {
          case 'low':
            if (pins[i].offer.price <= 10000) {
              rank[i] += 1;
            } else {
              rank[i] += 0;
            }
            break;
          case 'middle':
            if (pins[i].offer.price > 10000 && pins[i].offer.price < 50000) {
              rank[i] += 1;
            } else {
              rank[i] += 0;
            }
            break;
          case 'high':
            if (pins[i].offer.price >= 50000) {
              rank[i] += 1;
            } else {
              rank[i] += 0;
            }
            break;
        }
        switch (room) {
          case 'any':
            rank[i] += 1;
            break;
          case pins[i].offer.rooms:
            rank[i] += 1;
            break;
          default:
            rank[i] += 0;
            break;
        }
        switch (guest) {
          case 'any':
            rank[i] += 1;
            break;
          case pins[i].offer.guests:
            rank[i] += 1;
            break;
          default:
            rank[i] += 0;
            break;
        }
      }
    };

    // Описываем алгоритм изменения фильтра 'типа жилья'
    typeFilter.addEventListener('change', function () {
      typeValue = typeFilter.value;
      getRank(typeValue, priceValue, roomValue, guestValue);
      updatePins(rank);
    });

    // Описываем алгоритм изменения фильтра 'цены'
    priceFilter.addEventListener('change', function () {
      priceValue = priceFilter.value;
      getRank(typeValue, priceValue, roomValue, guestValue);
      updatePins(rank);
    });

    // Описываем алгоритм изменения фильтра 'комнат'
    roomFilter.addEventListener('change', function () {
      roomValue = roomFilter.value;
      getRank(typeValue, priceValue, roomValue, guestValue);
      updatePins(rank);
    });

    guestFilter.addEventListener('change', function () {
      guestValue = guestFilter.value;
      getRank(typeValue, priceValue, roomValue, guestValue);
      updatePins(rank);
    });

    // Задаем функцию закрытия диалогового окна объявления
    var hideCard = function () {
      document.querySelector('.dialog').style.display = 'none';
    };

    // Объявим функцию обновления пинов
    var updatePins = function (value) {
      for (var i = 0; i < window.pin.pin.length; i++) {
        switch (value[i]) {
          case 4:
            showPinByFilter(window.pin.pin[i]);
            break;
          default:
            hidePinByFilter(window.pin.pin[i], hideCard);
            break;
        }
      }
    };

    // Отрисовываем все пины
    window.pin.insertAllPins(pins);
    getRank(typeValue, priceValue, roomValue, guestValue);
    updatePins(rank);

    // Описываем алгоритм 'click' по пину
    var addClickHandler = function (elem, index) {
      elem.addEventListener('click', function () {
        window.pin.updateActivePin(index);
        window.showCard(data[index]);
      });
    };

    // Описываем алгоритм 'keydown' ENTER по сфокусированному пину
    var addEnterHandler = function (elem, index) {
      elem.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 13) {
          window.pin.updateActivePin(index);
          window.showCard(data[index]);
        }
      });
    };

    // Подсвечиваем пин по клику или по нажатию на ENTER,
    // а также открываем соответствующее диалоговое окно
    for (var i = 0; i < window.pin.pin.length; i++) {
      addClickHandler(window.pin.pin[i], i);
      addEnterHandler(window.pin.pin[i], i);
    }

    // Задаем механизм закрытия диалогового окна и деактивации
    // подсвеченного пина при клике на крестик
    var dialogCloseButton = document.querySelector('.dialog__close');
    dialogCloseButton.addEventListener('click', function () {
      hideCard();
      window.pin.deactivateAllPins();
    });

    // Задаем механизм закрытия диалогового окна и деактивации
    // подсвеченного пина при нажатии на ESC
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        hideCard();
        window.pin.deactivateAllPins();
      }
    });

    // Найдем перетаскиваемый элемент '.pin__main'
    var pinHandle = document.querySelector('.pin__main');

    // Объявим функцию заполнения строки адреса координатами
    var fillAddress = function () {
      var pinHandleCoords = {
        x: (pinHandle.offsetLeft + pinHandle.offsetWidth / 2),
        y: (pinHandle.offsetTop + pinHandle.offsetHeight)
      };
      window.form.address.value = 'x: ' + pinHandleCoords.x + ', y: ' + pinHandleCoords.y;
    };

    fillAddress();

    pinHandle.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        fillAddress();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        pinHandle.style.top = (pinHandle.offsetTop - shift.y) + 'px';
        pinHandle.style.left = (pinHandle.offsetLeft - shift.x) + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

  };

  var onError = function (message) {
    var node = document.createElement('div');
    node.style = 'margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'relative';
    node.style.fontSize = '16px';
    node.style.color = 'white';
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(URL, onLoad, onError);

})();
