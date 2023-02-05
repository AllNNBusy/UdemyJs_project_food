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

      if(target && (target.classList.contains('offer__slider-prev') || target.classList.contains('prev'))) {
        if (counter <= 0) {
          counter = sliderImg.length;
        }
        counter--;
        hideSliderContent();
        showSliderContent(counter);
      }

      if(target && (target.classList.contains('offer__slider-next') || target.classList.contains('next'))) {
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