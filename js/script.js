"use strict";

document.addEventListener('DOMContentLoaded', (event) => {
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsWrapper = document.querySelector('.tabheader__items');

  // tabs на уроку

  // скрытие всех неактивных табов
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => item.classList.remove('tabheader__item_active'));
  }

  // показываем табы
  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  tabsWrapper.addEventListener('click', (event) => {
    const target = event.target;

    if(target && target.classList.contains('tabheader__item')) {

      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  hideTabContent();
  showTabContent();


  // timer
  const deadline = '2023-06-21';

  // вычисляем остаток таймера
  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - new Date();

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;

    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor(t / (1000 * 60 * 60) % 24);
      minutes = Math.floor(t / (1000 * 60) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }

    return {'total': t, days, hours, minutes, seconds};
  }

  // функция помощник добавляет 0 если num < 10
  const getZero = num => (num >= 0 && num < 10) ? `0${num}` : num;

  // создаем таймер на странице
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    // фикс мерцания
    updateClock();

    function updateClock() {
      // получаем результат функции в переменную t
      const t = getTimeRemaining(endtime);
      // создаем таймер на странице
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      // если таймер закончился, останавливаем сет интервал
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  // передаем селектор и дэдлайн
  setClock('.timer', deadline);


  // modal
  const modal = document.querySelector('.modal'),
    modalTrigger = document.querySelectorAll('[data-modal]');


  function openModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    clearTimeout(modalTimerId);
    window.removeEventListener('scroll', showModalByScroll);
  }

  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  modalTrigger.forEach(item => item.addEventListener('click', openModal));

  modal.addEventListener('click', (event) => {

    if(event.target === modal || event.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if(event.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 15000);

  // после 1 показа, удаляем обработчик событий
  function showModalByScroll() {
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);


  // Используем классы для карточек
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 70;
      this.changeToRUB();
    }

    changeToRUB() {
      this.price *= this.transfer;
    }

    // создаем версту
    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.classes.push('menu__item');
      }

      this.classes.forEach(className => element.classList.add(className));
      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> рублей/день</div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container',
    'menu__item',
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    14,
    '.menu .container',
    'menu__item',
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    21,
    '.menu .container',
    'menu__item',
  ).render();


  // формы: работа с Ajax, POST.
  // 1) Старый метод XMLHttpRequest
  // Forms
  const forms = document.querySelectorAll('form');

  forms.forEach(item => postData(item));

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с Вами свяжемся',
    failure: 'Упс, что-то пошло не так',
  };

  function postData(form) {
    // 'submit' срабатывает каждый раз когда 'пытаемся' отправить форму
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      // устанавливаем спинер в верстку
      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.alt = 'loading';
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage);

      // POST запрос, сохраняем данные на нашем server.php
      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');

      // formData когда мы используем связку XMLHttpRequest + formData: заголовок устанавливать не нужно! запомнить
      const formData = new FormData(form);
      // request.send(formData);

      // отправка JSON данных на сервер
      let object = {};
      formData.forEach((value, key) => object[key] = value);

      const json = JSON.stringify(object);
      request.send(json);

      // создаем обработчик события load - загрузка заверщена
      request.addEventListener('load', () => {
        if (request.status === 200) {
          showThanksModal(message.success);
          statusMessage.remove();
          form.reset();
        } else {
          showThanksModal(message.failure);
          statusMessage.remove();
          form.reset();
        }
      });
    });
  }

  // показываем модельное окно, с результатом отработки формы
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal();

    // создаем новое окно
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;
    // помещаем новое окно на страницу
    document.querySelector('.modal').append(thanksModal);

    // через 4 секунды возвращаем старое окно
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }


  // slider carousel
  const sliderWrapper = document.querySelector('.offer__slider-wrapper'),
    slider = document.querySelector('.offer__slider'),
    slidesField = sliderWrapper.querySelector('.offer__slider-inner'),
    slides = slidesField.querySelectorAll('.offer__slide'),
    prev = slider.querySelector('.offer__slider-prev'),
    next = slider.querySelector('.offer__slider-next'),
    total = slider.querySelector('#total'),
    current = slider.querySelector('#current'),
    width = window.getComputedStyle(sliderWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  // добавляем 0 если слайдов меньше 10
  function addZero(n) {
    if(slides.length < 10) {
      total.textContent = `0${slides.length}`;
      current.textContent = `0${n}`;
    } else {
      total.textContent = slides.length;
      current.textContent = n;
    }
  }

  addZero(slideIndex);
  // индикаток прозрачности dots
  function opasityDots() {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  }
  // меняем положение слайдов
  const sliderTranslate = () => slidesField.style.transform = `translateX(-${offset}px)`;

  // преобразование строки в число
  const convertStrToNum = str => +str.replace(/\D/g, '');

  // задаем ширину обёртке
  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';
  // скрываем элементы которые не попадают в область видимости(100%)
  sliderWrapper.style.overflow = 'hidden';
  // устанавливаем ширину слайдов
  slides.forEach(slide => {
    slide.style.width = width;
  });
  // устанавливаем позицию relative что-бы спозиционировать dots под слайдером
  slider.style.position = 'relative';

  // создаем обёртку для dots
  const indicators = document.createElement('ol'),
    dots = [];

  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    // создаем dot
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');

    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    // пушим готовые dot в массив
    dots.push(dot);
  }

  // обработчик событий
  next.addEventListener('click', () => {
    if (offset === convertStrToNum(width) * (slides.length - 1)) {  // width 650px
      offset = 0;
    } else {
      offset += convertStrToNum(width);
    }

    if(slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    // добавляем наши dots к обработчикам событий
    opasityDots();
    addZero(slideIndex);
    sliderTranslate();
  });

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = convertStrToNum(width) * (slides.length - 1);
    } else {
      offset -= convertStrToNum(width);
    }

    if(slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
    opasityDots();
    addZero(slideIndex);
    sliderTranslate();
  });

  // добавляем функционал нашим точкам
  dots.forEach(dot => {
    dot.addEventListener('click', (event) => {
      const slideTo = event.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = convertStrToNum(width) * (slideTo - 1);

      opasityDots();
      addZero(slideIndex);
      sliderTranslate();
    });
  });

  // calculator

  const result = document.querySelector('.calculating__result span');
  let height, weight, age,
    ratio = localStorage.getItem('ratio') || 1.375,
    sex = localStorage.getItem('sex') || 'female';

  if (!localStorage.getItem('ratio')) {
    localStorage.setItem('ratio', 1.375);
  }
  if (!localStorage.getItem('sex')) {
    localStorage.setItem('sex', 'female');
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  // формула активности
  function calcTotal() {
    if(!sex || !height || !weight || !age || !ratio) {
      result.textContent = '0';
      return;
    }

    if (sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }

  calcTotal();

  // получение статической информации
  function getStaticInformation(Selector, activeClass) {
    const elements = document.querySelectorAll(Selector);

    elements.forEach(elem => elem.addEventListener('click', (event) => {
      if (event.target.getAttribute('data-ratio')) {
        ratio = +event.target.getAttribute('data-ratio');
        // сохраняем данных в localStorage
        localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
      } else {
        sex = event.target.getAttribute('id');
        // сохраняем данных в localStorage
        localStorage.setItem('sex', event.target.getAttribute('id'));
      }
      elements.forEach(elem => {
            elem.classList.remove(activeClass);
      });

      event.target.classList.add(activeClass);

      calcTotal();
    }));
  }

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  // обработка input
  function getDinamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {

      // валидация
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }

      if (input.value.length > 3) {
        input.value = input.value.slice(0, 3);
      }

      switch(input.getAttribute('id')) {
        case 'height':
          height = convertStrToNum(input.value);
          break;
        case 'weight':
          weight = convertStrToNum(input.value);
          break;
        case 'age':
          age = convertStrToNum(input.value);
          break;
      }

      calcTotal();
    });
  }

  getDinamicInformation('#height');
  getDinamicInformation('#weight');
  getDinamicInformation('#age');
});