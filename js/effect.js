'use strict';

window.effect = (function () {
  var MAX_SATURATION = 1;
  var MAX_PHOBOS = 3;
  var MAX_HEAT = 3;
  var MIN_HEAT = 1;
  var MAX_EFFECT_VALUE = 100;

  var effectLevelEl = document.querySelector('.effect-level');
  var effectsRadiosEl = document.querySelectorAll('.effects__radio');
  var imgPreviewEl = document.querySelector('.img-upload__preview img');
  var effectLevelValueEl = document.querySelector('.effect-level__value');
  var effectLevelLineEl = document.querySelector('.effect-level__line');
  var effectLevelPinEl = document.querySelector('.effect-level__pin');
  var depthRangeEl = document.querySelector('.effect-level__depth');
  var currentEffect = null;

  var effects = {
    chrome: {
      setSaturation: function (percent) {
        imgPreviewEl.style.filter = 'grayscale(' + percent + ')';
      },
      className: 'effects__preview--chrome',
    },
    sepia: {
      setSaturation: function (percent) {
        imgPreviewEl.style.filter = 'sepia(' + percent + ')';
      },
      className: 'effects__preview--sepia',
    },
    marvin: {
      setSaturation: function (percent) {
        imgPreviewEl.style.filter = 'invert(' + percent * 100 + '%)';
      },
      className: 'effects__preview--marvin',
    },
    phobos: {
      setSaturation: function (percent) {
        imgPreviewEl.style.filter = 'blur(' + MAX_PHOBOS * percent + 'px)';
      },
      className: 'effects__preview--phobos',
    },
    heat: {
      setSaturation: function (percent) {
        imgPreviewEl.style.filter = 'brightness(' + ((MAX_HEAT - MIN_HEAT) * percent + MIN_HEAT) + ')';
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

  var removeCurrentEffect = function () {
    if (currentEffect) {
      imgPreviewEl.classList.remove(currentEffect.className);
    }
  };

  var onChange = function (evt) {
    removeCurrentEffect();
    currentEffect = effects[evt.target.value];

    if (currentEffect) {
      showLevelSlider();
      imgPreviewEl.classList.add(currentEffect.className);
      setSaturation(MAX_SATURATION);
      setSliderPosition(MAX_SATURATION);
    } else {
      setDefaults();
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
    onPinMouseUp();
    effectLevelLineEl.removeEventListener('mouseup', onSaturationChange);
    effectLevelPinEl.removeEventListener('mousedown', onPinMouseDown);
    for (var radioIndex = 0; radioIndex < effectsRadiosEl.length; radioIndex++) {
      effectsRadiosEl[radioIndex].removeEventListener('change', onChange);
    }
  };

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

  var setDefaults = function () {
    removeCurrentEffect();
    imgPreviewEl.style.filter = '';
    hideLevelSlider();
    effectLevelValueEl.value = MAX_EFFECT_VALUE;
    currentEffect = null;
    effectsRadiosEl[0].checked = true;
  };

  var init = function () {
    setDefaults();

    effectLevelLineEl.addEventListener('mouseup', onSaturationChange);
    effectLevelPinEl.addEventListener('mousedown', onPinMouseDown);
    for (var radioIndex = 0; radioIndex < effectsRadiosEl.length; radioIndex++) {
      effectsRadiosEl[radioIndex].addEventListener('change', onChange);
    }
  };

  return {
    init: init,
    reset: reset
  };
})();
