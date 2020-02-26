'use strict';
window.comment = (function () {
  var bigPictureEl = document.querySelector('.big-picture');
  var commentsBlockEl = bigPictureEl.querySelector('.social__comments');
  var socialCommentEl = commentsBlockEl.querySelector('.social__comment');

  // Создает один комментарий на основе шаблона
  var createElement = function (comment) {
    var commentEl = socialCommentEl.cloneNode(true);
    var commentPicture = commentEl.querySelector('.social__picture');
    var commentText = commentEl.querySelector('.social__text');

    commentPicture.src = comment.avatar;
    commentPicture.alt = comment.name;
    commentText.textContent = comment.message;
    return commentEl;
  };

  // Создает блок комментариев на основе шаблона
  var render = function (comments) {

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      var itemComment = createElement(comments[i]);
      fragment.appendChild(itemComment);
    }
    commentsBlockEl.innerHTML = '';
    commentsBlockEl.appendChild(fragment);
  };

  return {
    render: render,
  };
})();
