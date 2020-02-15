'use strict';

window.photos = (function () {
  var pictureEl = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var picturesContainerEl = document.querySelector('.pictures');

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

  // Заполняет блок DOM-элементами на основе массива фотографий и отрисовывет их в блок .pictures
  var render = function (photos) {
  // Генерируем фото
    var fragment = document.createDocumentFragment();

    // Создаем DOM-элементы и добавляет во фрагмент
    for (var i = 0; i < photos.length; i++) {
      var photo = photos[i];
      var element = createElement(photo);
      fragment.appendChild(element);
    }

    // Добавляем фрагмент со всеми фото на страницу
    picturesContainerEl.appendChild(fragment);
  };

  var onLoadSuccess = function (response) {
    render(response);
  };

  var onLoadError = function () {
    // code
  };

  window.api.fetchPhotos(
      onLoadSuccess,
      onLoadError
  );
})();
