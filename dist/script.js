window.addEventListener('DOMContentLoaded', (e) => {
  // Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

        console.dir(tabsContent);
        
  function hideTabsContent () {
    tabsContent.forEach(item => {
      item.style.display = 'none';
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  };
  
  function showTabContent(i = 0) {
    tabsContent[i].style.display = `block`;
    tabs[i].classList.add('tabheader__item_active');
  }
  
  hideTabsContent();
  showTabContent();

    tabsParent.addEventListener('click', (event) => {
      const target = event.target;
      if (target && target.classList.contains('tabheader__item')) {
        //console.log(Boolean(target));
        //console.log(target.classList.contains('tabheader__item'));
        tabs.forEach((item, i) => {
          if (target == item) {
            hideTabsContent();
            showTabContent(i);
          }
        });
      }
    });
  //Timer
  const deadline = '2022-05-10';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
      let days, hours, minutes, seconds;
      if (t < 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
      } else {
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours   = Math.floor(t / ((1000 * 60 * 60)) % 24),
          minutes = Math.floor(t / ((1000 * 60)) % 24),
          seconds = Math.floor(t / (1000) % 60);
          // let date = new Date('December 25, 1995 23:15:30');
          // let day = date.getDate();

      }
    return {
        'total'   : t,
        'days'    : days,
        'hours'   : hours,
        'minutes' : minutes,
        'seconds' : seconds
    };
  }
////////////////////////////////////////////////////////////
const setClock = (selector, endtime) => {
    const timer   = document.querySelector(selector),
          days    = document.querySelector('#days'),
          hours   = document.querySelector('#hours'),
          minutes = document.querySelector('#minutes'),
          seconds = document.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

    updateClock(); // избавляемся от мигания

    function getZero(num) {
      if (num >= 0 && num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    }

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
          clearInterval(timeInterval);
        }
    }
}
////////////////////////////////////////////////////////////////////
  // function setClock(selector, endtime) {
  //   const timer   = document.querySelector(selector),
  //         days    = document.querySelector('#days'),
  //         hours   = document.querySelector('#hours'),
  //         minutes = document.querySelector('#minutes'),
  //         seconds = document.querySelector('#seconds'),
  //         timeInterval = setInterval(updateClock, 1000);

  //   updateClock(); // избавляемся от мигания

  //   function getZero(num) {
  //     if (num >= 0 && num < 10) {
  //       return `0${num}`;
  //     } else {
  //       return num;
  //     }
  //   }

  //   function updateClock() {
  //       const t = getTimeRemaining(endtime);

  //       days.innerHTML = getZero(t.days);
  //       hours.innerHTML = getZero(t.hours);
  //       minutes.innerHTML = getZero(t.minutes);
  //       seconds.innerHTML = getZero(t.seconds);

  //       if (t.total <= 0) {
  //         clearInterval(timeInterval);
  //       }
  //   }
  // }

  setClock('.timer', deadline);

// modal /////////////////////////////////////////////////////////

  const modalTrigger  = document.querySelectorAll('[data-modal]'),
        modal         = document.querySelector('.modal'),
        //modalContent  = document.querySelector('.modal__content'),
        modalCloseBtn = document.querySelector('[data-close]');

  function openModal() {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimerId);
  };

  modalTrigger.forEach(btn  => {
    btn.addEventListener('click', openModal);
  });

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  };

  modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  // const modalTimerId = setTimeout(openModal, 6000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  };

  window.addEventListener('scroll', showModalByScroll);

  // const TestTimer = setInterval(() => {
  //   console.log(window.pageYOffset);
  //   console.log(document.documentElement.clientHeight);
  //   console.log(document.documentElement.scrollHeight);
  // }, 800);

  // используем классы для карточек

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentElement);
      this.transfer = 26;
    }
    changeToUAH() {
      this.price = (this.price * this.transfer);
    }
    render() {
      const element = document.createElement('div');
      element.innerHTML = `
      <div class="menu__item">
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
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
    '.menu .container'
  ).render();
});