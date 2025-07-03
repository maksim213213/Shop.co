import { getProductsByCategory } from '../api/dummy-api';
import type { Product } from '../api/dummy-api';

import settingsIcon from '/src/assets/icons/settingIcon.svg';

const renderStars = (rating: number): string => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  let starsHtml = '';
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHtml += '<i class="bi bi-star-fill text-warning"></i>';
    } else if (i === fullStars && halfStar) {
      starsHtml += '<i class="bi bi-star-half text-warning"></i>';
    } else {
      starsHtml += '<i class="bi bi-star text-warning"></i>';
    }
  }
  return starsHtml;
};

const renderProductCard = (product: Product): string => {
  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
  return `
    <div class="col-6 col-md-4">
      <div class="card h-100 border-0">
        <a href="/product/${product.id}" data-navigo class="text-decoration-none">
          <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title text-dark">${product.title}</h5>
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <span class="fw-bold fs-5 text-dark">$${discountedPrice}</span>
                ${product.discountPercentage > 0 ? `<del class="text-muted small ms-2">$${product.price}</del>` : ''}
              </div>
              <div class="rating">${renderStars(product.rating)}</div>
            </div>
          </div>
        </a>
      </div>
    </div>
  `;
};


// --- Основная функция страницы ---
export const categoryPage = async (categoryName: string) => {
  let originalProducts: Product[] = [];

  const displayProducts = (products: Product[]) => {
    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
      productGrid.innerHTML = products.length > 0 ? products.map(renderProductCard).join('') : '<p>No products found.</p>';
    }
  };
  
  originalProducts = await getProductsByCategory(categoryName);
  
  const html = `
    <div class="container mt-4">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/" data-navigo>Home</a></li>
          <li class="breadcrumb-item active text-capitalize" aria-current="page">${categoryName.replace(/-/g, ' ')}</li>
        </ol>
      </nav>

      <div class="row">
        <div class="col-lg-3 mb-4 mb-lg-0">
          <div class="p-3 border rounded-3">
            
            <div class="d-flex justify-content-between align-items-center">
              <h4 class="mb-0">Filters</h4>
              <a href="#filters-content" class="text-dark " data-bs-toggle="collapse" role="button" aria-expanded="true" aria-controls="filters-content">
                <img src="${settingsIcon}" "bi bi-funnel fs-5"> 
              </a>
            </div>

            <div class="collapse show" id="filters-content">
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
        </div>

        <div class="col-lg-9">
          <h2 class="text-capitalize mb-4 d-none d-lg-block">${categoryName.replace(/-/g, ' ')}</h2>
          <div id="product-grid" class="row g-4">${originalProducts.map(renderProductCard).join('')}</div>
        </div>
      </div>
    </div>
  `;

  return {
    html: html,
    postRender: () => {
      // Логика кнопок Apply и Reset
      const applyBtn = document.getElementById('apply-filters-btn');
      const resetBtn = document.getElementById('reset-filters-btn');

      const handleFilterLogic = (isReset = false) => {
        const selectedSortInput = document.querySelector('input[name="sort"]:checked') as HTMLInputElement;
        if (!selectedSortInput && !isReset) return;

        if (isReset) {
            const defaultSortInput = document.getElementById('sort-rating-desc') as HTMLInputElement;
            if (defaultSortInput) defaultSortInput.checked = true;
            displayProducts(originalProducts);
        } else {
            const sortValue = selectedSortInput.value;
            const productsToSort = [...originalProducts];
            switch (sortValue) {
              case 'price-asc': productsToSort.sort((a, b) => a.price - b.price); break;
              case 'price-desc': productsToSort.sort((a, b) => b.price - a.price); break;
              case 'rating-desc': productsToSort.sort((a, b) => b.rating - a.rating); break;
            }
            displayProducts(productsToSort);
        }
      };
      
      applyBtn?.addEventListener('click', () => handleFilterLogic());
      resetBtn?.addEventListener('click', () => handleFilterLogic(true));
      
    }
  };
};