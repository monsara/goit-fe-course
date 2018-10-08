/*
  Напишите приложение для хранения url веб-страниц в виде карточек-закладок.
  Реализуйте следующий функционал:
    - Используйте Gulp для сборки проекта, JS обработан транспайлером Babel, ресурсы оптимизированы
    - Для добавления новой закладки, в приложении есть форма с элементом input и кнопкой "Добавить"
    - В приложении есть список всех добавленных карточек-закладок, располагающийся под формой
    - Некоторые элементы интерфейса создаются динамически. Используйте шаблонизатор Handlebars для
      создания списка карточек. Форма уже есть в HTML при загрузке страницы.
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходят проверки:
        * на существование закладки с такой ссылкой в текущей коллекции закладок. Если такая закладка есть,
          всплывает диалоговое окно оповещающее пользователя о том, что такая закладка уже есть.
        * при условии валидной, еще не существующей в коллекции ссылки, карточка с такой ссылкой
          добавляется в коллекцию.
    - В интерфейсе, новые карточки добавляются наверх списка, а не вниз.
    - Каждая карточка-закладка содержит кнопку для удаления карточки из коллекции, при клике
      на кнопку происходит удаление.
    - При повторном посещении страницы с одного и того же устройства и браузера, пользователь видит
      все карточки-закладки которые были во время последнего его посещения. Используйте localStorage
  🔔 Оформление интерфейса произвольное
*/

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходи проверка
      на валидность введенной ссылки: если был введен невалидный url то должно всплывать
      диалоговое окно, оповещающее пользователя о том, что это невалидный url. Используйте
      регулярные выражения для валидации url.
    - Каждая карточка содержит превью изображение и базовую информацию о странице по адресу закладки,
      для получения этой информации воспользуйтесь этим Rest API - https://www.linkpreview.net/
*/

'use strict';

var API_KEY = '5b95674e6df9cb84931d049a63cf56e0a47379c26c5cf';
var lStorageKey = 'urlList';
var LOCALSTORAGE = function (window) {
  if (!window) return;

  var isActive = 'localStorage' in window;

  var get = function get(key) {
    try {
      var serializedState = localStorage.getItem(key);

      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (err) {
      console.error('Get state error: ', err);
    }
  };

  var set = function set(key, value) {
    try {
      var serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.error('Set state error: ', err);
    }
  };

  var remove = function remove(key) {
    try {
      var serializedState = localStorage.removeItem(key);
    } catch (err) {
      console.error('Get state error: ', err);
    }
  };

  var publicAPI = {
    isActive: isActive,
    get: get,
    set: set,
    remove: remove
  };

  return publicAPI;
}(window);

//========================================================
var urlList = {
  arrUrl: [],

  setUrl: function setUrl(data) {
    this.arrUrl.push(data);
  },
  getUrlLocalStorage: function getUrlLocalStorage() {
    if (LOCALSTORAGE.isActive && LOCALSTORAGE.get(lStorageKey) !== undefined) {
      this.arrUrl = LOCALSTORAGE.get(lStorageKey);
    }
  },
  removeUrl: function removeUrl(itemId) {
    this.arrUrl = this.arrUrl.filter(function (url) {
      return url.id !== itemId;
    });
  }
};
urlList.getUrlLocalStorage();

//=======================================

var CREATE_GRID = function (items) {
  var container = document.querySelector('.cards-list');
  var source = document.querySelector('#template-card').innerHTML.trim();
  var template = Handlebars.compile(source);

  var markupCards = items.reverse().reduce(function (acc, item) {
    return acc + template(item);
  }, '');
  container.innerHTML = markupCards;

  return {
    addNewCard: function addNewCard(card) {
      container.insertAdjacentHTML('afterbegin', template(card));
    }
  };
}(urlList.arrUrl);

var form = document.querySelector('.js-form');
var cards = document.querySelector('.cards-list');

form.addEventListener('submit', handleFormSubmit);
cards.addEventListener('click', handleDeleteCard);

function handleFormSubmit(event) {
  event.preventDefault();
  var input = form.querySelector('input');
  var pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;

  if (input.value === null) {
    return alert('Enter your url adress!');
  } else if (!pattern.test(input.value)) {
    return alert('Your url adress is not valid!');
  } else {
    getUrlInfo(input.value).then(function (data) {
      var items = urlList.arrUrl.map(function (item) {
        return item.url;
      });
      if (items.includes(data.url)) return alert('Your url adress is already exists!');
      var date = new Date();
      var randomEnd = Math.random().toString(36).substr(2, 9);
      data.id = date.getTime() + '-' + randomEnd;

      urlList.setUrl(data);
      CREATE_GRID.addNewCard(data);

      if (LOCALSTORAGE.isActive) {
        LOCALSTORAGE.remove(lStorageKey);
        LOCALSTORAGE.set(lStorageKey, urlList.arrUrl);
      }
    });
    input.value = '';
  }
}

function getUrlInfo(url) {
  return fetch('https://api.linkpreview.net/?key=' + API_KEY + '&q=' + url).then(function (response) {
    if (response.ok) return response.json();

    throw new Error('Error while fetching: ' + response.statusText);
  }).catch(function (error) {
    console.log('ERROR: ', error);
  });
}

function handleDeleteCard(_ref) {
  var target = _ref.target;

  if (target.nodeName !== 'BUTTON') return;
  var item = target.parentNode;
  var itemId = item.dataset.idItem;

  item.remove();
  urlList.removeUrl(itemId);

  if (LOCALSTORAGE.isActive) {
    LOCALSTORAGE.remove(lStorageKey);
    LOCALSTORAGE.set(lStorageKey, urlList.arrUrl);
  }
}