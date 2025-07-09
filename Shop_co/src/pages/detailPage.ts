import { getProductById} from '/src/api/dummy-api';
import { updateCartBadge } from '/src/components/header';

import minusIcon from '/src/assets/icons/minus.svg';
import plusIcon from '/src/assets/icons/plus.svg';

//отрисовка звезд
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


export const productDetailPage = async (productId: string) => {
  const product = await getProductById(productId);

  if (!product) {
    return { html: '<h1>404 - Product Not Found</h1><a href="/" data-navigo>Go back to homepage</a>' };
  }

  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);

  const html = `
    <div class="container my-5">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/" data-navigo>Home</a></li>
          <li class="breadcrumb-item text-capitalize"><a href="/category/${product.category}" data-navigo>${product.category.replace(/-/g, ' ')}</a></li>
          <li class="breadcrumb-item active" aria-current="page">${product.title}</li>
        </ol>
      </nav>

      <div class="row g-5">
        <div class="col-lg-6">
          <div class="mb-3">
            <img src="${product.thumbnail}" id="main-product-image" class="w-100 rounded" alt="${product.title}">
          </div>
          <div class="d-flex justify-content-start">
            ${product.images.slice(0, 4).map((imgUrl: any) => `
              <div class="thumbnail-container me-2 border border-2 rounded">
                <img src="${imgUrl}" class="img-fluid product-thumbnail" data-full-image="${imgUrl}" style="cursor: pointer; height: 80px; width: 80px; object-fit: cover;">
              </div>
            `).join('')}
          </div>
        </div>

        <div class="col-lg-6">
          <h1 class="fw-bold">${product.title}</h1>
          <div class="d-flex align-items-center mb-3">
            <div class="rating me-2">${renderStars(product.rating)}</div>
            <span class="text-muted">${product.rating}/5</span>
          </div>
          <div class="mb-3">
            <span class="fw-bold fs-3">$${discountedPrice}</span>
            ${product.discountPercentage > 0 ? `<span class="badge bg-danger ms-2">-${product.discountPercentage.toFixed(0)}%</span><br><del class="text-muted small ms-1">$${product.price}</del>` : ''}
          </div>
          <p class="text-muted">${product.description}</p>
          <hr>
          
          ${product.brand ? `
            <div class="mb-3">
              <span class="text-muted">Brand</span>
              <p class="fw-bold fs-5 mb-0">${product.brand}</p>
            </div>
          ` : ''}
          <div class="mb-3">
              <span class="text-muted">In Stock</span>
              <p class="text-success fw-bold fs-5 mb-0">${product.stock} items</p>
          </div>
          <hr>
          <div class="d-flex align-items-center mb-4">
            <div class="quantity-selector">
              <button class="quantity-btn" id="quantity-minus" type="button">
                <img src="${minusIcon}" alt="Minus">
              </button>
              <span id="quantity-value" class="quantity-value">1</span>
              <button class="quantity-btn" id="quantity-plus" type="button">
                <img src="${plusIcon}" alt="Plus">
              </button>
            </div>
            <button id="add-to-cart-btn" class="btn btn-dark btn-lg ms-3 flex-grow-1 rounded-pill">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  `;

  return {
    html: html,
    postRender: () => {
      //Логика галереи изображений
      const mainImage = document.getElementById('main-product-image') as HTMLImageElement;
      document.querySelectorAll('.product-thumbnail').forEach(thumb => {
        thumb.addEventListener('click', (event) => {
          const target = event.currentTarget as HTMLImageElement;
          const fullImageUrl = target.dataset.fullImage;
          if (mainImage && fullImageUrl) {
            mainImage.src = fullImageUrl;
          }
        });
      });

      //Декоративная логика для +/-
      const quantityValueEl = document.getElementById('quantity-value');
      document.getElementById('quantity-plus')?.addEventListener('click', () => {
          if(quantityValueEl) quantityValueEl.textContent = String(Number(quantityValueEl.textContent) + 1);
      });
      document.getElementById('quantity-minus')?.addEventListener('click', () => {
          if(quantityValueEl && Number(quantityValueEl.textContent) > 1) {
              quantityValueEl.textContent = String(Number(quantityValueEl.textContent) - 1);
          }
      });
      
      const addToCartBtn = document.getElementById('add-to-cart-btn') as HTMLButtonElement;
      if (!addToCartBtn) return;

      if (sessionStorage.getItem('cartActivated') === 'true') {
        addToCartBtn.setAttribute('disabled', 'true');
      } else {
        addToCartBtn.addEventListener('click', async () => {
          addToCartBtn.textContent = 'Activating...';
          sessionStorage.setItem('cartActivated', 'true');

          await updateCartBadge();

          addToCartBtn.textContent = 'Add to Cart';
        }, { once: true }); //заставляет обработчик сработать один раз и удалиться
      }
    }
  };
};