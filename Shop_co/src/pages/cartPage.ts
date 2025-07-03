// src/pages/cartPage.ts

import { fetchDemoCart } from "/src/state/cart-state";
import type { Cart } from "/src/state/cart-state";
import { updateCartBadge } from '/src/components/header';
import { router } from '/src/router/router';

// Тип для одного товара внутри объекта корзины с сервера
type CartProductItem = Cart['products'][0];

/**
 * Генерирует HTML для одного товара в списке корзины.
 * @param item - Объект товара из корзины.
 * @returns HTML-строка для карточки товара.
 */
const renderCartItem = (item: CartProductItem): string => {
  // Цена за единицу со скидкой
  const pricePerItemWithDiscount = (item.price * (1 - item.discountPercentage / 100));

  return `
    <div class="card mb-3 border-0 border-bottom rounded-0 cart-item">
      <div class="card-body px-0">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center flex-grow-1">
            <div class="bg-light rounded-3">
              <img src="${item.thumbnail}" class="img-fluid" alt="${item.title}" style="width: 100px; height: 100px; object-fit: cover;">
            </div>
            <div class="ms-4">
              <h5 class="fw-bold">${item.title}</h5>
              <div class="d-flex align-items-center">
                <p class="fw-bold fs-5 mb-0">$${pricePerItemWithDiscount.toFixed(2)}</p>
                <span class="text-muted ms-3">x ${item.quantity}</span>
                ${item.discountPercentage > 0 ? `<span class="badge bg-danger bg-opacity-75 ms-2">-${item.discountPercentage.toFixed(0)}%</span>` : ''}
              </div>
            </div>
          </div>
          <button type="button" class="btn delete-item-btn p-2" title="Remove item">
            <i class="bi bi-x-lg text-danger"></i>
          </button>
        </div>
      </div>
    </div>
  `;
};


function renderCartView(cart: Cart) {
  const discountValue = cart.total - cart.discountedTotal;
  const discountPercentage = (discountValue / cart.total * 100);

  return `
    <div class="container my-5">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/" data-navigo>Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Cart</li>
        </ol>
      </nav>
      <h1 class="fw-bolder mb-4">Your Cart</h1>
      <div class="row">
        <div class="col-lg-8">
          <div class="card border-0">
            <div class="card-body">
              ${cart.products.map(renderCartItem).join('')}
            </div>
          </div>
          <button class="btn btn-outline-danger mt-3" id="clear-cart-btn">Clear Cart</button>
        </div>
        <div class="col-lg-4">
          <div class="card rounded-3">
            <div class="card-body">
              <h5 class="card-title">Order Summary</h5>
              <hr>
              <div class="d-flex justify-content-between">
                <p class="mb-2">Subtotal</p>
                <p class="mb-2">$${cart.total.toFixed(2)}</p>
              </div>
              <div class="d-flex justify-content-between">
                <p class="mb-2">Discount (-${discountPercentage.toFixed(0)}%)</p>
                <p class="mb-2 text-danger">-$${discountValue.toFixed(2)}</p>
              </div>
              <hr>
              <div class="d-flex justify-content-between fw-bold">
                <p class="mb-2">Total</p>
                <p class="mb-2">$${cart.discountedTotal.toFixed(2)}</p>
              </div>
              <div class="d-grid mt-3">
                <a href="/checkout" class="btn btn-dark rounded-pill py-2" data-navigo>Go to Checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}


//Главная функция, которая управляет логикой отображения страницы корзины.

export const cartPage = async () => {
  const appContainer = document.getElementById('app-container');
  if (!appContainer) return;

  appContainer.innerHTML = `<div class="container my-5 text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`;

  if (sessionStorage.getItem('cartActivated') !== 'true') {
    appContainer.innerHTML = `
      <div class="container text-center my-5">
        <h1>Your Cart is Empty</h1>
        <p class="lead text-muted">Please add a product to your cart first.</p>
        <a href="/" class="btn btn-dark mt-3 rounded-pill" data-navigo>Go Shopping</a>
      </div>
    `;
    return;
  }

  // Если корзина "активирована", загружаем демонстрационную
  const cart = await fetchDemoCart();

  if (!cart) {
    appContainer.innerHTML = '<h1>Error: Could not load cart.</h1><p>Please try again later.</p>';
    return;
  }
  
  appContainer.innerHTML = renderCartView(cart);

  // Обработчик для кнопок удаления (визуальный эффект)
  document.querySelectorAll('.delete-item-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      (event.currentTarget as HTMLElement).closest('.cart-item')?.remove();
    });
  });

  // Обработчик для кнопки "clear cart"
  const clearCartBtn = document.getElementById('clear-cart-btn');
  clearCartBtn?.addEventListener('click', () => {
    sessionStorage.removeItem('cartActivated');
    updateCartBadge();
    router.navigate('/');
  });
};