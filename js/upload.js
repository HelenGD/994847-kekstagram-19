'use strict';

window.upload = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var imgPreviewEl = document.querySelector('.img-upload__preview img');
  var effectsPreviewEl = document.querySelectorAll('.effects__preview');
  var openPopupEditImgEl = document.querySelector('#upload-file');

  var setFileLoad = function () {
    var file = openPopupEditImgEl.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgPreviewEl.src = reader.result;
        effectsPreviewEl.forEach(function (item) {
          item.style.backgroundImage = 'url(' + reader.result + ')';
        });
      });

      reader.readAsDataURL(file);
    }
  };
  return {
    setFileLoad: setFileLoad
  };
})();
