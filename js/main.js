'use strict';

window.main = (function () {
  var mainBlockEl = document.querySelector('main');
  var templateSuccessEl = document.querySelector('#success').
    content.querySelector('.success');
  var templateErrorEl = document.querySelector('#error').
    content.querySelector('.error');

  var openPopup = function (popupEl) {
    mainBlockEl.appendChild(popupEl);

    var closePopup = function () {
      popupEl.remove();

      popupEl.removeEventListener('click', onButtonClick);
      document.removeEventListener('click', onSectionClick);
      document.removeEventListener('keydown', onPopupEscPress);
    };

    var onButtonClick = function (evt) {
      if (evt.target.nodeName === 'BUTTON') {
        closePopup();
      }
    };

    var onPopupEscPress = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEY) {
        closePopup();
      }
    };

    var onSectionClick = function (evt) {
      if (evt.target.nodeName === 'SECTION') {
        closePopup();
      }
    };

    popupEl.addEventListener('click', onButtonClick);
    document.addEventListener('click', onSectionClick);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var openPopupSuccess = function () {
    var popupSuccessEl = templateSuccessEl.cloneNode(true);
    openPopup(popupSuccessEl);
  };

  var openPopupError = function () {
    var popupErrorEl = templateErrorEl.cloneNode(true);
    openPopup(popupErrorEl);
  };

  return {
    openPopupError: openPopupError,
    openPopupSuccess: openPopupSuccess
  };
})();
