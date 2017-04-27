// form.js
'use strict';

window.form = (function () {

  // Объявим переменные полей объявления и кнопки
  var form = document.querySelector('.notice__form');
  var title = form.querySelector('#title');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var time = form.querySelector('#time');
  var timeout = form.querySelector('#timeout');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var address = form.querySelector('#address');

  var syncValues = function (element, value) {
    element.value = value;
  };

  window.synchronizeFields(time, timeout, [12, 13, 14], [12, 13, 14], syncValues);
  window.synchronizeFields(timeout, time, [12, 13, 14], [12, 13, 14], syncValues);
  window.synchronizeFields(type, price, ['apartment', 'shack', 'palace'], [1000, 0, 10000], syncValues);
  window.synchronizeFields(roomNumber, capacity, [1, 2, 100], ['не для гостей', 'для 3 гостей', 'для 3 гостей'], syncValues);

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
    address.readOnly = true;
  };

  setDefaultForm();

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

  return {
    address: address
  };
})();
