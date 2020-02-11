'use strict';

window.validation = (function () {
  var HASHTAGS_MIN_LENGTH = 2;
  var HASHTAGS_MAX_LENGTH = 20;
  var HASHTAGS_MAX_COUNT = 5;
  var HASHTAG_REGEX = /^#[a-zA-Zа-яА-ЯёЁ0-9]+$/;

  // Валидирует один хэштэг
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

  // Проверяет хэштэг на уникальность
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

  // Валидирует хэштэги
  var validateHashtags = function (hashtags) {
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
      return 'один и тот же хэш-тег не может быть использован дважды';
    }
    return '';
  };

  // Превращает набор хэштэгов в массив
  var hashtagsStringToArray = function (hashtagStr) {
    var hashtagArr = hashtagStr
    .toLowerCase()
    .split(' ');
    return hashtagArr.filter(Boolean);
  };

  var validateHashtagsString = function (hashtagsString) {
    return validateHashtags(hashtagsStringToArray(hashtagsString));
  };

  return {
    validateHashtagsString: validateHashtagsString,
  };
})();
