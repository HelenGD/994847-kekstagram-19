'use strict';

window.photos = (function () {
  var PICTURE_VALUE = 10;

  var pictureEl = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var picturesContainerEl = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
  var defaultPhotos = [];

  // Cоздает DOM-элемент на основе шаблона
  var createElement = function (photo) {
    var element = pictureEl.cloneNode(true);
    var img = element.querySelector('.picture__img');
    img.src = photo.url;

    var likes = element.querySelector('.picture__likes');
    likes.textContent = photo.likes;

    var comments = element.querySelector('.picture__comments');
    comments.textContent = photo.comments.length;

    return element;
  };

  var registerShowPreview = function (element, photo) {
    element.addEventListener('click', function () {
      window.preview.showBigPicture(photo);
    });
  };

  var clear = function () {
    picturesContainerEl
      .querySelectorAll('.picture')
      .forEach(function (itemEl) {
        itemEl.remove();
      });
  };

  // Заполняет блок DOM-элементами на основе массива фотографий и отрисовывет их в блок .pictures
  var render = function (photos) {
    clear();
    // Генерируем фото
    var fragment = document.createDocumentFragment();

    // Создаем DOM-элементы и добавляет во фрагмент
    for (var i = 0; i < photos.length; i++) {
      var photo = photos[i];
      var element = createElement(photo);
      registerShowPreview(element, photo);
      fragment.appendChild(element);
    }

    // Добавляем фрагмент со всеми фото на страницу
    picturesContainerEl.appendChild(fragment);
  };

  var onLoadSuccess = function (response) {
    render(response);
    defaultPhotos = response;
    imgFilters.classList.remove('img-filters--inactive');
  };

  var onLoadError = function () {
    // code
  };

  var getDiscussedPhotos = function () {
    return defaultPhotos
      .slice(0)
      .sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
  };

  var handleFilterChange = window.debounce(function (filterType) {
    if (filterType === 'random') {
      render(window.utils.getRandomArray(defaultPhotos, PICTURE_VALUE));
    } else if (filterType === 'discussed') {
      render(getDiscussedPhotos());
    } else {
      render(defaultPhotos);
    }
  });

  window.filter.onChange(handleFilterChange);

  window.backend.loadPhotos(
      onLoadSuccess,
      onLoadError
  );
})();
