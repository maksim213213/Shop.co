
import cartIcon from '/src/assets/icons/cartIcon.svg';
import userIcon from '/src/assets/icons/userIcon.svg';

import { fetchDemoCart } from '/src/state/cart-state';

const render = () => {
  const html = `
    <nav class="navbar navbar-expand-lg bg-white border-bottom py-3">
      <div class="container d-flex is-justify-content-space-between align-items-center">
        <div class="d-lg-none">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu" aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon-bar"></span>
            <span class="navbar-toggler-icon-bar"></span>
            <span class="navbar-toggler-icon-bar"></span>
          </button>
        </div>

        <a href="/" class="navbar-brand fw-bold fs-4 " data-navigo>SHOP.CO</a>

        <div class="d-flex align-items-center position-relative">
          <a href="/cart" class="text-dark me-3 position-relative" aria-label="Cart" data-navigo>
            <img src="${cartIcon}" alt="Cart Icon" width="24" height="24">
            <span id="cart-badge" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="display: none;">
              0
            </span>
          </a>
          <a href="/profile" class="text-dark" aria-label="User profile" data-navigo>
            <img src="${userIcon}" alt="User Profile Icon" width="24" height="24">
          </a>
        </div>
      </div>
    </nav>

    <div class="collapse navbar-collapse" id="navbar-menu">
      <div class="container py-3">
        <a href="#footer-container" class="nav-link" data-scroll-to>About Us</a>
        <a href="#footer-container" class="nav-link" data-scroll-to>Contacts</a>
      </div>
    </div>
  `;
  return html;
};

export const updateCartBadge = async () => {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    // Показываем счетчик, только если корзина активирована
    if (sessionStorage.getItem('cartActivated') === 'true') {
      const demoCart = await fetchDemoCart();
      const totalItems = demoCart ? demoCart.totalQuantity : 0;
      badge.textContent = String(totalItems);
      badge.style.display = totalItems > 0 ? 'block' : 'none';
    } else {
      // Если не активирована, всегда прячем счетчик
      badge.style.display = 'none';
    }
  }
};

export const initializeHeader = () => {
  const headerContainer = document.getElementById('header-container');
  if (!headerContainer) return;

  headerContainer.innerHTML = render();

  //плавная прокрутка
  const scrollLinks = headerContainer.querySelectorAll('[data-scroll-to]');
  scrollLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = (event.currentTarget as HTMLAnchorElement).hash;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        const navbarMenu = document.getElementById('navbar-menu');
        const togglerButton = document.querySelector('.navbar-toggler');
        if (navbarMenu?.classList.contains('show')) {
          togglerButton?.dispatchEvent(new Event('click'));
        }
      }
    });
  });
  updateCartBadge()
};


