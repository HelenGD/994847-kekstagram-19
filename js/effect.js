'use strict';

window.effect = (function () {
  var MAX_SATURATION = 1;
  var MAX_PHOBOS = 3;
  var MAX_HEAT = 3;
  var MIN_HEAT = 1;

  var effectLevelEl = document.querySelector('.effect-level');
  var effectsRadiosEl = document.querySelectorAll('.effects__radio');
  var imgUploadPreviewEl = document.querySelector('.img-upload__preview');
  var effectLevelValueEl = document.querySelector('.effect-level__value');
  var effectLevelLineEl = document.querySelector('.effect-level__line');
  var effectLevelPinEl = document.querySelector('.effect-level__pin');
  var depthRangeEl = document.querySelector('.effect-level__depth');
  var currentEffect = null;

  var effects = {
    chrome: {
      setSaturation: function (percent) {
        imgUploadPreviewEl.style.filter = 'grayscale(' + percent + ')';
      },
      className: 'effects__preview--chrome',
    },
    sepia: {
      setSaturation: function (percent) {
        imgUploadPreviewEl.style.filter = 'sepia(' + percent + ')';
      },
      className: 'effects__preview--sepia',
    },
    marvin: {
      setSaturation: function (percent) {
        imgUploadPreviewEl.style.filter = 'invert(' + percent * 100 + '%)';
      },
      className: 'effects__preview--marvin',
    },
    phobos: {
      setSaturation: function (percent) {
        imgUploadPreviewEl.style.filter = 'blur(' + MAX_PHOBOS * percent + 'px)';
      },
      className: 'effects__preview--phobos',
    },
    heat: {
      setSaturation: function (percent) {
        imgUploadPreviewEl.style.filter = 'brightness(' + ((MAX_HEAT - MIN_HEAT) * percent + MIN_HEAT) + ')';
      },
      className: 'effects__preview--heat',
    }
  };

  var showLevelSlider = function () {
    effectLevelEl.classList.remove('hidden');
  };

  var hideLevelSlider = function () {
    effectLevelEl.classList.add('hidden');
  };

  var onChange = function (evt) {
    if (currentEffect) {
      imgUploadPreviewEl.classList.remove(currentEffect.className);
    }

    currentEffect = effects[evt.target.value];

    if (currentEffect) {
      showLevelSlider();
      imgUploadPreviewEl.classList.add(currentEffect.className);
      setSaturation(MAX_SATURATION);
      setSliderPosition(MAX_SATURATION);
    } else {
      hideLevelSlider();
      reset();
    }
  };

  var setSaturation = function (percent) {
    currentEffect.setSaturation(percent);
    effectLevelValueEl.value = Math.round(percent * 100);
  };

  var setSliderPosition = function (percent) {
    var offset = percent * 100;
    effectLevelPinEl.style.left = offset + '%';
    depthRangeEl.style.width = offset + '%';
  };

  var onSaturationChange = function (evt) {
    var percent = getSaturationPercent(evt);
    setSaturation(percent);
    setSliderPosition(percent);
  };

  var reset = function () {
    if (currentEffect) {
      imgUploadPreviewEl.classList.remove(currentEffect.className);
    }
    imgUploadPreviewEl.style.filter = '';
    effectLevelEl.classList.add('hidden');
    effectLevelValueEl.value = 100;
    currentEffect = null;
  };

  // Получает проценты насыщенности
  var getSaturationPercent = function (evt) {
    var rect = effectLevelLineEl.getBoundingClientRect();
    var offsetX = evt.clientX - rect.left;
    var percent = offsetX / rect.width;
    var roundedPercent = Math.min(1, Math.max(0, percent));

    return roundedPercent;
  };

  var onPinMouseUp = function () {
    document.removeEventListener('mousemove', onSaturationChange);
    document.removeEventListener('mouseup', onPinMouseUp);
  };

  var onPinMouseDown = function () {
    document.addEventListener('mouseup', onPinMouseUp);
    document.addEventListener('mousemove', onSaturationChange);
  };

  effectLevelLineEl.addEventListener('mouseup', onSaturationChange);
  effectLevelPinEl.addEventListener('mousedown', onPinMouseDown);
  for (var radioIndex = 0; radioIndex < effectsRadiosEl.length; radioIndex++) {
    effectsRadiosEl[radioIndex].addEventListener('change', onChange);
  }

  return {
    reset: reset
  };
})();