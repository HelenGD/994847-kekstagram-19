'use strict';

window.preview = (function () {
  var bigPictureEl = document.querySelector('.big-picture');
  var bigImageEl = bigPictureEl.querySelector('.big-picture__img');
  var likesBigImageEl = bigPictureEl.querySelector('.likes-count');
  var commentsBigImageEl = bigPictureEl.querySelector('.comments-count');
  var captionBigImageEl = bigPictureEl.querySelector('.social__caption');

  // Показывает большую фотографию с лайками и комментариями
  var showBigPicture = function (currentPhoto) {
    bigPictureEl.classList.remove('hidden');

    bigImageEl.src = currentPhoto.url;
    likesBigImageEl.textContent = currentPhoto.likes;
    commentsBigImageEl.textContent = currentPhoto.comments.length;
    captionBigImageEl.textContent = currentPhoto.description;

    window.comment.render(currentPhoto.comments);
  };

  return {
    showBigPicture: showBigPicture,
  };
})();
