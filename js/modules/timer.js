function timer(id, deadline) {

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
  setClock(id, deadline);
}

export default timer;