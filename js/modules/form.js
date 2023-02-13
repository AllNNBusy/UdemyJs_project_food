import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function form(formSelector, modalTimerId) {
  // формы: работа с Ajax, POST.
  // fetch API
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с Вами свяжемся',
    failure: 'Упс, что-то пошло не так',
  };

  forms.forEach(item => bindPostData(item));



  function bindPostData(form) {
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


      const formData = new FormData(form);

      // когда мы отправляем new FormData() заголовок в fetch использовать не нужно
      // fetch('server.php', {
      //   method: 'POST',
      //   body: formData
      // })
      // .then(data => data.text())
      // .then(data => {
      //   console.log(data);
      //   showThanksModal(message.success);
      // })
      // .catch(() => {
      //   showThanksModal(message.failure);
      // })
      // .finally(() => {
      //   statusMessage.remove();
      //   form.reset();
      // });


      // отправка JSON данных на сервер
      let json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
      .then(data => {
        showThanksModal(message.success);

      }).catch(() => {
        showThanksModal(message.failure);

      }).finally(() => {
        statusMessage.remove();
        form.reset();
      });
    });
  }

  // показываем модельное окно, с результатом отработки формы
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal('.modal', modalTimerId);

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
      closeModal('.modal');
    }, 4000);
  }
}

export default form;