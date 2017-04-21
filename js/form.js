// form.js
'use strict';

(function () {

  // Объявим переменные полей объявления и кнопки
  var form = document.querySelector('.notice__form');
  var title = form.querySelector('#title');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var time = form.querySelector('#time');
  var timeout = form.querySelector('#timeout');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');

  // Объявим функцию автоселекта равнонаполненных полей INPUT
  var autoSelect = function (elem1, elem2) {
    elem1.addEventListener('change', function () {
      for (var i = 0; i < elem1.length; i++) {
        if (elem1.options[i].selected === true) {
          elem2.options[i].selected = true;
        }
      }
    });
  };

  autoSelect(time, timeout);
  autoSelect(timeout, time);

  // Зададим константу минимальной цены
  var MIN_PRICES = [
    0,
    1000,
    10000
  ];

  // Задаем механизм типа размещения от цены
  price.addEventListener('input', function () {
    if (price.value >= MIN_PRICES[0] && price.value < MIN_PRICES[1]) {
      type.options[1].selected = true; // 'Лачуга'
    }
    if (price.value >= MIN_PRICES[1] && price.value < MIN_PRICES[2]) {
      type.options[0].selected = true; // 'Квартира'
    }
    if (price.value >= MIN_PRICES[2]) {
      type.options[2].selected = true; // 'Дворец'
    }
  });

  // Задаем механизм цены от типа размещения
  type.addEventListener('change', function () {
    if (type.options[1].selected === true) { // 'Лачуга'
      price.value = MIN_PRICES[0];
    }
    if (type.options[0].selected === true) { // 'Квартира'
      price.value = MIN_PRICES[1];
    }
    if (type.options[2].selected === true) { // 'Дворец'
      price.value = MIN_PRICES[2];
    }
  });

  // Задаем механизм зависимости кол-ва мест от кол-ва комнат
  roomNumber.addEventListener('change', function () {
    if (roomNumber.options[1].selected || roomNumber.options[2].selected) {
      capacity.options[0].selected = true;
    }
    if (roomNumber.options[0].selected === true) {
      capacity.options[1].selected = true;
    }
  });

  // Объявим функцию сброса формы в умолчание
  var setDefaultForm = function () {
    form.reset();
    // Параметры заголовка объявления
    title.required = true;
    title.minLength = 30;
    title.maxLength = 100;
    // Параметры цены объявления
    price.required = true;
    price.type = 'number';
    price.min = 1000;
    price.max = 1000000;
    price.value = 1000;
    // Сменим значение по умолчания для селекта кол-ва мест чтобы соответсвовать логике ТЗ
    capacity.options[1].selected = true;
  };

  setDefaultForm();

  // Задаем механизм зависимости кол-ва комнат от кол-ва мест
  capacity.addEventListener('change', function () {
    if (capacity.options[0].selected === true) {
      roomNumber.options[1].selected = true;
    }
    if (capacity.options[1].selected === true) {
      roomNumber.options[0].selected = true;
    }
  });

  // Объявим функцию валидации текстового поля
  var validateTitle = function (textField, textMin, textMax) {
    if (textField.value.length < textMin || textField.value.length > textMax) {
      textField.style.borderColor = 'red';
      return false;
    } else {
      textField.style.borderColor = '';
      return true;
    }
  };

  // Объявим функцию валидации числового поля
  var validateNumber = function (numberField, numberMin, numberMax) {
    if (numberField.value < numberMin || numberField.value > numberMax) {
      numberField.style.borderColor = 'red';
      return false;
    } else {
      numberField.style.borderColor = '';
      return true;
    }
  };

  // Объявим функцию валидации формы
  var validateForm = function () {
    var titleValid = validateTitle(title, title.minLength, title.maxLength);
    var numberValid = validateNumber(price, price.min, price.max);
    return titleValid && numberValid;
  };

  // Проверим правильность заполнения полей формы title.value и price.value
  form.addEventListener('submit', function (evt) {
    // Отменяем действие по умолчанию
    evt.preventDefault();
    // Проводим валидацию
    if (validateForm()) {
      form.submit();
      setDefaultForm();
    }
  });

})();
