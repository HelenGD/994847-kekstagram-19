'use strict';

window.backend = (function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var TIMEOUT_IN_MS = 10000;

  function fetchPhotos(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status < 400) {
        onSuccess(xhr.response);
      } else if (xhr.status < 500) {
        onError('Неверный формат данных');
      } else {
        onError('Упс! Что-то пошло не так');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  }

  fetchPhotos(
      function (response) {
        window.photo.render(response);
      },
      function (error) {
        window.photo.render(error);
      }
  );
})();
