function calc() {
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

  const convertStrToNumber = str => +str.replace(/\D/g, '');

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
          height = convertStrToNumber(input.value);
          break;
        case 'weight':
          weight = convertStrToNumber(input.value);
          break;
        case 'age':
          age = convertStrToNumber(input.value);
          break;
      }

      calcTotal();
    });
  }

  getDinamicInformation('#height');
  getDinamicInformation('#weight');
  getDinamicInformation('#age');
}

export default calc;