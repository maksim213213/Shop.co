import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './style.css';

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
