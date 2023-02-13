function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';

  if (modalTimerId) {
    clearTimeout(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  // modal
  const modal = document.querySelector(modalSelector),
  modalTrigger = document.querySelectorAll(triggerSelector);

  modalTrigger.forEach(item => item.addEventListener('click', () => openModal(modalSelector, modalTimerId)));

  modal.addEventListener('click', (event) => {

    if(event.target === modal || event.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (event) => {
    if(event.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  // после 1 показа, удаляем обработчик событий
  function showModalByScroll() {
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {openModal, closeModal};