import Navigo from 'navigo';
//pages
import { homePage } from '../pages/homePage';
import { cartPage } from '../pages/cartPage';
import { profilePage } from '../pages/profilePage';
import { categoryPage } from '../pages/categoryPage';

const appContainer = document.getElementById('app-container');
const router = new Navigo('/');

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
      renderContent(cartPage());
    })
    .on('/profile', () => {
      renderContent(profilePage());
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