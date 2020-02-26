'use strict';

window.utils = (function () {
  var ESC_KEY = 27;
  var ENTER_KEY = 13;

  var getRandomValue = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArray = function (array, length) {
    return array
      .slice(0)
      .sort(function () {
        return Math.random() - 0.5;
      })
      .splice(0, length);
  };

  return {
    getRandomArray: getRandomArray,
    getRandomValue: getRandomValue,
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY
  };
})();
