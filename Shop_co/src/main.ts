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
  const DESKTOP_BREAKPOINT = 992; // Точка, когда у нас появляется десктопное меню
  const navbarMenu = document.getElementById('navbar-menu');

  if (window.innerWidth >= DESKTOP_BREAKPOINT) {
    // Если меню существует и оно открыто (имеет класс .show)
    if (navbarMenu && navbarMenu.classList.contains('show')) {
      // Получаем экземпляр JS-компонента Bootstrap
      const bsCollapse = new Collapse(navbarMenu, {
        toggle: false // Важно, чтобы он не открыл его, если он был закрыт
      });
      // И вызываем официальный метод для скрытия
      bsCollapse.hide();
    }
  }
};

// Добавляем "слушателя" на изменение размера окна
window.addEventListener('resize', handleResize);
