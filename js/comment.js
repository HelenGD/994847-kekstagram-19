'use strict';
window.comment = (function () {
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

  var bigPicture = document.querySelector('.big-picture');
  var commentsCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var commentsBlock = bigPicture.querySelector('.social__comments');
  var socialCommentEl = commentsBlock.querySelector('.social__comment');

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
    var maxComments = window.util.getRandomValue(COMMENTS_MIN_COUNT, COMMENTS_MAX_COUNT);

    for (var i = 0; i < maxComments; i++) {
    // Берем случайный индекс
      var name = COMMENTS_NAMES[window.util.getRandomValue(0, COMMENTS_NAMES.length - 1)];
      var message = COMMENTS_MESSAGES[window.util.getRandomValue(0, COMMENTS_MESSAGES.length - 1)];
      var id = window.util.getRandomValue(COMMENTS_MIN_AVATAR_ID, COMMENTS_MAX_AVATAR_ID);
      comments.push(createComment(id, message, name));
    }
    return comments;
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

  return {
    render: renderComments,
    create: createComments,
  };
})();
