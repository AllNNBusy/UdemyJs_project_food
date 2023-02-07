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


    // timer дз
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


    // slider
    const sliderWrapper = document.querySelector('.offer__slider'),
      sliderImg = sliderWrapper.querySelectorAll('.offer__slide'),
      sliderCurrent = sliderWrapper.querySelector('#current'),
      sliderTotal = sliderWrapper.querySelector('#total');

    let counter = 0;

    function hideSliderContent() {
      sliderImg.forEach(item => item.classList.add('hide'));
      sliderImg.forEach(item => item.classList.remove('show', 'fade'));
    }

    function showSliderContent(i = 0) {
      sliderImg[i].classList.add('show', 'fade');
      sliderImg[i].classList.remove('hide');

      if (sliderImg.length < 10) {
        sliderCurrent.innerHTML = `0${i + 1}`;
        sliderTotal.innerHTML = `0${sliderImg.length}`;
      } else {
        sliderCurrent.innerHTML = `${i + 1}`;
        sliderTotal.innerHTML = `${sliderImg.length}`;
      }
    }

    sliderWrapper.addEventListener('click', (event,) => {
      const target = event.target;

      if(target && (target.classList.contains('offer__slider-prev') || target.alt == 'prev')) {
        if (counter <= 0) {
          counter = sliderImg.length;
        }
        counter--;
        hideSliderContent();
        showSliderContent(counter);
      }

      if(target && (target.classList.contains('offer__slider-next') || target.alt == 'next')) {
        if (counter >= sliderImg.length - 1) {
          counter = -1;
        }
        counter++;
        hideSliderContent();
        showSliderContent(counter);
      }
    });

    hideSliderContent();
    showSliderContent();
});