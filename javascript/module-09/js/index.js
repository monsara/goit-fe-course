/*
Создайте скрипт секундомера.
Секундомер http://www.online-stopwatch.com/full-screen-stopwatch/

Изначально в HTML есть разметка:

<div class="секундомер">
  <p class="time js-time"> 00: 00.0 </ p>
  <button class="btn js-start"> Пуск </ button>
  <button class="btn js-take-lap"> Lap </ button>
  <button class="btn js-reset"> Сброс </ button>
  </ DIV>
  <ul class="laps js-laps"> </ ul>
  
  Добавить следующий функционал:

- При нажатии на кнопку button.js - start, запускается таймер, который считает время
со старта и до текущего момента времени, обновляя содержимое элемента p.js - time
новое значение времени в формате xx: xx.x(минуты: секунды.сотни_миллисекунд).

🔔 Подсказка: так как необходимо отображать только сотни миллисекунд, интервал
достаточно повторять не чаще чем 1 раз в 100 мс.
    
  - Когда секундомер запущен, текст кнопки button.js - start меняется на 'Pause',
  а функционал при клике превращается в оставновку секундомера без сброса
значения времени.

🔔 Подсказка: вам понадобится буль, состояние состояния таймера активен / неактивен.
  
  - Если секундомер находится в состоянии паузы, текст на кнопке button.js - start
меняется на 'Продолжить'.При следующем клике в нее, продолжается отсчет времени,
  а текст меняется на 'Пауза'.То есть если во время выборов 'Пауза' прошло 6 секунд
со старта, при нажатии 'Продолжить' 10 секунд спустя, секундомер продолжит отсчет времени
с 6 секунд, а не с 16.

🔔 Подсказка: сохраните время секундомера на момент паузы и использовать его
при рассчете текущего времени после возобновления таймера отнимая
это значение от времени запуска таймера.
    
  - Если секундомер находится в активном состоянии или в состоянии паузы, кнопка
button.js - reset должна быть активна(на нее можно кликнуть), в противном случае
отключен.Функционал при клике - остановка таймера и сброс всех полей в исходное состояние.
    
  - Функционал кнопки button.js - take - lap при клике - сохранение текущего времени секундомера
в массив и добавление в ul.js - laps нового пользователя с сохраненным временем в формате xx: xx.x
*/

'use strict';

const clockface = document.querySelector('.js-time');
const startBtn = document.querySelector('.js-start');
const resetBtn = document.querySelector('.js-reset');
const lapBtn = document.querySelector('.js-take-lap');
const lapsList = document.querySelector('.js-laps');

const timer = {
  id: null,
  startTime: null,
  deltaTime: 0,
  isActive: false,

  startTimer() {
    if (this.isActive) return;

    this.isActive = true;
    this.startTime = Date.now() - this.deltaTime;

    this.id = setInterval(() => {
      const currentTime = Date.now();
      this.deltaTime = currentTime - this.startTime;

      updateClockface(this.deltaTime);
    }, 100);
  },

  stopTimer() {
    clearInterval(this.id);
    this.isActive = false;
  },

  resetTimer() {
    this.stopTimer();
    this.deleteItems();//
    this.deltaTime = 0;
    updateClockface(this.deltaTime);
  },

  deleteItems() {
    const items = document.querySelectorAll('li');
    items.forEach(item => {
      item.remove();
    });
  },
};

startBtn.addEventListener('click', handleStartBtnClick);
resetBtn.addEventListener('click', handleStopBtnClick);
lapBtn.addEventListener('click', handleLapBtnClick);

function handleStartBtnClick() {
  if (!timer.isActive) {
    timer.startTimer();
    this.textContent = 'Pause';
  } else {
    timer.stopTimer();
    this.textContent = 'Continue';
  }
}

function handleStopBtnClick() {
  timer.resetTimer();
  startBtn.textContent = 'Start';
}

function updateClockface(time) {
  const formattedTime = formatTime(time);
  clockface.textContent = formattedTime;
}

function formatTime(ms) {
  const date = new Date(ms);

  let minutes = date.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  let seconds = date.getSeconds();
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  const mseconds = String(date.getMilliseconds()).slice(0, 1);

  return `${minutes}:${seconds}.${mseconds}`;
}

function handleLapBtnClick(event) {
  const lap = document.createElement('li');
  lap.textContent = clockface.textContent;
  lapsList.append(lap);
}