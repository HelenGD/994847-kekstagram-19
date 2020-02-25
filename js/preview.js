'use strict';

window.preview = (function () {
  var DISPLAY_COMMENTS_COUNT = 5;
  var bigPictureEl = document.querySelector('.big-picture');
  var bigImageEl = bigPictureEl.querySelector('.big-picture__img img');
  var likesBigImageEl = bigPictureEl.querySelector('.likes-count');
  var commentsBigImageEl = bigPictureEl.querySelector('.comments-count');
  var captionBigImageEl = bigPictureEl.querySelector('.social__caption');
  var buttonEl = document.querySelector('.big-picture__cancel');
  var picturesContainerEl = document.querySelector('.pictures');
  var commentEl = document.querySelector('.social__footer-text');
  var commentsLoaderEl = bigPictureEl.querySelector('.comments-loader');

  // Показывает большую фотографию с лайками и комментариями
  var showBigPicture = function (currentPhoto) {

    bigImageEl.src = currentPhoto.url;
    likesBigImageEl.textContent = currentPhoto.likes;
    commentsBigImageEl.textContent = currentPhoto.comments.length;
    captionBigImageEl.textContent = currentPhoto.description;

    window.comment.render(currentPhoto.comments.slice(0, DISPLAY_COMMENTS_COUNT));
    openBigPicture();
  };

  var openBigPicture = function () {
    bigPictureEl.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    commentsLoaderEl.addEventListener('click', window.comment.onLoaderClick);
  };

  var closeBigPicture = function () {
    bigPictureEl.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY) {
      closeBigPicture();
    }
  };

  var onKeyDown = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY) {
      evt.stopPropagation();
    }
  };

  picturesContainerEl.addEventListener('keydown', function (evt) {
    var isKeyEnter = evt.keyCode === window.utils.ENTER_KEY;
    var isPictureEl = evt.target.classList.contains('picture');
    if (isKeyEnter && isPictureEl) {
      openBigPicture();
    }
  });

  buttonEl.addEventListener('click', function () {
    closeBigPicture();
  });

  commentEl.addEventListener('keydown', onKeyDown);

  return {
    showBigPicture: showBigPicture,
  };
})();
