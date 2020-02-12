'use strict';

window.utils = (function () {

  // Генерирует случайное число от min до max
  var getRandomValue = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return {
    getRandomValue: getRandomValue
  };
})();
