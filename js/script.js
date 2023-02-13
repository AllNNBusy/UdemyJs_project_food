"use strict";
import tabs from'./modules/tabs';
import modal from'./modules/modal';
import timer from'./modules/timer';
import cards from'./modules/cards';
import calc from'./modules/calc';
import form from'./modules/form';
import slider from'./modules/slider';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
  // таймер модельного окна
  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 15000);

  modal('[data-modal]', '.modal', modalTimerId);
  form('form', modalTimerId);
  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  timer('.timer', '2023-06-21');
  slider({
    container: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
  });
  calc();
  cards();

});