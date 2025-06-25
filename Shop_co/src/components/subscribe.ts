import postIcon from '/src/assets/icons/postIcon.svg'
 
const render = () => {
  const html = `
    <div id="subscribe-form-container" class="bg-dark text-white p-4 rounded-5">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <h2 class="display-5 fw-bolder">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
        </div>
        <div class="col-lg-6 d-flex flex-column justify-content-center">
          <form id="subscribe-form">
            <div class="mb-3">
              <div class="input-group rounded-5" style="overflow: hidden;">
                <span class="input-group-text bg-white border-0 ps-3">
                  <img src="${postIcon}"  width="24" height="24">
                </span>
                <input type="email" id="email-input" class="form-control border-0 py-3" placeholder="Enter your email address" required">
              </div>
            </div>
            <button type="submit" class="btn btn-light w-100 py-3 rounded-5 fw-bold">Subscribe to Newsletter</button>
          </form>
        </div>
      </div>
    </div>
  `;
  return html;
};

// Функция для имитации запроса на сервер
const mockSubscribe = (email: string) => {
  console.log(`Subscribing ${email}...`);
  return new Promise(resolve => setTimeout(resolve, 1500)); // Имитируем задержку сети
};

export const initializeSubscribe = () => {
  const container = document.getElementById('subscribe-container');
  if (!container) return;

  container.innerHTML = render();

  const form = document.getElementById('subscribe-form') as HTMLFormElement;
  const formContainer = document.getElementById('subscribe-form-container');

  if (form && formContainer) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Предотвращаем перезагрузку страницы
      
      const emailInput = document.getElementById('email-input') as HTMLInputElement;
      const email = emailInput.value;

      // Простая валидация
      if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }

      // Показываем состояние загрузки (можно добавить спиннер)
      form.innerHTML = '<p>Subscribing...</p>';
      
      await mockSubscribe(email);

      // Показываем сообщение об успехе, как в ТЗ
      formContainer.innerHTML = `
        <div class="text-center p-5">
          <h2 class="display-5 fw-bolder">Success!</h2>
          <p class="lead">You've subscribed to our newslatter.</p>
        </div>
      `;
    });
  }
};