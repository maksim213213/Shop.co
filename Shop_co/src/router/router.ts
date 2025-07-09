import Navigo from 'navigo';
//pages

import { homePage } from '../pages/homePage';
import { cartPage } from '../pages/cartPage'
import { categoryPage } from '../pages/categoryPage';
import { productDetailPage } from '../pages/detailPage';
import { checkoutPage } from '../pages/checkoutPage'; 
import { confirmationPage } from '../pages/confirmationPage';

const appContainer = document.getElementById('app-container');
export const router = new Navigo('/');

const renderContent = (html: string) => {
  if (appContainer) {
    appContainer.innerHTML = html;
  }
};

const setupRoutes = () => {
  router
    .on('/', async () => {
      const page = await homePage();
      renderContent(page.html);
      if (page.postRender) {
        page.postRender(); 
      }
    })
    .on('/cart', () => {
      cartPage();
    })
    .on('/category/:categoryName', async (match) => {
      if (match && match.data) {
        const page = await categoryPage(match.data.categoryName);
        renderContent(page.html);
        if (page.postRender) {
          page.postRender();
        }
      }
    })
    .on('/product/:productId', async (match) => {
      if (match && match.data) {
        const page = await productDetailPage(match.data.productId);
        renderContent(page.html);
        if (page.postRender) {
          page.postRender();
        }
      }
    })
    .on('/checkout', async () => {
      const page = await checkoutPage(); 
      renderContent(page.html);
      if (page.postRender) {
        page.postRender();
      }
    })
    .on('/confirmation', () => {
      const page = confirmationPage();
      renderContent(page.html);
      if (page.postRender) {
        page.postRender();
      }
    })
    //для не найденых роутеров
    .notFound(() => {
      renderContent('<h1>404 - Page Not Found</h1>');
    })
    .resolve();
};

export const initializeRouter = () => {
  setupRoutes();
  
  router.updatePageLinks(); 
};