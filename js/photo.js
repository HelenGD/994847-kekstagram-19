'use strict';

window.photo = (function () {
  var PHOTOS_MAX_COUNT = 25;
  var PHOTOS_MIN_LIKES_COUNT = 25;
  var PHOTOS_MAX_LIKES_COUNT = 200;

  var pictureEl = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var picturesContainerEl = document.querySelector('.pictures');

  // Создает объект с описанием фотографии
  var createPhoto = function (id, description, likes, comments) {
    return {
      url: 'photos/' + id + '.jpg',
      description: description,
      likes: likes,
      comments: comments
    };
  };

  // Создает массив из 25 объектов фотографий
  var createPhotos = function () {
    var pictures = [];
    for (var i = 0; i < PHOTOS_MAX_COUNT; i++) {
    // Генерируем случайные комменты
      var photoComments = window.comment.create();
      var id = i + 1;
      var title = 'Это моя фотография';
      var likes = window.utils.getRandomValue(PHOTOS_MIN_LIKES_COUNT, PHOTOS_MAX_LIKES_COUNT);
      pictures.push(createPhoto(id, title, likes, photoComments));
    }
    return pictures;
  };

  // Cоздает DOM-элемент на основе шаблона
  var createPhotoElement = function (photo) {
    var photoElement = pictureEl.cloneNode(true);
    var img = photoElement.querySelector('.picture__img');
    img.src = photo.url;

    var likes = photoElement.querySelector('.picture__likes');
    likes.textContent = photo.likes;

    var comments = photoElement.querySelector('.picture__comments');
    comments.textContent = photo.comments.length;

    return photoElement;
  };

  // Заполняет блок DOM-элементами на основе массива фотографий и отрисовывет их в блок .pictures
  var renderPhotos = function (photos) {
  // Генерируем фото
    var fragment = document.createDocumentFragment();

    // Создаем DOM-элементы и добавляет во фрагмент
    for (var i = 0; i < photos.length; i++) {
      var photo = photos[i];
      var photoElement = createPhotoElement(photo);
      fragment.appendChild(photoElement);
    }

    // Добавляем фрагмент со всеми фото на страницу
    picturesContainerEl.appendChild(fragment);
  };

  // var photos = createPhotos();
  // Добавляет большую фотографию на страницу;
  // Добавляет фотографии на страницу
  // renderPhotos(photos);

  window.api.fetchPhotos(
      function (response) {
        window.photo.render(response);
      }
  );

  return {
    create: createPhotos,
    render: renderPhotos,
  };
})();
