'use strict';

window.api = (function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD = 'https://js.dump.academy/kekstagram';
  var TIMEOUT_IN_MS = 10000;

  var fetch = function (options) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status < 400) {
        options.onSuccess(xhr.response);
      } else if (xhr.status < 500) {
        options.onError('Неверный формат данных');
      } else {
        options.onError('Упс! Что-то пошло не так');
      }
    });

    xhr.addEventListener('error', function () {
      options.onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      options.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(options.method, options.url);
    xhr.send(options.data);
  };

  function fetchPhotos(onSuccess, onError) {
    fetch(
        {
          method: 'GET',
          url: URL,
          onSuccess: onSuccess,
          onError: onError
        }
    );
  }

  function sendPhotos(data, onSuccess, onError) {
    fetch(
        {
          method: 'POST',
          data: data,
          url: UPLOAD,
          onSuccess: onSuccess,
          onError: onError
        }
    );
  }

  return {
    fetchPhotos: fetchPhotos,
    sendPhotos: sendPhotos
  };
})();
