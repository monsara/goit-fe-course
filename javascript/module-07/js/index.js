/*
  1. Модифицируйте готовую функцию createPostCard() из задания 
    номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
    чтобы она принимала объект post с данными для заполнения полей 
    в карточке.
      
  2. Создайте функцию createCards(posts), которая принимает массив
    объектов-карточек (js/posts.js), вызывает функцию createPostCard(post) столько
    раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
    массив DOM-элементов всех постов.
    
  3. Повесьте все посты в какой-то уже существующий DOM-узел.
*/

'use strict';

const createPostCard = ({ img, title, text, link }) => {
  const post = document.createElement('div');
  post.classList.add('post');

  const image = document.createElement('img');
  image.classList.add('post__image');
  image.setAttribute('src', img);
  image.setAttribute('alt', '');

  const head = document.createElement('h2');
  head.classList.add('post__title');
  head.textContent = title;

  const descr = document.createElement('p');
  descr.classList.add('post__text');
  descr.textContent = text;

  const btn = document.createElement('a');
  btn.classList.add('button');
  btn.textContent = 'Read more';
  btn.setAttribute('href', link);

  post.append(image, head, descr, btn);

  return post;
}

const createCards = posts => {
  const elements = posts.map(post => createPostCard(post));

  return elements;
};

const postCards = createCards(posts);

const cardList = document.querySelector('.card-list');
cardList.append(...postCards);