// synchronize-fields.js
'use strict';

window.synchronizeFields = (function (elem1, elem2, array1, array2, func) {
  // Логика синхронизации времени заезда / отъезда
  for (var i = 0; i < elem1.length; i++) {
    elem1.options[i].text = array1[i];
    elem2.options[i].text = array2[i];
  }
  elem1.addEventListener('change', function () {
    for (i = 0; i < elem1.length; i++) {
      if (elem1.options[i].selected === true) {
        elem2.options[i].selected = true;
      }
    }
  });
  elem2.addEventListener('change', function () {
    for (i = 0; i < elem2.length; i++) {
      if (elem2.options[i].selected === true) {
        elem1.options[i].selected = true;
      }
    }
  });
});
