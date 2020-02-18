'use strict';

window.editor = (function () {
  var bodyEl = document.querySelector('body');
  var popupEditImgEl = document.querySelector('.img-upload__overlay');
  var openPopupEditImgEl = document.querySelector('#upload-file');
  var closePopupEditImgEl = document.querySelector('#upload-cancel');

  // Закрывает попап по нажатию на ESCAPE
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY) {
      onClosePopup();
    }
  };

  // Открывает попап
  var onOpenPopup = function () {
    popupEditImgEl.classList.remove('hidden');
    bodyEl.classList.add('modal-open');
    window.scale.reset();
    window.effect.reset();
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Закрывает попап
  var onClosePopup = function () {
    popupEditImgEl.classList.add('hidden');
    bodyEl.classList.remove('modal-open');
    openPopupEditImgEl.value = '';
    document.removeEventListener('keydown', onPopupEscPress);
  };

  openPopupEditImgEl.addEventListener('change', onOpenPopup);
  closePopupEditImgEl.addEventListener('click', onClosePopup);
})();
