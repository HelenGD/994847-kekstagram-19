'use strict';

window.editPhoto = (function () {
  var ESC_KEY = 27;

  var EFFECT_CHROME = 'chrome';
  var EFFECT_NONE = 'none';
  var EFFECT_SEPIA = 'sepia';
  var EFFECT_MARVIN = 'marvin';
  var EFFECT_PHOBOS = 'phobos';
  var EFFECT_HEAT = 'heat';

  var parseHashtags = window.util.parseHashtags;
  var validateHashtags = window.util.validateHashtags;

  var body = document.querySelector('body');
  var popupEditImg = document.querySelector('.img-upload__overlay');
  var openPopupEditImg = document.querySelector('#upload-file');
  var closePopupEditImg = document.querySelector('#upload-cancel');
  var hashtagsInput = popupEditImg.querySelector('.text__hashtags');
  var effectLevelEl = popupEditImg.querySelector('.effect-level');
  var effectsRadios = popupEditImg.querySelectorAll('.effects__radio');
  var imgUploadPreviewEl = popupEditImg.querySelector('.img-upload__preview');
  var currentEffect = EFFECT_NONE;

  // Закрывает попап по нажатию на ESCAPE
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEY) {
      onClosePopup();
    }
  };

  // Устанавливает эффект, принимает процент
  var setEffect = function (percent) {
    if (currentEffect === EFFECT_CHROME) {
      setFilterGrayscale(percent);
    } else if (currentEffect === EFFECT_SEPIA) {
      setFilterSepia(percent);
    } else if (currentEffect === EFFECT_MARVIN) {
      setFilterInvert(percent);
    } else if (currentEffect === EFFECT_PHOBOS) {
      setFilterBlur(percent);
    } else if (currentEffect === EFFECT_HEAT) {
      setFilterBrightness(percent);
    } else if (currentEffect === EFFECT_NONE) {
      resetFilter();
    }
  };

  var onEffectChange = function (evt) {
    currentEffect = evt.target.value;
    setEffect(1);
  };

  var onSaturationChange = function (evt) {
    var percent = getSaturationPercent(evt);
    setEffect(percent);
  };

  var onFocusHastags = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onBlurHashtags = function () {
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onInputHashtags = function (evt) {
    var value = evt.target.value;
    var error = validateHashtags(parseHashtags(value));
    evt.target.setCustomValidity(error);
  };

  // Открывает попап
  var onOpenPopup = function () {
    popupEditImg.classList.remove('hidden');
    body.classList.add('modal-open');
  };

  // Закрывает попап
  var onClosePopup = function () {
    popupEditImg.classList.add('hidden');
    body.classList.remove('modal-open');
    openPopupEditImg.value = '';

    resetFilter();
    currentEffect = EFFECT_NONE;
  };

  openPopupEditImg.addEventListener('change', onOpenPopup);

  closePopupEditImg.addEventListener('click', onClosePopup);

  // Устанавливает эффект "Хром"
  var setFilterGrayscale = function (percent) {
    imgUploadPreviewEl.style.filter = 'grayscale(' + percent + ')';
  };

  // Устанавливает эффект "Сепия"
  var setFilterSepia = function (percent) {
    imgUploadPreviewEl.style.filter = 'sepia(' + percent + ')';
  };

  // Устанавливает эффект "Марвин"
  var setFilterInvert = function (percent) {
    imgUploadPreviewEl.style.filter = 'invert(' + percent * 100 + '%)';
  };

  // Устанавливает эффект "Фобос"
  var setFilterBlur = function (percent) {
    imgUploadPreviewEl.style.filter = 'blur(' + 3 * percent + 'px)';
  };

  // Устанавливает эффект "Зной"
  var setFilterBrightness = function (percent) {
    imgUploadPreviewEl.style.filter = 'brightness(' + 3 * percent + ')';
  };

  // Сбрасывает эффект
  var resetFilter = function () {
    imgUploadPreviewEl.style.filter = '';
  };

  // Получает проценты насыщенности
  var getSaturationPercent = function (evt) {
    var rect = evt.target.getBoundingClientRect();
    var offsetX = evt.clientX - rect.left;
    var percent = offsetX / rect.width;

    return percent;
  };

  document.addEventListener('keydown', onPopupEscPress);
  hashtagsInput.addEventListener('focus', onFocusHastags);
  hashtagsInput.addEventListener('blur', onBlurHashtags);
  hashtagsInput.addEventListener('input', onInputHashtags);
  effectLevelEl.addEventListener('mouseup', onSaturationChange);
  for (var radioIndex = 0; radioIndex < effectsRadios.length; radioIndex++) {
    effectsRadios[radioIndex].addEventListener('change', onEffectChange);
  }
})();
