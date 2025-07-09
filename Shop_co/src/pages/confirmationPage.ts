import { router } from '../router/router';
import { updateCartBadge } from '../components/header';

export const confirmationPage = () => {
  const html = `
    <div class="container my-5">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/" data-navigo>Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Order Confirmation</li>
        </ol>
      </nav>

      <h1 class="fw-bolder mb-4">Order Confirmation</h1>

      <div class="border p-4 rounded-5 text-start ms-0" style="max-width: 800px; margin: auto;">
        <h5 style="color: hsla(0, 0%, 0%, 0.6);">Success! Your order has been confirmed. Please check out your email address to track delivery progress.</h5>
      </div>
    </div>
  `;
  
  return {
    html,
    postRender: () => {
      // Очищаем корзину
      sessionStorage.removeItem('cartActivated');
      updateCartBadge(); // Обновляем счетчик корсзины

      setTimeout(() => {
        router.navigate('/');
      }, 5000);
    }
  };
};