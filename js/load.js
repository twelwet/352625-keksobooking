// load.js
'use strict';

(function () {

  window.load = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function (evt) {
      callback(xhr.response);
    });
    xhr.open('GET', url);
    xhr.send();
    var ads = callback.ads;
    return {
      ads: ads
    };

  };

  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  var onLoad = function (data) {
    var ads = data;
    return {
      ads: ads
    };
  };

  window.load(URL, onLoad);

})();

/*
// var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

// var xhr = new XMLHttpRequest();

// xhr.responseType = 'json';

xhr.addEventListener('load', function (evt) {
  // console.log(evt.target === xhr);
  // console.log(evt.target);
  console.log(xhr.status + ' ' + xhr.statusText);
  var data;
  try {
    data = xhr.response;
    // data = JSON.parse(xhr.responseText);
  } catch (err) {
    console.error(err.message);
  }
  console.log(data[0].author);
  // console.log(xhr.responseText);
});

xhr.open('GET', URL);

xhr.send();

// -------

(function () {

  // Объявим функцию, которая будет сообщать об ошибке загрузки данных
  var onError = function (message) {
    console.error(message);
  };

  // Объявим функцию, которая будет присваивать загруженные данные переменной 'ads'
  var onSuccess = function (data) {
    var ads = data;
    // console.log(ads);
  };

  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  // Объявим функцию, которая будет отправлять запросы на 'URL', обрабатывать
  // полученные данные и передавать их в callback-функции 'onSuccess' или 'onError'
  window.load = function (onSuccess, onError) {
    debugger;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.send();
  };
})();
*/
