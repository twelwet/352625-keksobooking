// map.js
'use strict';

(function () {

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
  // Делаю как в демке, только у меня 'за что тащим' и 'что перетакскиваем' совпадает
  var pinHandle = document.querySelector('.pin__main');

  pinHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

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
      // [ВОПРОС] Даже просто при клике на разные места '.pin__main'
      // в консоль выводятся чуть разные координаты, как сделать так,
      // чтобы туда выводились координаты острого конца пина?
      console.log (startCoords);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
