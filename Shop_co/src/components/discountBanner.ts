const BANNER_STORAGE_KEY = 'discountBannerClosed';

const render = () => {
  const html = `
    <div id="discount-banner" class="bg-dark text-white text-center p-2 d-flex justify-content-center align-items-center">
      <p class="mb-0 me-4">
        Sign up and get 20% off to your first order. <a href="#" class="text-white fw-semibold">Sign Up Now</a>
      </p>
      <button type="button" id="close-banner-btn" class="btn-close btn-close-white" aria-label="Close"></button>
    </div>
  `;
  return html;
};

export const initializeDiscountBanner = () => {
  // Проверяем, не закрывал ли пользователь баннер ранее
  const isBannerClosed = localStorage.getItem(BANNER_STORAGE_KEY);
  if (isBannerClosed === 'true') {
    return; // Если да, то просто выходим и не рендерим баннер
  }

  const bannerContainer = document.getElementById('discount-banner-container');
  if (bannerContainer) {
    bannerContainer.innerHTML = render();

    // Находим кнопку закрытия
    const closeButton = document.getElementById('close-banner-btn');
    const bannerElement = document.getElementById('discount-banner');

    if (closeButton && bannerElement) {
      // Добавляем обработчик клика
      closeButton.addEventListener('click', () => {
        // Прячем баннер
        bannerElement.style.display = 'none';
        // Сохраняем информацию в localStorage, чтобы больше не показывать
        localStorage.setItem(BANNER_STORAGE_KEY, 'true');
      });
    }
  }
};