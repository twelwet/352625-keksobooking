// load.js
'use strict';

window.load = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.addEventListener('load', function (evt) {
    callback(xhr.response);
  });
  xhr.open('GET', url);
  xhr.send();
};
