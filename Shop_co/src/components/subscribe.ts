import postIcon from '/src/assets/icons/postIcon.svg'
 
const render = () => {
  const html = `
    <div id="subscribe-form-container" class="bg-dark text-white p-4 rounded-4 p-4">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <h2 class="display-5 fw-bolder p-4">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
        </div>
        <div class="col-lg-6 d-flex flex-column justify-content-center style="width: 80%">
          <form id="subscribe-form">
            <div class="input-group rounded-5 mb-3" style="overflow: hidden;">
              <span class="input-group-text bg-white border-0 ps-3">
                <img src="${postIcon}"  width="24" height="24">
              </span>
              <input type="email" id="email-input" class="form-control border-0 py-3 " placeholder="Enter your email address" required">
            </div>
            <button type="submit" class="btn btn-light  py-3 rounded-5 fw-bold w-100">Subscribe to Newsletter</button>
          </form>
        </div>
      </div>
    </div>
  `;
  return html;
};

const mockSubscribe = (email: string) => {
  console.log(`Subscribing ${email}...`);
  return new Promise(resolve => setTimeout(resolve, 1500)); 
};

export const initializeSubscribe = () => {
  const container = document.getElementById('subscribe-container');
  if (!container) return;

  container.innerHTML = render();

  const form = document.getElementById('subscribe-form') as HTMLFormElement;
  const formContainer = document.getElementById('subscribe-form-container');

  if (form && formContainer) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const emailInput = document.getElementById('email-input') as HTMLInputElement;
      const email = emailInput.value;

      if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }

      form.innerHTML = '<p>Subscribing...</p>';
      
      await mockSubscribe(email);

      // Показываем сообщение об успехе
      formContainer.innerHTML = `
        <div class="text-center p-5">
          <h2 class="display-5 fw-bolder">Success!</h2>
          <p class="lead">You've subscribed to our newslatter.</p>
        </div>
      `;
    });
  }
};