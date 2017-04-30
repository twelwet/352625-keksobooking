// map.js
'use strict';

(function () {

  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  var onLoad = function (data) {
    // Отрисовываем все пины
    window.pin.insertAllPins(data);

    // Задаем функцию закрытия диалогового окна объявления
    var hideCard = function () {
      document.querySelector('.dialog').style.display = 'none';
    };

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
