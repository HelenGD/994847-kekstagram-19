'use strict';

window.editor = (function () {
  var ESC_KEY = 27;
  var MAX_SATURATION = 1;
  var MAX_PHOBOS = 3;
  var MAX_HEAT = 3;
  var MIN_HEAT = 1;

  var bodyEl = document.querySelector('body');
  var popupEditImgEl = document.querySelector('.img-upload__overlay');
  var openPopupEditImgEl = document.querySelector('#upload-file');
  var closePopupEditImgEl = document.querySelector('#upload-cancel');
  var hashtagsInputEl = popupEditImgEl.querySelector('.text__hashtags');
  var effectLevelEl = popupEditImgEl.querySelector('.effect-level');
  var effectsRadiosEl = popupEditImgEl.querySelectorAll('.effects__radio');
  var imgUploadPreviewEl = popupEditImgEl.querySelector('.img-upload__preview');
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

  var showEffectLevelSlider = function () {
    effectLevelEl.classList.remove('hidden');
  };

  var hideEffectLevelSlider = function () {
    effectLevelEl.classList.add('hidden');
  };

  // Закрывает попап по нажатию на ESCAPE
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEY) {
      onClosePopup();
    }
  };

  var onEffectChange = function (evt) {
    if (currentEffect) {
      imgUploadPreviewEl.classList.remove(currentEffect.className);
    }

    currentEffect = effects[evt.target.value];

    if (currentEffect) {
      showEffectLevelSlider();
      imgUploadPreviewEl.classList.add(currentEffect.className);
      setSaturation(MAX_SATURATION);
      setSliderPosition(MAX_SATURATION);
    } else {
      hideEffectLevelSlider();
      resetEffect();
    }
  };

  var setSaturation = function (percent) {
    currentEffect.setSaturation(percent);
    effectLevelValueEl.value = percent * 100;
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

  var onFocusHastags = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onBlurHashtags = function () {
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onInputHashtags = function (evt) {
    var value = evt.target.value;
    var error = window.validation.validateHashtagsString(value);
    evt.target.setCustomValidity(error);
  };

  var resetEffect = function () {
    imgUploadPreviewEl.style.filter = '';
  };

  // Открывает попап
  var onOpenPopup = function () {
    popupEditImgEl.classList.remove('hidden');
    bodyEl.classList.add('modal-open');
    effectLevelEl.classList.add('hidden');
    effectLevelValueEl.value = 100;
  };

  // Закрывает попап
  var onClosePopup = function () {
    popupEditImgEl.classList.add('hidden');
    bodyEl.classList.remove('modal-open');
    openPopupEditImgEl.value = '';

    resetEffect();
    imgUploadPreviewEl.classList.remove(currentEffect.className);
    currentEffect = null;
  };

  openPopupEditImgEl.addEventListener('change', onOpenPopup);

  closePopupEditImgEl.addEventListener('click', onClosePopup);

  // Получает проценты насыщенности
  var getSaturationPercent = function (evt) {
    var rect = effectLevelLineEl.getBoundingClientRect();
    var offsetX = evt.clientX - rect.left;
    var percent = offsetX / rect.width;
    var roundedPercent = Math.min(1, Math.max(0, percent));

    return roundedPercent;
  };

  var onPinMouseUp = function () {
    document.removeEventListener('mousemove', onPinMouseMove);
    document.removeEventListener('mouseup', onPinMouseUp);
  };

  var onPinMouseMove = function (evt) {
    var percent = getSaturationPercent(evt);
    setSliderPosition(percent);
    setSaturation(percent);
  };

  var onPinMouseDown = function () {
    document.addEventListener('mouseup', onPinMouseUp);
    document.addEventListener('mousemove', onPinMouseMove);
  };

  document.addEventListener('keydown', onPopupEscPress);
  hashtagsInputEl.addEventListener('focus', onFocusHastags);
  hashtagsInputEl.addEventListener('blur', onBlurHashtags);
  hashtagsInputEl.addEventListener('input', onInputHashtags);
  effectLevelLineEl.addEventListener('mouseup', onSaturationChange);
  effectLevelPinEl.addEventListener('mousedown', onPinMouseDown);
  for (var radioIndex = 0; radioIndex < effectsRadiosEl.length; radioIndex++) {
    effectsRadiosEl[radioIndex].addEventListener('change', onEffectChange);
  }
})();
