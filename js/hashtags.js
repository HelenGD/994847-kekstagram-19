'use strict';

window.hashtags = (function () {
  var HASHTAGS_MIN_LENGTH = 2;
  var HASHTAGS_MAX_LENGTH = 20;
  var HASHTAGS_MAX_COUNT = 5;
  var HASHTAG_REGEX = /^#[a-zA-Zа-яА-ЯёЁ0-9]+$/;

  var hashtagsInputEl = document.querySelector('.text__hashtags');
  var commentEl = document.querySelector('.text__description');
  var btnSubmitEl = document.querySelector('.img-upload__submit');

  var validateHashtag = function (hashtag) {
    if (hashtag.length < HASHTAGS_MIN_LENGTH) {
      return 'Минимальная длина одного хэш-тега 2 символа, включая решётку';
    }
    if (hashtag.length > HASHTAGS_MAX_LENGTH) {
      return 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
    }

    if (!HASHTAG_REGEX.test(hashtag)) {
      return 'Хэш-тег должен начинаться с # и содержать только буквы и цифры';
    }
    return '';
  };

  var checkUniqHashtag = function (hashtags) {
    var uniqHastagsMap = [];
    for (var i = 0; i < hashtags.length; i++) {
      if (uniqHastagsMap.includes(hashtags[i])) {
        return false;
      } else {
        uniqHastagsMap.push(hashtags[i]);
      }
    }
    return true;
  };

  var validate = function (hashtagsString) {
    var hashtags = toArray(hashtagsString);
    for (var i = 0; i < hashtags.length; i++) {
      var error = validateHashtag(hashtags[i]);
      if (error) {
        return error;
      }
    }
    if (hashtags.length > HASHTAGS_MAX_COUNT) {
      return 'Нельзя указать больше пяти хэш-тегов';
    }
    if (!checkUniqHashtag(hashtags)) {
      return 'Один и тот же хэш-тег не может быть использован дважды';
    }
    return '';
  };

  var toArray = function (hashtagStr) {
    var hashtags = hashtagStr
    .toLowerCase()
    .split(' ');
    return hashtags.filter(Boolean);
  };

  var onKeyDown = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY) {
      evt.stopPropagation();
    }
  };

  var onInput = function (evt) {
    var value = evt.target.value;
    var error = validate(value);
    evt.target.setCustomValidity(error);
    hideBorderError();
  };

  var showBorderError = function () {
    hashtagsInputEl.style.border = '2px solid red';
  };

  var hideBorderError = function () {
    hashtagsInputEl.style.border = '';
  };

  var onButtonSubmitClick = function () {
    var error = validate(hashtagsInputEl.value);
    if (error) {
      showBorderError();
    } else {
      hideBorderError();
    }
  };

  var init = function () {
    commentEl.addEventListener('keydown', onKeyDown);
    btnSubmitEl.addEventListener('click', onButtonSubmitClick);
    hashtagsInputEl.addEventListener('keydown', onKeyDown);
    hashtagsInputEl.addEventListener('input', onInput);
  };

  var reset = function () {
    commentEl.removeEventListener('keydown', onKeyDown);
    btnSubmitEl.removeEventListener('click', onButtonSubmitClick);
    hashtagsInputEl.removeEventListener('keydown', onKeyDown);
    hashtagsInputEl.removeEventListener('input', onInput);
  };

  return {
    reset: reset,
    init: init
  };
})();
