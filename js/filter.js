'use strict';

window.filter = (function () {
  var buttonsEl = document.querySelectorAll('.img-filters__button');
  var type = {
    0: 'initial',
    1: 'random',
    2: 'discussed'
  };
  var currentButtonIndex = 0;
  var callbacks = [];

  var fireCallbacks = function () {
    callbacks.forEach(function (callback) {
      callback(type[currentButtonIndex]);
    });
  };

  buttonsEl.forEach(function (buttonEl, index) {
    buttonEl.addEventListener('click', function (evt) {
      buttonsEl[currentButtonIndex].classList.remove('img-filters__button--active');
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
