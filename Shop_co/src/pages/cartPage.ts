//Момент из ТЗ по поводу URL. В ТЗ указан /cart/:cartId, 
//что предполагает загрузку корзины с сервера по ID. Так как я решил 
//хранить корзину на стороне клиента в localStorage (из-за ограничений API dummyjson), 
//из за этого нет этого серверного ID. Поэтому сделан статический URL /cart, что более 
//логично для архитектуры проекта.

import { getCart, removeFromCart, clearCart} from '/src/state/cart-state';
import type { CartItem } from '/src/state/cart-state';
import { updateCartBadge } from '/src/components/header';
import { router } from '/src/router/router'; 

import arrow from '/src/assets/icons/arrowRight.svg';
// Главная функция, которая будет управлять всей страницей
const renderCartItem = (item: CartItem): string => {
  const discountedPrice = (item.price * (1 - item.discountPercentage / 100));

  return `
    <div class="card mb-3 border-0 border-bottom rounded-0 cart-item">
      <div class="card-body px-0">
        <div class="d-flex justify-content-between">
          <div class="d-flex align-items-center">
            <div class="bg-light rounded-3">
              <img src="${item.thumbnail}" class="img-fluid" alt="${item.title}" style="width: 100px; height: 100px; object-fit: cover;">
            </div>
            <div class="ms-4">
              <h5 class="fw-bold">${item.title}</h5>
              <div class="d-flex align-items-center">
                <p class="fw-bold fs-5 mb-0">$${discountedPrice.toFixed(2)}</p>
                <span class="text-muted ms-2 " style="font-size: 14px">x ${item.quantity}</span>
                ${item.discountPercentage > 0 ? `<span class="badge bg-danger bg-opacity-75 ms-2">-${item.discountPercentage.toFixed(0)}%</span>` : ''}
              </div>
            </div>
          </div>
          <button type="button" class="btn delete-item-btn" data-product-id="${item.id}">
            <i class="bi bi-x-lg text-danger"></i>
          </button>
        </div>
      </div>
    </div>
  `;
};

// Вспомогательная функция, которая генерирует HTML для страницы с товарами
function renderCartView(cart: CartItem[]) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = cart.reduce((sum, item) => {
    const originalItemPrice = item.price * item.quantity;
    const discountedItemPrice = (item.price * (1 - item.discountPercentage / 100)) * item.quantity;
    return sum + (originalItemPrice - discountedItemPrice);
  }, 0);
  const total = subtotal - totalDiscount;

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
              ${cart.map(renderCartItem).join('')}
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
                <p class="mb-2">$${subtotal.toFixed(2)}</p>
              </div>
              <div class="d-flex justify-content-between">
                <p class="mb-2">Discount (-${(totalDiscount / subtotal * 100).toFixed(0)}%)</p>
                <p class="mb-2 text-danger">-$${totalDiscount.toFixed(2)}</p>
              </div>
              <hr>
              <div class="d-flex justify-content-between fw-bold">
                <p class="mb-2">Total</p>
                <p class="mb-2">$${total.toFixed(2)}</p>
              </div>
              <div class="d-grid mt-3">
                <a href="/checkout" class="btn btn-dark" data-navigo>Go to Checkout  <img src="${arrow} " style="width: 21px; height: 21px; object-fit: cover; border-radius: 8px;"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Главная функция, которая будет управлять всей страницей
export const cartPage = () => {
  const appContainer = document.getElementById('app-container');

  const rerender = () => {
    const currentCart = getCart();
    if (appContainer) {
      if (currentCart.length === 0) {
        appContainer.innerHTML = `
          <div class="container text-center my-5">
            <h1>Your Cart is Empty</h1>
            <p class="lead text-muted">Looks like you haven't added anything to your cart yet.</p>
            <a href="/" class="btn btn-dark mt-3 rounded-pill" data-navigo>Go Shopping</a>
          </div>
        `;
      } else {
        appContainer.innerHTML = renderCartView(currentCart);
      }
      attachEventListeners();
    }
  };

  const attachEventListeners = () => {
    document.querySelectorAll('.delete-item-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        const productId = (event.currentTarget as HTMLElement).dataset.productId;
        if (productId) {
          removeFromCart(Number(productId));
          updateCartBadge();
          rerender();
        }
      });
    });

    const clearCartBtn = document.getElementById('clear-cart-btn');
    clearCartBtn?.addEventListener('click', () => {
      clearCart();
      updateCartBadge();
      router.navigate('/');
    });
  };

  rerender();

  return { html: '' };
};