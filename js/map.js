// map.js
'use strict';
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
  window.card.dialogContainer.style.display = 'none';
  window.pin.deactivateAllPins();
});

// Задаем механизм закрытия диалогового окна и деактивации
// подсвеченного пина при нажатии на ESC
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    window.card.dialogContainer.style.display = 'none';
    window.pin.deactivateAllPins();
  }
});
