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
        tabs.forEach((item, i) => {
          if (target == item) {
            hideTabsContent();  
            showTabContent(i);
          } 
        });
      }
    });
  //Timer
  const deadline = '2022-05-30';

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

  setClock('.timer', deadline);

// modal /////////////////////////////////////////////////////////

  const modalTrigger  = document.querySelectorAll('[data-modal]'),
        modal         = document.querySelector('.modal')

  function openModal() {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
  };

  modalTrigger.forEach(btn  => {
    btn.addEventListener('click', openModal);
  });

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  };

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
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

  // используем классы для карточек

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 26;
      this.changeToUAH();
    }
    changeToUAH() {
      this.price = this.price * this.transfer;
    }
    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) { // Значение по умолчанию для списка классов
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(ClassName => element.classList.add(ClassName));
      }
      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
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
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    16,
    '.menu .container',
    'menu__item'
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    20,
    '.menu .container',
    'menu__item'
  ).render();

  // Forms  

const forms = document.querySelectorAll('form');

const message = {
  loading: 'img/form/spinner.svg',
  success: 'Спасибо! Скоро свяжемся',
  failure: 'Ошибка'
};

forms.forEach(item => {
  bindPostData(item);
});

const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });

  return await res.json(); // метод промиса fetch
};

function bindPostData(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const statusMessage = document.createElement('img');
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
    `;
    //form.append(statusMessage);
    form.insertAdjacentElement('afterend', statusMessage);

    const formData = new FormData(form);  // аттрибут name для полей формы - обязателен!
    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    const object = {};
    formData.forEach(function(value, key) {
      object[key] = value; 
    });

    postData('https://jsonplaceholder.typicode.com/posts', json)
      .then(data => {
        console.log(data);
        showThanksModal(message.success); /// вызов модалки
        statusMessage.remove();
    }).catch(() => {
        showThanksModal(message.failure);
    }).finally(() => {
        form.reset();
    })

    // const json = JSON.stringify(object);
    // request.send(json);
  });
}

function showThanksModal(message) {
  const prevModalDialog = document.querySelector('.modal__dialog');

  prevModalDialog.classList.add('hide');
  openModal();

  const thanksModal = document.createElement('div');
  thanksModal.classList.add('modal__dialog');
  thanksModal.innerHTML = `
    <div class = "modal__content">
      <div class = "modal__close" data-close>x</div>
      <div class = "modal__title" data-close>${message}</div>
    </div>
  `;
  
  document.querySelector('.modal').append(thanksModal);
  setTimeout(() => {
    thanksModal.remove();
    prevModalDialog.classList.add('show');
    prevModalDialog.classList.remove('hide');
    closeModal();
  }, 3000);
}

fetch("../db.json")
  .then(res => {
    res.json(); 
    console.log('fetching file done.')
  })
  .catch(() => console.log('db.json error!'));

  /// Slides
  const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner');
        width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1,
      offset = 0;

  console.log(width);

  // вся ширина прокрутки
  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';
  slidesWrapper.style.overflow = 'hidden';

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  /// Carousel
  const dots = document.createElement('ol'),
        dot = document.createElement('li'),
        dotsArr = [];

  dots.classList.add('carousel-dots');
  slider.append(dots);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dots.append(dot);
    dot.classList.add('dot');
    dotsArr.push(dot);
    if (i == 0) {
      dot.style.opacity = 1;
    }
  }

  function setCounter(slideIndex) {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  };

  function setDots(arr, slideIndex) {
    arr.forEach(dot => dot.style.opacity = '0.5');
    arr[slideIndex - 1].style.opacity = 1;
  };

  /// Buttons
  next.addEventListener('click', () => {
    if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) { // width: '500px'
      offset = 0;
    } else {
      offset += +width.replace(/\D/g, '');
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    setCounter(slideIndex);
    setDots(dotsArr, slideIndex);
  });

  prev.addEventListener('click', () => {
    if (offset == 0) { // width: '500px'
      offset = +width.replace(/\D/g, '') * (slides.length - 1)
    } else {
      offset -= +width.replace(/\D/g, '');
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
  
    setCounter(slideIndex);
    setDots(dotsArr, slideIndex);
  });

  dotsArr.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = +width.replace(/\D/g, '') * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      setCounter(slideIndex);
      setDots(dotsArr, slideIndex);
    });
  });
// slider automation

// if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
//   console.log('11');
  const offer__slider = document.querySelector('.offer__slider'),
        sliderHeight = window.getComputedStyle(offer__slider).height.slice(0, 3),
        sliderYoffset = offer__slider.getBoundingClientRect().top,
        sliderHeightFull = +sliderHeight + sliderYoffset;
//   const interval = setInterval(() => {
//     console.log(sliderHeightFull);
//     console.log(sliderHeight.slice(0, 3));
//     console.log(sliderYoffset);
// }, 1000);

  const interval = setInterval(() => {
    if (window.pageYOffset + document.documentElement.clientHeight >= sliderHeightFull) {
      setTimeout(next.click(), 1000);
      clearInterval(interval);
    }
  }, 1000);

});