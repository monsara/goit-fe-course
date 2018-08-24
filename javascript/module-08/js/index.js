/*
  Создайте компонент галлереи изображений следующего вида.
  
    <div class="image-gallery js-image-gallery">
      <div class="fullview">
        <!-- Если выбран первый элемент из preview -->
        <img src="img/fullview-1.jpeg" alt="alt text 1">
      </div>
      <!-- li будет столько, сколько объектов в массиве картинок. Эти 3 для примера -->
      <ul class="preview">
        <li><img src="img/preview-1.jpeg" data-fullview="img/fullview-1.jpeg" alt="alt text 1"></li>
        <li><img src="img/preview-2.jpeg" data-fullview="img/fullview-2.jpeg" alt="alt text 2"></li>
        <li><img src="img/preview-3.jpeg" data-fullview="img/fullview-3.jpeg" alt="alt text 3"></li>
      </ul>
    </div>   
    
    🔔 Превью компонента: https://monosnap.com/file/5rVeRM8RYD6Wq2Nangp7E4TkroXZx2
      
      
    Реализуйте функционал:
      
      - image-gallery есть изначально в HTML-разметке как контейнер для компонента.
    
      - fullview содержит в себе увеличенную версию выбранного изображения из preview, и
        создается динамически при загрузке страницы.
    
      - preview это список маленьких изображений, обратите внимание на атрибут data-fullview,
        он содержит ссылку на большое изображение. preview и его элементы, также создаются 
        динамически, при загрузке страницы.
        
      - При клике в элемент preview, необходимо подменить src тега img внутри fullview
        на url из data-атрибута выбраного элемента.
        
      - По умолчанию, при загрузке страницы, активным должен быть первый элемент preview.
        
      - Изображений может быть произвольное количество.
      
      - Используйте делегирование для элементов preview.
      
      - При клике, выбраный элемент из preview должен получать произвольный эффект выделения.
      
      - CSS-оформление и имена классов на свой вкус.
      
      
    🔔 Изображения маленькие и большие можно взять с сервиса https://www.pexels.com/, выбрав при скачивании
      размер. Пусть маленькие изображения для preview будут 320px по ширине, большие для fullview 1280px.
      Подберите изображения одинаковых пропорций.
*/

/*
  Массив объектов с данными (перенес в item.js) для создания компонента выглядит следующим образом.
  Замените пути на соотвествующие вашим, или назовите изображения аналогично.
*/

const galleryItems = [
  {
    preview: 'img/preview-1.jpeg',
    fullview: 'img/fullview-1.jpeg',
    alt: 'alt text 1',
  },
  {
    preview: 'img/preview-2.jpeg',
    fullview: 'img/fullview-2.jpeg',
    alt: 'alt text 2',
  },
  {
    preview: 'img/preview-3.jpeg',
    fullview: 'img/fullview-3.jpeg',
    alt: 'alt text 3',
  },
  {
    preview: 'img/preview-4.jpeg',
    fullview: 'img/fullview-4.jpeg',
    alt: 'alt text 4',
  },
  {
    preview: 'img/preview-5.jpeg',
    fullview: 'img/fullview-5.jpeg',
    alt: 'alt text 5',
  },
  {
    preview: 'img/preview-6.jpeg',
    fullview: 'img/fullview-6.jpeg',
    alt: 'alt text 6',
  },
];

'use strict';

createImgGallery();

function createImgGallery() {
  const gallery = document.querySelector('.js-image-gallery');

  // Вынести в функцию createFullview()
  // const fullview = createFullview();
  const fullview = document.createElement('div');
  fullview.classList.add('fullview');

  const fullviewImg = document.createElement('img');
  fullviewImg.setAttribute('src', galleryItems[0].fullview);
  fullviewImg.setAttribute('alt', galleryItems[0].alt);

  // Вынести в функцию createPreview()
  // const preview = createPreview();
  const preview = document.createElement('ul');
  preview.classList.add('preview');

  preview.addEventListener('click', handlePreviewClick);

  const previewItems = creatItems(galleryItems);

  fullview.append(fullviewImg);
  preview.append(...previewItems);
  gallery.append(fullview, preview);

  return gallery;
}

function creatPreviewItem({ preview, fullview, alt }) {
  const previewItem = document.createElement('li');

  const previewItemImg = document.createElement('img');
  previewItemImg.setAttribute('src', preview);
  previewItemImg.setAttribute('data-fullview', fullview);
  previewItemImg.setAttribute('alt', alt);

  previewItem.append(previewItemImg);

  return previewItem;
}

function creatItems(galleryItems) {
  const elements = galleryItems.map(
    galleryItem => creatPreviewItem(galleryItem)
  );

  return elements;
}

function handlePreviewClick(evt) {
  const fullviewImg = document.querySelector('.fullview > img');
  const target = evt.target;
  const nodeName = target.nodeName;

  if (nodeName !== 'IMG') return;

  fullviewImg.setAttribute('src', target.dataset.fullview);
};

// Проверка
// console.log(gallery);

// const previewItem = creatPreviewItem(galleryItems[1]);
// console.log(previewItem);

// const previewItems = creatItems(galleryItems);
// console.log(previewItems);