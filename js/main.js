'use strict';

// Генерирует случайное число от min до max
var random = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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
  var photos = [];
  for (var i = 0; i <= 25; i++) {
    // Генерируем случайные комменты
    var photoComments = createComments();
    photos.push(createPhoto(i + 1, 'desc', random(15, 200), photoComments));
  }
  return photos;
};

// Создает один объект comment
var createComment = function (avatarId, message, name) {
  return {
    avatar: 'img/avatar-' + avatarId + '.svg',
    message: message,
    name: name
  };
};

// Создает массив объектов comments
var createComments = function () {
  var names = ['Ваня', 'Петя', 'Коля', 'Семен', 'Игорь'];
  // Берем случайный индекс
  var name = names[random(0, names.length - 1)];

  var messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var message = messages[random(0, messages.length - 1)];

  var comments = [
    createComment(random(1, 6), message, name)
  ];
  return comments;
};

// Cоздает DOM-элемент на основе шаблона
var createPicture = function (picturePhoto) {
  var picture = document.querySelector('#picture')
    .content
    .querySelector('.picture')
    .cloneNode(true);
  var img = picture.querySelector('.picture__img');
  img.src = picturePhoto.url;

  var likes = picture.querySelector('.picture__likes');
  likes.textContent = picturePhoto.likes;

  var comments = picture.querySelector('.picture__comments');
  comments.textContent = picturePhoto.comments.length;

  return picture;
};

// Заполняет блок DOM-элементами на основе массива фотографий и отрисовывет их в блок .pictures
var createPictures = function () {
  // Генерируем фото
  var photos = createPhotos();
  var fragment = document.createDocumentFragment();

  // Создаем DOM-элементы и добавляет во фрагмент
  for (var i = 0; i < photos.length - 1; i++) {
    var photo = photos[i];
    var picture = createPicture(photo);
    fragment.appendChild(picture);
  }

  var picturesContainer = document.querySelector('.pictures');
  // Добавляем фрагмент со всеми фото на страницу
  picturesContainer.appendChild(fragment);
};

// Добавляет фотографии на страницу
createPictures();
