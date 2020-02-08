'use strict';

window.preview = (function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigImage = bigPicture.querySelector('.big-picture__img');
  var likesBigImage = bigPicture.querySelector('.likes-count');
  var commentsBigImage = bigPicture.querySelector('.comments-count');
  var captionBigImage = bigPicture.querySelector('.social__caption');

  // Показывает большую фотографию с лайками и комментариями
  var showBigPicture = function (currentPhoto) {
    bigPicture.classList.remove('hidden');

    bigImage.src = currentPhoto.url;
    likesBigImage.textContent = currentPhoto.likes;
    commentsBigImage.textContent = currentPhoto.comments.length;
    captionBigImage.textContent = currentPhoto.description;

    window.comment.render(currentPhoto.comments);
  };

  return {
    showBigPicture: showBigPicture,
  };
})();
