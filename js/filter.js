'use strict';

window.filter = (function () {
  var buttons = document.querySelectorAll('.img-filters__button');
  var types = {
    0: 'default',
    1: 'random',
    2: 'discussed'
  };
  var currentButtonIndex = 0;
  var callbacks = [];

  var fireCallbacks = function () {
    callbacks.forEach(function (callback) {
      callback(types[currentButtonIndex]);
    });
  };

  buttons.forEach(function (buttonEl, index) {
    buttonEl.addEventListener('click', function (evt) {
      buttons[currentButtonIndex].classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      currentButtonIndex = index;

      fireCallbacks();
    });
  });

  var onChange = function (callback) {
    callbacks.push(callback);
  };

  return {
    onChange: onChange,
  };
})();
