'use strict';

window.scale = (function () {
  var scaleControlValueEl = document.querySelector('.scale__control--value');
  var imageUploadPreviewEl = document.querySelector('.img-upload__preview');
  var buttonZoomOutEl = document.querySelector('.scale__control--smaller');
  var buttonZoomInEl = document.querySelector('.scale__control--bigger');

  var Enum = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  var getZoom = function () {
    return parseInt(scaleControlValueEl.value, 10);
  };

  var onButtonZoomIn = function () {
    var valueScale = getZoom();
    if (valueScale < Enum.MAX) {
      valueScale += Enum.STEP;
    }
    setZoom(valueScale);
  };

  var onButtonZoomOut = function () {
    var valueScale = getZoom();
    if (valueScale > Enum.MIN) {
      valueScale -= Enum.STEP;
    }
    setZoom(valueScale);
  };

  var setZoom = function (valueScale) {
    scaleControlValueEl.value = valueScale + '%';
    imageUploadPreviewEl.style.transform = 'scale(' + (valueScale / Enum.MAX) + ')';
  };

  var reset = function () {
    setZoom(Enum.MAX);
  };

  buttonZoomInEl.addEventListener('click', onButtonZoomIn);
  buttonZoomOutEl.addEventListener('click', onButtonZoomOut);

  return {
    reset: reset
  };
})();
