import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './style.css';
import { Collapse } from 'bootstrap';

import { initializeHeader } from './components/header';
import { initializeRouter } from './router/router';
import { initializeDiscountBanner } from './components/discountBanner';
import { initializeSubscribe } from './components/subscribe'; 
import { initializeFooter } from './components/footer'; 

initializeDiscountBanner();
initializeHeader();
initializeSubscribe(); 
initializeFooter();


initializeRouter();

const handleResize = () => {
  const DESKTOP_BREAKPOINT = 990;
  const navbarMenu = document.getElementById('navbar-menu');

  if (window.innerWidth >= DESKTOP_BREAKPOINT) {
    if (navbarMenu && navbarMenu.classList.contains('show')) {
      const bsCollapse = new Collapse(navbarMenu, {
        toggle: false
      });
      //вызываем официальный метод для скрытия
      bsCollapse.hide();
    }
  }
};

window.addEventListener('resize', handleResize);
