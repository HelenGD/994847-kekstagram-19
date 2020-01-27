'use strict';

// Генерирует случайное число от min до max
var getRandomValue = function (min, max) {
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
  for (var i = 0; i < 25; i++) {
    // Генерируем случайные комменты
    var photoComments = createComments();
    photos.push(createPhoto(i + 1, 'Это моя фотография', getRandomValue(15, 200), photoComments));
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
  var name = names[getRandomValue(0, names.length - 1)];

  var messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var message = messages[getRandomValue(0, messages.length - 1)];

  var comments = [
    createComment(getRandomValue(1, 6), message, name)
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
  for (var i = 0; i < photos.length; i++) {
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

// Отображение фотографии в полноэкранном режиме
var photos = createPhotos();
var bigPicture = document.querySelector('.big-picture');
var currentPhoto = photos[0];
var commentsBlock = bigPicture.querySelector('.social__comments');

// Создает один комментарий на основе шаблона
var makeСomment = function (comment) {
  var commentEl = commentsBlock.querySelector('.social__comment')
    .cloneNode(true);
  var commentPicture = commentEl.querySelector('.social__picture');
  var commentText = commentEl.querySelector('.social__text');

  commentPicture.src = comment.avatar;
  commentPicture.alt = comment.name;
  commentText.textContent = comment.message;
  return commentEl;
};

// Создает блок комментариев на основе шаблона
var makeComments = function (comments) {
  // Прячем блоки счётчика комментариев и загрузки новых комментариев
  var commentsCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < comments.length; i++) {
    var itemComment = makeСomment(comments[i]);
    fragment.appendChild(itemComment);
  }
  commentsBlock.contextText = '';
  commentsBlock.appendChild(fragment);
};

// Показывает большую фотографию с лайками и комментариями
var showBigPicture = function () {
  var bigImage = bigPicture.querySelector('.big-picture__img');
  var likesBigImage = bigPicture.querySelector('.likes-count');
  var commentsBigImage = bigPicture.querySelector('.comments-count');
  var captionBigImage = bigPicture.querySelector('.social__caption');
  bigPicture.classList.remove('hidden');

  bigImage.src = currentPhoto.url;
  likesBigImage.textContent = currentPhoto.likes;
  commentsBigImage.textContent = currentPhoto.comments.length;
  captionBigImage.textContent = currentPhoto.description;

  makeComments(currentPhoto.comments);
};
// Добавляет большую фотографию на страницу
showBigPicture();

// Добавляет body класс, чтобы контейнер с фотографиями позади не прокручивался при скролле
var deleteScroll = function () {
  var noScroll = document.querySelector('body');
  noScroll.classList.add('modal-open');
};
// Убирает прокручивание при скролле
deleteScroll();

