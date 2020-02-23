'use strict';

window.scale = (function () {
  var MIN = 25;
  var MAX = 100;
  var STEP = 25;

  var scaleControlValueEl = document.querySelector('.scale__control--value');
  var imageUploadPreviewEl = document.querySelector('.img-upload__preview');
  var buttonZoomOutEl = document.querySelector('.scale__control--smaller');
  var buttonZoomInEl = document.querySelector('.scale__control--bigger');

  var getValue = function () {
    return parseInt(scaleControlValueEl.value, 10);
  };

  var onButtonZoomInPressed = function () {
    var valueScale = getValue();
    if (valueScale < MAX) {
      valueScale += STEP;
    }
    setValue(valueScale);
  };

  var onButtonZoomOutPressed = function () {
    var valueScale = getValue();
    if (valueScale > MIN) {
      valueScale -= STEP;
    }
    setValue(valueScale);
  };

  var setValue = function (valueScale) {
    scaleControlValueEl.value = valueScale + '%';
    imageUploadPreviewEl.style.transform = 'scale(' + (valueScale / MAX) + ')';
  };

  var reset = function () {
    setValue(MAX);
  };

  buttonZoomInEl.addEventListener('click', onButtonZoomInPressed);
  buttonZoomOutEl.addEventListener('click', onButtonZoomOutPressed);

  return {
    reset: reset
  };
})();
