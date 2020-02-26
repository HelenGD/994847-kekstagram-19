'use strict';

window.photos = (function () {
  var PICTURE_VALUE = 10;

  var pictureEl = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var picturesEl = document.querySelector('.pictures');
  var imgFiltersEl = document.querySelector('.img-filters');
  var initialPictures = [];

  var createElement = function (photo) {
    var element = pictureEl.cloneNode(true);
    var imgEl = element.querySelector('.picture__img');
    imgEl.src = photo.url;

    var likesEl = element.querySelector('.picture__likes');
    likesEl.textContent = photo.likes;

    var commentsEl = element.querySelector('.picture__comments');
    commentsEl.textContent = photo.comments.length;

    return element;
  };

  var registerShowPreview = function (element, photo) {
    element.addEventListener('click', function () {
      window.preview.showBigPicture(photo);
    });
  };

  var clear = function () {
    picturesEl
      .querySelectorAll('.picture')
      .forEach(function (itemEl) {
        itemEl.remove();
      });
  };

  var render = function (photos) {
    clear();
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      var photo = photos[i];
      var element = createElement(photo);
      registerShowPreview(element, photo);
      fragment.appendChild(element);
    }

    picturesEl.appendChild(fragment);
  };

  var onLoadSuccess = function (response) {
    render(response);
    initialPictures = response;
    imgFiltersEl.classList.remove('img-filters--inactive');
  };

  var onLoadError = function () {
  };

  var getDiscussedPhotos = function () {
    return initialPictures
      .slice(0)
      .sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
  };

  var onFilterChange = window.debounce(function (filterType) {
    if (filterType === 'random') {
      render(window.utils.getRandomArray(initialPictures, PICTURE_VALUE));
    } else if (filterType === 'discussed') {
      render(getDiscussedPhotos());
    } else {
      render(initialPictures);
    }
  });

  window.filter.onChange(onFilterChange);

  window.backend.loadPhotos(
      onLoadSuccess,
      onLoadError
  );
})();
