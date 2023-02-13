function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
  const sliderWrapper = document.querySelector(wrapper),
    slider = document.querySelector(container),
    slidesField = document.querySelector(field),
    slides = document.querySelectorAll(slide),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
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
  // идникаток прозрачности dots
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
}

export default slider;