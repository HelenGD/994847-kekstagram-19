'use strict';

window.preview = (function () {
  var DISPLAY_COMMENTS_COUNT = 5;
  var page = 0;
  var currentComments = [];
  var bigPictureEl = document.querySelector('.big-picture');
  var bigImageEl = bigPictureEl.querySelector('.big-picture__img img');
  var likesBigImageEl = bigPictureEl.querySelector('.likes-count');
  var commentsBigImageEl = bigPictureEl.querySelector('.comments-count');
  var captionBigImageEl = bigPictureEl.querySelector('.social__caption');
  var buttonEl = document.querySelector('.big-picture__cancel');
  var picturesContainerEl = document.querySelector('.pictures');
  var commentEl = document.querySelector('.social__footer-text');
  var commentsLoaderEl = bigPictureEl.querySelector('.comments-loader');
  var commentsCountEl = bigPictureEl.querySelector('.social__comment-count');

  // Показывает большую фотографию с лайками и комментариями
  var showBigPicture = function (currentPhoto) {
    page = 0;
    currentComments = currentPhoto.comments;
    bigImageEl.src = currentPhoto.url;
    likesBigImageEl.textContent = currentPhoto.likes;
    commentsBigImageEl.textContent = currentPhoto.comments.length;
    captionBigImageEl.textContent = currentPhoto.description;

    var commentsOnPage = getNextComments();
    window.comment.render(commentsOnPage);

    if (!isLastPage()) {
      commentsLoaderEl.classList.remove('hidden');
    }
    setNumberCommentsString(commentsOnPage);
    openBigPicture();
  };

  var setNumberCommentsString = function (commentsOnPage) {
    commentsCountEl.textContent = commentsOnPage.length + ' из ' + currentComments.length + ' комментариев';
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

  var isLastPage = function () {
    return currentComments.length <= DISPLAY_COMMENTS_COUNT * page;
  };

  var getNextComments = function () {
    page += 1;
    return currentComments.slice(0, DISPLAY_COMMENTS_COUNT * page);
  };

  buttonEl.addEventListener('click', function () {
    closeBigPicture();
  });

  commentEl.addEventListener('keydown', onKeyDown);

  commentsLoaderEl.addEventListener('click', function () {
    var commentsOnPage = getNextComments();
    window.comment.render(getNextComments());

    if (isLastPage()) {
      commentsLoaderEl.classList.add('hidden');
    }

    setNumberCommentsString(commentsOnPage);
  });

  return {
    showBigPicture: showBigPicture,
  };
})();
