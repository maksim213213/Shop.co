import { getProductsByCategory } from '../api/dummy-api';
import type { Product } from '../api/dummy-api';

import setting from '/src/assets/icons/settingIcon.svg';

//рендаринг звёзд
const renderStars = (rating: number): string => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  let starsHtml = '';
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHtml += '<i class="bi bi-star-fill text-warning"></i>'; // Заполненная звезда
    } else if (i === fullStars && halfStar) {
      starsHtml += '<i class="bi bi-star-half text-warning"></i>'; // Звезда-половинка
    } else {
      starsHtml += '<i class="bi bi-star text-warning"></i>'; // Пустая звезда
    }
  }
  return starsHtml;
};

// Вспомогательная функция для отрисовки карточки одного товара
const renderProductCard = (product: Product): string => {
  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);

  return `
    <div class="col-6 col-md-4">
      <div class="card h-100">
        <a href="/product/${product.id}" data-navigo>
          <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
        </a>
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <span class="fw-bold fs-5">$${discountedPrice}</span>
              ${product.discountPercentage > 0 ? `<del class="text-muted small ms-2">$${product.price}</del>` : ''}
            </div>
            <div class="rating">
              ${renderStars(product.rating)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export const categoryPage = async (categoryName: string) => {
  const products = await getProductsByCategory(categoryName);
  
  const html = `
    <!-- location Home/categoryName -->
    <div class="container mt-4">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/" data-navigo>Home</a></li>
          <li class="breadcrumb-item active text-capitalize" aria-current="page">${categoryName.replace(/-/g, ' ')}</li>
        </ol>
      </nav>
      
      <!-- Фильтры и список товаров -->
      <div class="col-lg-3">
          <div class="p-3 border rounded-3">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="mb-0">Filers</h4>
              <img src="${setting}" alt="Filter icon"></img>
            </div>
            <hr>
            
            <div>
              <h5 class="mb-3">Sort By</h5>
              <div class="custom-radio mb-2">
                <input type="radio" id="sort-price-asc" name="sort" value="price-asc">
                <label for="sort-price-asc">Price: Ascending</label>
              </div>
              <div class="custom-radio mb-2">
                <input type="radio" id="sort-price-desc" name="sort" value="price-desc">
                <label for="sort-price-desc">Price: Descending</label>
              </div>
              <div class="custom-radio mb-2">
                <input type="radio" id="sort-rating-desc" name="sort" value="rating-desc" checked>
                <label for="sort-rating-desc">Rating: High to Low</label>
              </div>
            </div>
            <hr>

            <div class="d-grid gap-2">
                <button id="apply-filters-btn" class="btn btn-dark rounded-pill py-2">Apply Filter</button>
                <button id="reset-filters-btn" class="btn btn-light border rounded-pill py-2">Reset Filter</button>
            </div>
          </div>
        </div>

        <!-- all categoty-->
        <div class="col-lg-9">
          <h2 class="text-capitalize mb-4">${categoryName.replace(/-/g, ' ')}</h2>
          <div id="product-grid" class="row g-4">
            ${products.map(renderProductCard).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  return {
    html: html,
    postRender: () => {
      
    }
  };
};