// src/router/router.ts

import Navigo from 'navigo';
// Импортируем наши "страницы"
import { homePage } from '../pages/homePage';
import { cartPage } from '../pages/cartPage';
import { profilePage } from '../pages/profilePage';

const appContainer = document.getElementById('app-container');
const router = new Navigo('/');

const renderContent = (html: string) => {
  if (appContainer) {
    appContainer.innerHTML = html;
  }
};

const setupRoutes = () => {
  router
    .on('/', async () => { // <--- Делаем обработчик асинхронным
      const page = await homePage();
      renderContent(page.html);
      if (page.postRender) {
        page.postRender(); // <--- Вызываем функцию для добавления обработчиков
      }
    })
    .on('/cart', () => {
      renderContent(cartPage());
    })
    .on('/profile', () => {
      renderContent(profilePage());
    })
    // Добавим обработчик для несуществующих роутов
    .notFound(() => {
      renderContent('<h1>404 - Page Not Found</h1>');
    })
    .resolve();
};

export const initializeRouter = () => {
  setupRoutes();
  
  // После инициализации хедера, нужно обновить ссылки, чтобы Navigo их обработал
  // Эта функция найдет все ссылки с атрибутом data-navigo и повесит на них обработчики
  router.updatePageLinks(); 
};