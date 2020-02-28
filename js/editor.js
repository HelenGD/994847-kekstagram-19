'use strict';

window.editor = (function () {
  var bodyEl = document.querySelector('body');
  var popupEditImgEl = document.querySelector('.img-upload__overlay');
  var openPopupEditImgEl = document.querySelector('.img-upload__input');
  var closePopupEditImgEl = document.querySelector('.img-upload__cancel');
  var formEl = document.querySelector('.img-upload__form');
  var hashtagsInputEl = document.querySelector('.text__hashtags');
  var descriptionInputEl = document.querySelector('.text__description');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY) {
      onClosePopup();
    }
  };

  var onOpenPopup = function () {
    popupEditImgEl.classList.remove('hidden');
    bodyEl.classList.add('modal-open');
    window.upload.addNewImg();
    window.scale.init();
    window.effect.init();
    window.hashtags.init();
    closePopupEditImgEl.addEventListener('click', onClosePopup);
    document.addEventListener('keydown', onPopupEscPress);
    formEl.addEventListener('submit', onFormSubmit);
  };

  var onClosePopup = function () {
    popupEditImgEl.classList.add('hidden');
    bodyEl.classList.remove('modal-open');
    hashtagsInputEl.style.border = '2px solid transparent';
    resetForm();
    window.scale.reset();
    window.effect.reset();
    window.hashtags.reset();
    closePopupEditImgEl.removeEventListener('click', onClosePopup);
    document.removeEventListener('keydown', onPopupEscPress);
    formEl.removeEventListener('submit', onFormSubmit);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.sendPhoto(new FormData(formEl), window.popups.showLoadSuccess, window.popups.showLoadError);
    onClosePopup();
  };

  var resetForm = function () {
    openPopupEditImgEl.value = '';
    hashtagsInputEl.value = '';
    descriptionInputEl.value = '';
  };

  openPopupEditImgEl.addEventListener('change', onOpenPopup);
})();
