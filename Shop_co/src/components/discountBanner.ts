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
  const isBannerClosed = sessionStorage.getItem(BANNER_STORAGE_KEY);
  if (isBannerClosed === 'true') {
    return;
  }

  const bannerContainer = document.getElementById('discount-banner-container');
  if (bannerContainer) {
    bannerContainer.innerHTML = render();

    const closeButton = document.getElementById('close-banner-btn');
    const bannerElement = document.getElementById('discount-banner');

    if (closeButton && bannerElement) {
      closeButton.addEventListener('click', () => {
        bannerElement.classList.add('hidden');
        sessionStorage.setItem(BANNER_STORAGE_KEY, 'true');
      });
    }
  }
};