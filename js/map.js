// map.js
'use strict';
// Отрисовываем все пины
window.pin.insertAllPins();

// Подсвечиваем пин по клику или по нажатию на ENTER,
// а также открываем соответствующее диалоговое окно
for (var i = 0; i < window.pin.pin.length; i++) {
  window.pin.addClickHandler(window.pin.pin[i], i);
  window.pin.addEnterHandler(window.pin.pin[i], i);
}
// Закрываем диалоговое окно по клику на крестик или
// при нажатии ESC, а также убираем подсветку пина
window.card.closeDialogPanel();
