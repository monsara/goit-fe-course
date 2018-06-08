/*
  ⚠️ ДОПОЛНИТЕЛЬНОЕ ЗАДАНИЕ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Создайте скрипт турагенства, продающего поездки в 3-х группах: sharm, hurgada и taba.
  Кол-во мест в группах ограничено (создайте переменные для хранения мест в группах): 
    * sharm - 15
    * hurgada - 25
    * taba - 6.
  Когда пользователь посещает страницу, ему необходимо предложить ввести число необходимых мест,
  результат сохранить в переменную.
  Необходимо проверить являются ли введенные данные целым положительным числом. 
  
    - В случае неверного ввода от пользователя, скрипт показывает alert с текстом 
      "Ошибка ввода" и больше ничего не делает.
    - В случае верного ввода, последовательно проверить кол-во мест в группах, 
      и кол-во необходимых мест введенных пользователем.
  Если была найдена группа в которой количество мест больше либо равно необходимому, 
  вывести сообщение через confirm, что есть место в группе такой-то, согласен ли 
  пользоваетель быть в этой группе?
    * Если ответ да, показать alert с текстом 'Приятного путешествия в группе <имя группы>'
    * Если ответ нет, показать alert с текстом 'Нам очень жаль, приходите еще!'
  
  Если мест нигде нет, показать alert с сообщением 'Извините, столько мест нет ни в одной группе!'
*/

'use strict';

let tada = 6;
let sharm = 15;
let hurgada = 25;

let isAgree;
let message;

let numberOfSeats = prompt('Введите количество мест', '');

const IS_NUMBER_OF_SEATS_VALID = numberOfSeats > 0;
const IS_NUMBER_OF_SEATS_INTEGER = Number.isInteger(Number(numberOfSeats));

const MESSAGE_FOR_SUCCESS = 'Приятного путешествия в группе ';
const MESSAGE_FOR_UNSUCCESS = 'Извините, столько мест нет ни в одной группе!';
const MESSAGE_FOR_INVALID_VALUE = 'Ошибка ввода';
const MESSAGE_FOR_DISAGREE = 'Нам очень жаль, приходите еще!';

if (IS_NUMBER_OF_SEATS_VALID && IS_NUMBER_OF_SEATS_INTEGER) {

  if (tada >= numberOfSeats) {
    isAgree = confirm('Есть место в группе Tada, согласны ли Вы быть в этой группе?');

    if (isAgree) {
      message = MESSAGE_FOR_SUCCESS + 'Tada';
    } else {
      message = MESSAGE_FOR_DISAGREE;
    }

  } else if (sharm >= numberOfSeats) {
    isAgree = confirm('Есть место в группе Sharm, согласны ли Вы быть в этой группе?');

    if (isAgree) {
      message = MESSAGE_FOR_SUCCESS + 'Sharm';
    } else {
      message = MESSAGE_FOR_DISAGREE;
    }

  } else if (hurgada >= numberOfSeats) {
    isAgree = confirm('Есть место в группе Hurgada, согласны ли Вы быть в этой группе?');

    if (isAgree) {
      message = MESSAGE_FOR_SUCCESS + 'Hurgada';
    } else {
      message = MESSAGE_FOR_DISAGREE;
    }

  } else {
    message = MESSAGE_FOR_UNSUCCESS;
  }

} else {
  message = MESSAGE_FOR_INVALID_VALUE;
}

alert(message);