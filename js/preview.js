'use strict';

window.preview = (function () {
  var DISPLAY_COMMENTS_COUNT = 5;
  var bodyEl = document.querySelector('body');
  var bigPictureEl = document.querySelector('.big-picture');
  var bigImgEl = bigPictureEl.querySelector('.big-picture__img img');
  var likesBigImgEl = bigPictureEl.querySelector('.likes-count');
  var commentsBigImgEl = bigPictureEl.querySelector('.comments-count');
  var captionBigImgEl = bigPictureEl.querySelector('.social__caption');
  var buttonEl = document.querySelector('.big-picture__cancel');
  var commentEl = document.querySelector('.social__footer-text');
  var commentsLoaderEl = bigPictureEl.querySelector('.comments-loader');
  var commentsCountEl = bigPictureEl.querySelector('.social__comment-count');
  var page = 0;
  var currentComments = [];

  var showBigPicture = function (currentPhoto) {
    page = 0;
    currentComments = currentPhoto.comments;
    bigImgEl.src = currentPhoto.url;
    likesBigImgEl.textContent = currentPhoto.likes;
    commentsBigImgEl.textContent = currentPhoto.comments.length;
    captionBigImgEl.textContent = currentPhoto.description;

    var commentsOnPage = getNextComments();
    window.comment.render(commentsOnPage);

    if (!isLastPage()) {
      commentsLoaderEl.classList.remove('hidden');
    } else {
      commentsLoaderEl.classList.add('hidden');
    }

    setNumberCommentsString(commentsOnPage);
    openBigPicture();
  };

  var setNumberCommentsString = function (commentsOnPage) {
    commentsCountEl.textContent = commentsOnPage.length + ' из ' + currentComments.length + ' комментариев';
  };

  var openBigPicture = function () {
    bigPictureEl.classList.remove('hidden');
    bodyEl.classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
    buttonEl.addEventListener('click', onButtonCloseClick);
    commentEl.addEventListener('keydown', onKeyDown);
    commentsLoaderEl.addEventListener('click', onCommentsLoaderClick);
  };

  var closeBigPicture = function () {
    bigPictureEl.classList.add('hidden');
    bodyEl.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
    buttonEl.removeEventListener('click', onButtonCloseClick);
    commentEl.removeEventListener('keydown', onKeyDown);
    commentsLoaderEl.removeEventListener('click', onCommentsLoaderClick);
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

  var getCommentsCountOnPage = function () {
    return DISPLAY_COMMENTS_COUNT * page;
  };

  var getNextComments = function () {
    page += 1;
    return currentComments.slice(0, getCommentsCountOnPage());
  };

  var isLastPage = function () {
    return currentComments.length <= getCommentsCountOnPage();
  };

  var onButtonCloseClick = function () {
    closeBigPicture();
  };

  var onCommentsLoaderClick = function () {
    var commentsOnPage = getNextComments();
    window.comment.render(commentsOnPage);

    if (isLastPage()) {
      commentsLoaderEl.classList.add('hidden');
    }

    setNumberCommentsString(commentsOnPage);
  };

  return {
    showBigPicture: showBigPicture,
  };
})();
