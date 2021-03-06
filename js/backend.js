'use strict';

window.backend = (function () {
  var DOWNLOAD = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD = 'https://js.dump.academy/kekstagram';
  var TIMEOUT_IN_MS = 10000;
  var STATUS_OK = 200;

  var load = function (options) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        options.onSuccess(xhr.response);
      } else {
        options.onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
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

  var loadPhotos = function (onSuccess, onError) {
    load(
        {
          method: 'GET',
          url: DOWNLOAD,
          data: null,
          onSuccess: onSuccess,
          onError: onError
        }
    );
  };

  var sendPhoto = function (data, onSuccess, onError) {
    load(
        {
          method: 'POST',
          data: data,
          url: UPLOAD,
          onSuccess: onSuccess,
          onError: onError
        }
    );
  };

  return {
    loadPhotos: loadPhotos,
    sendPhoto: sendPhoto
  };
})();
