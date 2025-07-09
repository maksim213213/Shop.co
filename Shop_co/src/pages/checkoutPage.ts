import { router } from '../router/router';
import { fetchDemoCart } from "/src/state/cart-state"; 
import { validateForm } from '/src/utils/validation';

import arrow from '/src/assets/icons/arrowRight.svg'; 


export const checkoutPage = async () => {
  // Проверяем, есть карзина
  if (sessionStorage.getItem('cartActivated') !== 'true') {
    router.navigate('/');
    return { html: '' };
  }

  // Order Summary
  const cart = await fetchDemoCart();
  const summaryHtml = cart ? `
    <div class="card rounded-3">
      <div class="card-body">
        <h5 class="card-title">Order Summary</h5>
        <hr>
        <div class="d-flex justify-content-between">
          <p class="mb-2">Subtotal</p>
          <p class="mb-2">$${cart.total.toFixed(2)}</p>
        </div>
        <div class="d-flex justify-content-between">
          <p class="mb-2">Discount</p>
          <p class="mb-2 text-danger">-$${(cart.total - cart.discountedTotal).toFixed(2)}</p>
        </div>
        <hr>
        <div class="d-flex justify-content-between fw-bold">
          <p class="mb-2">Total</p>
          <p class="mb-2">$${cart.discountedTotal.toFixed(2)}</p>
        </div>
        <div class="d-grid mt-4">
          <button class="btn btn-dark rounded-pill py-3" type="submit" form="checkout-form">Go to Payment <img src="${arrow}" style="width: 20px; height: 20px;"</button>
        </div>
      </div>
    </div>
  ` : '<p>Could not load order summary.</p>';

  // HTML-структура всей страницы
  const html = `
    <div class="container my-5">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/" data-navigo>Home</a></li>
          <li class="breadcrumb-item"><a href="/cart" data-navigo>Cart</a></li>
          <li class="breadcrumb-item active" aria-current="page">Checkout</li>
        </ol>
      </nav>
      
      <div class="row g-5">
        <div class="col-lg-7">
          <h1 class="fw-bolder mb-4">Checkout</h1>
          <div class="checkout-form-container">
            <form id="checkout-form" novalidate>
              <div class="row g-3">
                <div class="col-12">
                  <div class="form-floating">
                    <input type="text" class="form-control rounded-5" id="firstName" placeholder="First Name" required minlength="3" maxlength="32">
                    <label for="firstName">First name</label>
                    <div class="invalid-feedback" id="firstName-error"></div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating">
                    <input type="text" class="form-control rounded-5" id="lastName" placeholder="Last Name" required minlength="3" maxlength="32">
                    <label for="lastName">Last name</label>
                    <div class="invalid-feedback" id="lastName-error"></div>
                  </div>
                </div>
                 <div class="col-12">
                  <div class="form-floating">
                    <input type="text" class="form-control rounded-5" id="maidenName" placeholder="Maiden Name" required minlength="3" maxlength="32">
                    <label for="maidenName">Maiden name</label>
                    <div class="invalid-feedback" id="maidenName-error"></div>
                  </div>
                  <hr>
                </div>
                <div class="col-12">
                  <div class="form-floating">
                    <input type="email" class="form-control rounded-5" id="email" placeholder="Email" required>
                    <label for="email">Email</label>
                    <div class="invalid-feedback" id="email-error"></div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating">
                    <input type="tel" class="form-control rounded-5" id="phone" placeholder="+12 345 678 9101" required>
                    <label for="phone">Phone</label>
                    <div class="invalid-feedback" id="phone-error"></div>
                  </div>
                <hr>
                </div>
                <div class="col-12">
                  <div class="form-floating">
                    <input type="text" class="form-control rounded-5" id="address" placeholder="1234 Main St" required>
                    <label for="address">Address</label>
                    <div class="invalid-feedback" id="address-error"></div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating">
                    <input type="text" class="form-control rounded-5" id="city" placeholder="City" required>
                    <label for="city">City</label>
                    <div class="invalid-feedback" id="city-error"></div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating">
                    <input type="text" class="form-control rounded-5" id="postalCode" placeholder="Postal Code" required>
                    <label for="postalCode">Postal code</label>
                    <div class="invalid-feedback" id="postalCode-error"></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="col-lg-5">
            <div class="mt-lg-5 pt-lg-5">
                ${summaryHtml}
            </div>
        </div>
      </div>
    </div>
  `;

  return {
    html,
    postRender: () => {
      const form = document.getElementById('checkout-form') as HTMLFormElement;
      
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const isValid = validateForm(form);
        if (isValid) {
          router.navigate('/confirmation');
        }
      });
    }
  };
};