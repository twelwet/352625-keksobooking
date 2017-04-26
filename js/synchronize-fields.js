// synchronize-fields.js
'use strict';

window.synchronizeFields = (function () {
  // Объявим функцию синхронизации значений равнонаполненных полей INPUT
  var syncValues = function (elem1, elem2, array1, array2, callback) {
    elem1.addEventListener('change', function () {
      for (var i = 0; i < elem1.length; i++) {
        if (elem1.options[i].selected === true) {
          elem2.options[i].selected = true;
        }
      }
    });
    elem2.addEventListener('change', function () {
      for (var i = 0; i < elem1.length; i++) {
        if (elem2.options[i].selected === true) {
          elem1.options[i].selected = true;
        }
      }
    });
  };
  return syncValues;
})();
