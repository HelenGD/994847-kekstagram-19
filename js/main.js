'use strict';

var COMMENTS_MIN_COUNT = 1;
var COMMENTS_MAX_COUNT = 6;
var COMMENTS_MIN_AVATAR_ID = 1;
var COMMENTS_MAX_AVATAR_ID = 6;
var COMMENTS_NAMES = ['Ваня', 'Петя', 'Коля', 'Семен', 'Игорь'];
var COMMENTS_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var PHOTOS_MAX_COUNT = 25;
var PHOTOS_MIN_LIKES_COUNT = 25;
var PHOTOS_MAX_LIKES_COUNT = 200;
var ESC_KEY = 27;
var HASHTAGS_MIN_LENGTH = 2;
var HASHTAGS_MAX_LENGTH = 20;
var HASHTAGS_MAX_COUNT = 5;
var EFFECT_CHROME = 'chrome';
var EFFECT_NONE = 'none';
var EFFECT_SEPIA = 'sepia';
var EFFECT_MARVIN = 'marvin';
var EFFECT_PHOBOS = 'phobos';
var EFFECT_HEAT = 'heat';

var body = document.querySelector('body');
var bigPicture = document.querySelector('.big-picture');
var bigImage = bigPicture.querySelector('.big-picture__img');
var likesBigImage = bigPicture.querySelector('.likes-count');
var commentsBigImage = bigPicture.querySelector('.comments-count');
var captionBigImage = bigPicture.querySelector('.social__caption');
var commentsBlock = bigPicture.querySelector('.social__comments');
var commentsCount = bigPicture.querySelector('.social__comment-count');
var commentsLoader = bigPicture.querySelector('.comments-loader');
var pictureEl = document.querySelector('#picture')
    .content
    .querySelector('.picture');
var picturesContainer = document.querySelector('.pictures');
var socialCommentEl = commentsBlock.querySelector('.social__comment');
var popupEditImg = document.querySelector('.img-upload__overlay');
var openPopupEditImg = document.querySelector('#upload-file');
var closePopupEditImg = document.querySelector('#upload-cancel');
var hashtagsInput = popupEditImg.querySelector('.text__hashtags');
var effectLevelEl = popupEditImg.querySelector('.effect-level');
var effectsRadios = popupEditImg.querySelectorAll('.effects__radio');
var imgUploadPreviewEl = popupEditImg.querySelector('.img-upload__preview');
var currentEffect = EFFECT_NONE;

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
  var pictures = [];
  for (var i = 0; i < PHOTOS_MAX_COUNT; i++) {
    // Генерируем случайные комменты
    var photoComments = createComments();
    var id = i + 1;
    var title = 'Это моя фотография';
    var likes = getRandomValue(PHOTOS_MIN_LIKES_COUNT, PHOTOS_MAX_LIKES_COUNT);
    pictures.push(createPhoto(id, title, likes, photoComments));
  }
  return pictures;
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
  var comments = [];
  var maxComments = getRandomValue(COMMENTS_MIN_COUNT, COMMENTS_MAX_COUNT);

  for (var i = 0; i < maxComments; i++) {
    // Берем случайный индекс
    var name = COMMENTS_NAMES[getRandomValue(0, COMMENTS_NAMES.length - 1)];
    var message = COMMENTS_MESSAGES[getRandomValue(0, COMMENTS_MESSAGES.length - 1)];
    var id = getRandomValue(COMMENTS_MIN_AVATAR_ID, COMMENTS_MAX_AVATAR_ID);
    comments.push(createComment(id, message, name));
  }
  return comments;
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
  picturesContainer.appendChild(fragment);
};

// Создает один комментарий на основе шаблона
var createCommentElement = function (comment) {
  var commentEl = socialCommentEl.cloneNode(true);
  var commentPicture = commentEl.querySelector('.social__picture');
  var commentText = commentEl.querySelector('.social__text');

  commentPicture.src = comment.avatar;
  commentPicture.alt = comment.name;
  commentText.textContent = comment.message;
  return commentEl;
};

// Создает блок комментариев на основе шаблона
var renderComments = function (comments) {
  // Прячем блоки счётчика комментариев и загрузки новых комментариев
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < comments.length; i++) {
    var itemComment = createCommentElement(comments[i]);
    fragment.appendChild(itemComment);
  }
  commentsBlock.innerHTML = '';
  commentsBlock.appendChild(fragment);
};

// Показывает большую фотографию с лайками и комментариями
// eslint-disable-next-line no-unused-vars
var showBigPicture = function (currentPhoto) {
  bigPicture.classList.remove('hidden');

  bigImage.src = currentPhoto.url;
  likesBigImage.textContent = currentPhoto.likes;
  commentsBigImage.textContent = currentPhoto.comments.length;
  captionBigImage.textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);
};

// Добавляет body класс, чтобы контейнер с фотографиями позади не прокручивался при скролле
// eslint-disable-next-line no-unused-vars
var deleteScroll = function () {
  body.classList.add('modal-open');
};

// Закрывает попап по нажатию на ESCAPE
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY) {
    onClosePopup();
  }
};

// Устанавливает эффект, принимает процент
var setEffect = function (percent) {
  if (currentEffect === EFFECT_CHROME) {
    setFilterGrayscale(percent);
  } else if (currentEffect === EFFECT_SEPIA) {
    setFilterSepia(percent);
  } else if (currentEffect === EFFECT_MARVIN) {
    setFilterInvert(percent);
  } else if (currentEffect === EFFECT_PHOBOS) {
    setFilterBlur(percent);
  } else if (currentEffect === EFFECT_HEAT) {
    setFilterBrightness(percent);
  } else if (currentEffect === EFFECT_NONE) {
    resetFilter();
  }
};

var onEffectChange = function (evt) {
  currentEffect = evt.target.value;
  setEffect(1);
};

var onSaturationChange = function (evt) {
  var percent = getSaturationPercent(evt);
  setEffect(percent);
};

var onFocusHastags = function () {
  document.removeEventListener('keydown', onPopupEscPress);
};

var onBlurHashtags = function () {
  document.addEventListener('keydown', onPopupEscPress);
};

var onInputHashtags = function (evt) {
  var value = evt.target.value;
  var error = validateHashtags(parseHashtags(value));
  evt.target.setCustomValidity(error);
};

// Открывает попап
var onOpenPopup = function () {
  popupEditImg.classList.remove('hidden');
  body.classList.add('modal-open');
};

// Закрывает попап
var onClosePopup = function () {
  popupEditImg.classList.add('hidden');
  body.classList.remove('modal-open');
  openPopupEditImg.value = '';

  resetFilter();
  currentEffect = EFFECT_NONE;
};

openPopupEditImg.addEventListener('change', onOpenPopup);

closePopupEditImg.addEventListener('click', onClosePopup);

// Устанавливает эффект "Хром"
var setFilterGrayscale = function (percent) {
  imgUploadPreviewEl.style.filter = 'grayscale(' + percent + ')';
};

// Устанавливает эффект "Сепия"
var setFilterSepia = function (percent) {
  imgUploadPreviewEl.style.filter = 'sepia(' + percent + ')';
};

// Устанавливает эффект "Марвин"
var setFilterInvert = function (percent) {
  imgUploadPreviewEl.style.filter = 'invert(' + percent * 100 + '%)';
};

// Устанавливает эффект "Фобос"
var setFilterBlur = function (percent) {
  imgUploadPreviewEl.style.filter = 'blur(' + 3 * percent + 'px)';
};

// Устанавливает эффект "Зной"
var setFilterBrightness = function (percent) {
  imgUploadPreviewEl.style.filter = 'brightness(' + 3 * percent + ')';
};

// Сбрасывает эффект
var resetFilter = function () {
  imgUploadPreviewEl.style.filter = '';
};

// Получает проценты насыщенности
var getSaturationPercent = function (evt) {
  var rect = evt.target.getBoundingClientRect();
  var offsetX = evt.clientX - rect.left;
  var percent = offsetX / rect.width;

  return percent;
};

// Валидирует один хэштэг
var validateHashtag = function (hashtag) {
  if (hashtag.length < HASHTAGS_MIN_LENGTH) {
    return 'Минимальная длина одного хэш-тега 2 символа, включая решётку';
  }
  if (hashtag.length > HASHTAGS_MAX_LENGTH) {
    return 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
  }
  if (!/^#[a-zA-Z0-9]+$/.test(hashtag)) {
    return 'Хэш-тег не должен содержать спецсимволы';
  }
  return '';
};

// Проверяет хэштэг на уникальность
var checkUniqHashtag = function (hashtags) {
  var uniqHastagsMap = {};
  for (var i = 0; i < hashtags.length; i++) {
    if (hashtags[i] in uniqHastagsMap) {
      return false;
    } else {
      uniqHastagsMap[hashtags[i]] = true;
    }
  }
  return true;
};

// Валидирует хэштэги
var validateHashtags = function (hashtags) {
  for (var i = 0; i < hashtags.length; i++) {
    var error = validateHashtag(hashtags[i]);
    if (error) {
      return error;
    }
  }
  if (hashtags.length > HASHTAGS_MAX_COUNT) {
    return 'Нельзя указать больше пяти хэш-тегов';
  }
  if (!checkUniqHashtag(hashtags)) {
    return 'один и тот же хэш-тег не может быть использован дважды';
  }
  return '';
};

// Превращает набор хэштэгов в массив
var parseHashtags = function (hashtagStr) {
  var hashtagArr = hashtagStr
    .toLowerCase()
    .split(' ');
  return hashtagArr.filter(Boolean);
};

var photos = createPhotos();
// var currentPhoto = photos[0];
// Добавляет большую фотографию на страницу
// showBigPicture(currentPhoto);
// Добавляет фотографии на страницу
renderPhotos(photos);
// Убирает прокручивание при скролле
// deleteScroll();

document.addEventListener('keydown', onPopupEscPress);
hashtagsInput.addEventListener('focus', onFocusHastags);
hashtagsInput.addEventListener('blur', onBlurHashtags);
hashtagsInput.addEventListener('input', onInputHashtags);
effectLevelEl.addEventListener('mouseup', onSaturationChange);
for (var radioIndex = 0; radioIndex < effectsRadios.length; radioIndex++) {
  effectsRadios[radioIndex].addEventListener('change', onEffectChange);
}
