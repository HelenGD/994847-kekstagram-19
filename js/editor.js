'use strict';

window.editor = (function () {
  var ESC_KEY = 27;

  var body = document.querySelector('body');
  var popupEditImg = document.querySelector('.img-upload__overlay');
  var openPopupEditImg = document.querySelector('#upload-file');
  var closePopupEditImg = document.querySelector('#upload-cancel');
  var hashtagsInput = popupEditImg.querySelector('.text__hashtags');
  var effectLevelEl = popupEditImg.querySelector('.effect-level');
  var effectsRadios = popupEditImg.querySelectorAll('.effects__radio');
  var imgUploadPreviewEl = popupEditImg.querySelector('.img-upload__preview');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var currentEffect = null;

  var effects = {
    chrome: function (percent) {
      imgUploadPreviewEl.style.filter = 'grayscale(' + percent + ')';
    },
    sepia: function (percent) {
      imgUploadPreviewEl.style.filter = 'sepia(' + percent + ')';
    },
    marvin: function (percent) {
      imgUploadPreviewEl.style.filter = 'invert(' + percent * 100 + '%)';
    },
    phobos: function (percent) {
      imgUploadPreviewEl.style.filter = 'blur(' + 3 * percent + 'px)';
    },
    heat: function (percent) {
      imgUploadPreviewEl.style.filter = 'brightness(' + (2 * percent + 1) + ')';
    }
  };

  // Закрывает попап по нажатию на ESCAPE
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEY) {
      onClosePopup();
    }
  };

  var onEffectChange = function (evt) {
    if (currentEffect) {
      imgUploadPreviewEl.classList.remove('effects__preview--' + currentEffect);
    }

    if (evt.target.value !== 'none') {
      currentEffect = evt.target.value;
      effectLevelEl.classList.remove('hidden');
      imgUploadPreviewEl.classList.add('effects__preview--' + currentEffect);
      var setEffect = effects[currentEffect];
      setEffect(1);
    } else {
      currentEffect = null;
      effectLevelEl.classList.add('hidden');
      resetEffect();
    }
    effectLevelValue.value = 100;
  };

  var onSaturationChange = function (evt) {
    var percent = getSaturationPercent(evt);
    var setEffect = effects[currentEffect];
    setEffect(percent);
    effectLevelValue.value = percent * 100;
  };

  var onFocusHastags = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onBlurHashtags = function () {
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onInputHashtags = function (evt) {
    var value = evt.target.value;
    var error = window.validation.validateHashtags(window.validation.parseHashtags(value));
    evt.target.setCustomValidity(error);
  };

  var resetEffect = function () {
    imgUploadPreviewEl.style.filter = '';
  };

  // Открывает попап
  var onOpenPopup = function () {
    popupEditImg.classList.remove('hidden');
    body.classList.add('modal-open');
    effectLevelEl.classList.add('hidden');
    effectLevelValue.value = 100;
  };

  // Закрывает попап
  var onClosePopup = function () {
    popupEditImg.classList.add('hidden');
    body.classList.remove('modal-open');
    openPopupEditImg.value = '';

    resetEffect();
    imgUploadPreviewEl.classList.remove('effects__preview--' + currentEffect);
    currentEffect = null;
  };

  openPopupEditImg.addEventListener('change', onOpenPopup);

  closePopupEditImg.addEventListener('click', onClosePopup);

  // Получает проценты насыщенности
  var getSaturationPercent = function (evt) {
    var rect = effectLevelLine.getBoundingClientRect();
    var offsetX = evt.clientX - rect.left;
    var percent = offsetX / rect.width;

    return Math.min(1, Math.max(0, percent));
  };

  document.addEventListener('keydown', onPopupEscPress);
  hashtagsInput.addEventListener('focus', onFocusHastags);
  hashtagsInput.addEventListener('blur', onBlurHashtags);
  hashtagsInput.addEventListener('input', onInputHashtags);
  effectLevelLine.addEventListener('mouseup', onSaturationChange);
  for (var radioIndex = 0; radioIndex < effectsRadios.length; radioIndex++) {
    effectsRadios[radioIndex].addEventListener('change', onEffectChange);
  }
})();
