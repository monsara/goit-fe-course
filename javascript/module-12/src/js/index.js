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

const API_KEY = '5b95674e6df9cb84931d049a63cf56e0a47379c26c5cf';
const lStorageKey = 'urlList';
const LOCALSTORAGE = (window => {
  if (!window) return;

  const isActive = 'localStorage' in window;

  const get = key => {
    try {
      const serializedState = localStorage.getItem(key);

      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (err) {
      console.error('Get state error: ', err);
    }
  };

  const set = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.error('Set state error: ', err);
    }
  };

  const remove = key => {
    try {
      const serializedState = localStorage.removeItem(key);
    } catch (err) {
      console.error('Get state error: ', err);
    }
  };

  const publicAPI = {
    isActive,
    get,
    set,
    remove,
  };

  return publicAPI;
})(window);

//========================================================
const urlList = {
  arrUrl: [],

  setUrl(data) {
    this.arrUrl.push(data);
  },

  getUrlLocalStorage() {
    if (LOCALSTORAGE.isActive && LOCALSTORAGE.get(lStorageKey) !== undefined) {
      this.arrUrl = LOCALSTORAGE.get(lStorageKey);
    }
  },

  removeUrl(itemId) {
    this.arrUrl = this.arrUrl.filter(url => url.id !== itemId);
  },
};
urlList.getUrlLocalStorage();

//=======================================

const CREATE_GRID = (function(items) {
  const container = document.querySelector('.cards-list');
  const source = document.querySelector('#template-card').innerHTML.trim();
  const template = Handlebars.compile(source);

  const markupCards = items
    .reverse()
    .reduce((acc, item) => acc + template(item), '');
  container.innerHTML = markupCards;

  return {
    addNewCard(card) {
      container.insertAdjacentHTML('afterbegin', template(card));
    },
  };
})(urlList.arrUrl);

const form = document.querySelector('.js-form');
const cards = document.querySelector('.cards-list');

form.addEventListener('submit', handleFormSubmit);
cards.addEventListener('click', handleDeleteCard);

function handleFormSubmit(event) {
  event.preventDefault();
  const input = form.querySelector('input');
  const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;

  if (input.value === null) {
    return alert('Enter your url adress!');
  } else if (!pattern.test(input.value)) {
    return alert('Your url adress is not valid!');
  } else {
    getUrlInfo(input.value).then(data => {
      const items = urlList.arrUrl.map((item) => item.url);
      if(items.includes(data.url)) return alert('Your url adress is already exists!');
      const date = new Date();
      const randomEnd = Math.random()
        .toString(36)
        .substr(2, 9);
      data.id = `${date.getTime()}-${randomEnd}`;

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
  return fetch(`https://api.linkpreview.net/?key=${API_KEY}&q=${url}`)
    .then(response => {
      if (response.ok) return response.json();

      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .catch(error => {
      console.log('ERROR: ', error);
    });
}

function handleDeleteCard({ target }) {
  if (target.nodeName !== 'BUTTON') return;
  const item = target.parentNode;
  const itemId = item.dataset.idItem;

  item.remove();
  urlList.removeUrl(itemId);

  if (LOCALSTORAGE.isActive) {
    LOCALSTORAGE.remove(lStorageKey);
    LOCALSTORAGE.set(lStorageKey, urlList.arrUrl);
  }
}