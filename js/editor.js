'use strict';

window.editor = (function () {
  var bodyEl = document.querySelector('body');
  var popupEditImgEl = document.querySelector('.img-upload__overlay');
  var openPopupEditImgEl = document.querySelector('#upload-file');
  var closePopupEditImgEl = document.querySelector('#upload-cancel');
  var formEl = document.querySelector('.img-upload__form');
  var hashtagsInputEl = document.querySelector('.text__hashtags');
  var descriptionInputEl = document.querySelector('.text__description');


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
    formEl.addEventListener('submit', onFormSubmit);
  };

  // Закрывает попап
  var onClosePopup = function () {
    popupEditImgEl.classList.add('hidden');
    bodyEl.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
    resetForm();
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.api.sendPhotos(new FormData(formEl), window.main.openPopupSuccess, window.main.openPopupError);
    onClosePopup();
  };

  var resetForm = function () {
    openPopupEditImgEl.value = '';
    hashtagsInputEl.value = '';
    descriptionInputEl.value = '';
  };

  openPopupEditImgEl.addEventListener('change', onOpenPopup);
  closePopupEditImgEl.addEventListener('click', onClosePopup);
})();
