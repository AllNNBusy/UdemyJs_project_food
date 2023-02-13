function tabs (tabsSelector, tabsContentSelector, tabsWrapperSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsWrapper = document.querySelector(tabsWrapperSelector);

  // скрытие всех неактивных табов
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => item.classList.remove(activeClass));
  }

  // показываем табы
  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activeClass);
  }

  tabsWrapper.addEventListener('click', (event) => {
    const target = event.target;

    if(target && target.classList.contains(tabsSelector.slice(1))) {

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
}

export default tabs;