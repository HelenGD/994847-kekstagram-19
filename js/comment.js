'use strict';

window.comment = (function () {
  var bigPictureEl = document.querySelector('.big-picture');
  var commentsBlockEl = bigPictureEl.querySelector('.social__comments');
  var socialCommentEl = commentsBlockEl.querySelector('.social__comment');

  var createElement = function (comment) {
    var commentEl = socialCommentEl.cloneNode(true);
    var commentPictureEl = commentEl.querySelector('.social__picture');
    var commentTextEl = commentEl.querySelector('.social__text');

    commentPictureEl.src = comment.avatar;
    commentPictureEl.alt = comment.name;
    commentTextEl.textContent = comment.message;
    return commentEl;
  };

  var render = function (comments) {
    var fragment = document.createDocumentFragment();
    comments.forEach(function (comment) {
      var itemComment = createElement(comment);
      fragment.appendChild(itemComment);
    });

    commentsBlockEl.textContent = '';
    commentsBlockEl.appendChild(fragment);
  };

  return {
    render: render
  };
})();
