import { getCategories } from '../api/dummy-api';

import gucciIcon  from '/src/assets/brands-icons/gucci.svg';
import calvinKleinIcon from '/src/assets/brands-icons/calvin_klein.svg';
import pradaIcon from '/src/assets/brands-icons/prada.svg';
import versaceIcon from '/src/assets/brands-icons/versace.svg';
import zaraIcon from '/src/assets/brands-icons/zara.svg';

export const homePage = async () => {
  //категории с сервера
  const categories = await getCategories();
  console.log('Categories received from API:', categories);
  
  // Секция Hero
    const heroSection = `
  <section class="row g-0">
    <div class="col-lg-6 p-5 d-flex flex-column justify-content-center hero-text-column">

      <h1 class="hero-title fw-bolder">
        FIND <span class="text-decoration-underline">ANYTHING</span><br>THAT MATCHES<br>YOUR STYLE
      </h1>
      <p class="lead text-muted my-3">
        Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
      </p>
      <div class="mt-3 d-grid d-lg-block">
        <button id="shop-now-btn" class="btn btn-dark btn-lg px-5 py-3 rounded-5">Shop Now</button>
      </div>
      <div class="d-flex mt-5">
        <div class="me-4">
          <p class="fw-bold fs-4 mb-0">200+</p>
          <p class="text-muted">International Brands</p>
        </div>
        <div class="me-4">
          <p class="fw-bold fs-4 mb-0">2,000+</p>
          <p class="text-muted">High-Quality Products</p>
        </div>
        <div>
          <p class="fw-bold fs-4 mb-0">30,000+</p>
          <p class="text-muted">Happy Customers</p>
        </div>
      </div>
    </div>

    <div class="col-lg-6 hero-image-column">
      
    </div>
  </section>
`;

  // Секция с логотипами брендов
  const brandsSection = `
    <section class="bg-dark text-white py-4">
      <div class="container d-flex justify-content-around align-items-center flex-wrap g-3 ">
        <a href="https://www.versace.com" target="_blank">
          <img src="${versaceIcon}" alt="Versace" class="text-white text-decoration-none fs-4 m-2">
        </a>
        <a href="https://www.zara.com" target="_blank">
          <img src="${zaraIcon}" alt="Zara" class="text-white text-decoration-none fs-4 m-2">
        </a>
        <a href="https://www.gucci.com" target="_blank">
          <img src="${gucciIcon}" alt="Gucci" class="text-white text-decoration-none fs-4 m-2">
        </a>
        <a href="https://www.prada.com" target="_blank">
          <img src="${pradaIcon}" alt="Prada" class="text-white text-decoration-none fs-4 m-2">
        </a>
        <a href="https://www.calvinklein.com" target="_blank">
          <img src="${calvinKleinIcon}" alt="Calvin Klein" class="text-white text-decoration-none fs-4 m-2">
        </a>
      </div>
    </section>
  `;

  // Секция с категориями
  const categoriesSection = `
    <div class="container py-5">
      <section id="categories-section">
        <h2 class="text-center fw-bold mb-4">Categories</h2>
        <div class="row g-4">
          ${categories.slice(0,12).map(category => {
            if (typeof category !== 'string') {
              console.warn('Unexpected data in categories array, skipping item:', category);
              return '';
            }
            return `
              <div class="col-6 col-md-4 col-lg-3">
                <a href="/category/${category}" data-navigo class="category-tile card text-decoration-none text-dark text-center">
                  <div class="card-body d-flex align-items-center justify-content-center">
                    <h3 class="card-title text-capitalize fw-bold">${category.replace(/-/g, ' ')}</h3>
                  </div>
                </a>
              </div>
            `;
          }).join('')}
        </div>
      </section>
    </div>
  `;

  const html = `
    ${heroSection}
    ${brandsSection}
    ${categoriesSection}
  `;

  return {
    html: html,
    postRender: () => {
      const shopNowBtn = document.getElementById('shop-now-btn');
      const categoriesEl = document.getElementById('categories-section');
      if (shopNowBtn && categoriesEl) {
        shopNowBtn.addEventListener('click', () => {
          categoriesEl.scrollIntoView({ behavior: 'smooth' });
        });
      }
    }
  };
};