
'use strict';

window.upload = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var imgPreviewEl = document.querySelector('.img-upload__preview img');
  var effectsPreviewEl = document.querySelectorAll('.effects__preview');
  var openPopupEditImgEl = document.querySelector('.img-upload__input');

  var setPreviews = function (src) {
    imgPreviewEl.src = src;
    effectsPreviewEl.forEach(function (item) {
      item.style.backgroundImage = 'url(' + src + ')';
    });
  };

  var reset = function () {
    setPreviews('img/upload-default-image.jpg');
  };

  var sendNewImg = function () {
    reset();

    var file = openPopupEditImgEl.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var objectUrl = URL.createObjectURL(file);
      setPreviews(objectUrl);
    }
  };

  return {
    sendNewImg: sendNewImg,
  };
})();
