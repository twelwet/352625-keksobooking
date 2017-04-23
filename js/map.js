// map.js
'use strict';

window.map = (function () {

  // Отрисовываем все пины
  window.pin.insertAllPins();

  // Описываем алгоритм 'click' по пину
  var addClickHandler = function (elem, x) {
    elem.addEventListener('click', function () {
      window.pin.updateActivePin(x);
      window.card.openDialogPanel(x);
    });
  };

  // Описываем алгоритм 'keydown' ENTER по сфокусированному пину
  var addEnterHandler = function (elem, x) {
    elem.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        window.pin.updateActivePin(x);
        window.card.openDialogPanel(x);
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
    window.card.closeDialogPanel();
    window.pin.deactivateAllPins();
  });

  // Задаем механизм закрытия диалогового окна и деактивации
  // подсвеченного пина при нажатии на ESC
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      window.card.closeDialogPanel();
      window.pin.deactivateAllPins();
    }
  });

  // Найдем перетаскиваемый элемент '.pin__main'
  var pinHandle = document.querySelector('.pin__main');

  // Зададим область окна перетаскивания следующими константами
  var MIN_X = 0;
  var MAX_X = 1130;
  var MIN_Y = 100;
  var MAX_Y = 566;

  // Объявим функцию проверки координат заданной области
  var arePinInArea = function () {
    if (pinHandle.offsetTop < MIN_Y || pinHandle.offsetTop > MAX_Y || pinHandle.offsetLeft < MIN_X || pinHandle.offsetLeft > MAX_X) {
      return false;
    } else {
      return true;
    }
  };

  // Объявим функцию заполнения строки адреса координатами
  var fillAddress = function () {
    var pinHandleCoords = {
      x: (pinHandle.offsetLeft + pinHandle.offsetWidth / 2),
      y: (pinHandle.offsetTop + pinHandle.offsetHeight)
    };
    window.form.address.value = 'x: ' + pinHandleCoords.x + ', y: ' + pinHandleCoords.y + ', offsetTop: ' + pinHandle.offsetTop + ', offsetLeft: ' + pinHandle.offsetLeft;
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

      // [ВОПРОС] Подскажи как корректно обозначить область перетаскивания?
      if (arePinInArea()) {
        pinHandle.style.top = (pinHandle.offsetTop - shift.y) + 'px';
        pinHandle.style.left = (pinHandle.offsetLeft - shift.x) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
