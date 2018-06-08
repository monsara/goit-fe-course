/*
  Напишите скрипт, для авторизации администратора в панели управления.
  
  При загрузке страницы у посетителя запрашивается логин через prompt:
  
    - Если посетитель нажал Cancel — показыать alert с текстом 'Отменено пользователем!'
    - Если было введено что либо другое, что не совпадает со значением константы ADMIN_LOGIN, 
       показывать alert с текстом 'Доступ запрещен!'   
    - Если был введен логин совпадающий со значением константы ADMIN_LOGIN, спрашивать пароль через prompt.
    
  При вводе пароля:
  
      - Если нажали Cancel, показывать alert с текстом 'Отменено пользователем!'
      - Если введен пароль который не совпадает со значением константы ADMIN_PASSWORD,
        показывать alert с текстом 'Доступ запрещен!'        
      - Если введён пароль который совпадает со значением константы ADMIN_PASSWORD, 
        показывать alert с текстом 'Добро пожаловать!'
        
  🔔 PS: для удобства и чистоты кода сохраните в переменные сообщения отображаемые в alert
*/

'use strict';

const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = 'm4ngo1zh4ackz0r';
const USER_LOGIN = prompt('Login: ', '');
const MESSAGE_FOR_VALID_VALUE = 'Добро пожаловать!'; 
const MESSAGE_FOR_INVALID_VALUE = 'Доступ запрещен!';
const MESSAGE_FOR_CANSEL = 'Отменено пользователем!';

let message;
let userPassword; 

if (USER_LOGIN === 'admin') {

  userPassword = prompt('Password: ', '');

  if (userPassword === ADMIN_PASSWORD) {
    message = MESSAGE_FOR_VALID_VALUE;
  } else if (userPassword === null) {
    message = MESSAGE_FOR_CANSEL;
  } else {
    message = MESSAGE_FOR_INVALID_VALUE;
  }

} else if (USER_LOGIN === null) {
  message = MESSAGE_FOR_CANSEL;
} else {
  message = MESSAGE_FOR_INVALID_VALUE;
}

alert(message);