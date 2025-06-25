// src/components/header.ts
import cartIcon from '/src/assets/icons/cartIcon.svg';
import userIcon from '/src/assets/icons/userIcon.svg';

const render = () => {
  const html = `
    <nav class="navbar bg-white border-bottom py-3">
      <div class="container">
        <a href="/" class="navbar-brand fw-bold fs-4" data-navigo>SHOP.CO</a>
        <div>
          <a href="/cart" class="text-dark me-3" aria-label="Cart" data-navigo>
            <img src="${cartIcon}" alt="Cart Icon" width="24" height="24">
          </a>
          <a href="/profile" class="text-dark" aria-label="User profile" data-navigo>
            <img src="${userIcon}" alt="User Profile Icon" width="24" height="24">
          </a>
        </div>
      </div>
    </nav>
  `;
  return html;
};

export const initializeHeader = () => {
  const headerContainer = document.getElementById('header-container');
  if (headerContainer) {
    headerContainer.innerHTML = render();
  }
};