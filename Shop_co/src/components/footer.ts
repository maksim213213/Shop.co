import twitterIcon from '/src/assets/icons/twitterIcon.svg';
import facebookIcon from '/src/assets/icons/facebookIcon.svg';
import githubIcon from '/src/assets/icons/githubIcon.svg';
import instagramIcon from '/src/assets/icons/instagramIcon.svg';
import applepayIcon from '/src/assets/icons/applepay.svg';
import paypalIcon from '/src/assets/icons/paypal.svg';
import visaIcon from '/src/assets/icons/visa.svg';
import mastercardIcon from '/src/assets/icons/mastercard.svg';
import googlepayIcon from '/src/assets/icons/googlepay.svg';

const render = () => {
  const html = `
    <div class="bg-light site-footer"  >
      <div class="container">
        <div class="row">

          <div class="col-12 col-lg-3 mb-4 pe-5">
            <h5 class="fw-bold fs-4">SHOP.CO</h5>
            <p class="text-muted">We have clothes that suits your style and which you're proud to wear. From women to men.</p>
            <div class="d-flex">
                <a href="#"><img src="${twitterIcon}" alt="Twitter"></a>
                <a href="#" class="ms-3"><img src="${facebookIcon}" alt="Facebook"></a>
                <a href="#" class="ms-3"><img src="${instagramIcon}" alt="Instagram"></a>
                <a href="#" class="ms-3"><img src="${githubIcon}" alt="github"></a>
            </div>
          </div>

          <div class="col-6 col-lg-2 mb-4">
            <h6 class="fw-bold">COMPANY</h6>
            <ul class="list-unstyled">
              <li><a href="#" class="text-muted text-decoration-none mb-2">About</a></li>
              <li><a href="#" class="text-muted text-decoration-none mb-2">Features</a></li>
              <li><a href="#" class="text-muted text-decoration-none mb-2">Works</a></li>
              <li><a href="#" class="text-muted text-decoration-none mb-2">Career</a></li>
            </ul>
          </div>
          <div class="col-6 col-lg-2 mb-4">
            <h6 class="fw-bold">HELP</h6>
            <ul class="list-unstyled">
              <li><a href="#" class="text-muted text-decoration-none mb-2">Customer Support</a></li>
              <li><a href="#" class="text-muted text-decoration-none mb-2">Delivery Details</a></li>
              <li><a href="#" class="text-muted text-decoration-none mb-2">Terms & Conditions</a></li>
              <li><a href="#" class="text-muted text-decoration-none mb-2">Privacy Policy</a></li>
            </ul>
          </div>
          <div class="col-6 col-lg-2 mb-4">
            <h6 class="fw-bold">FAQ</h6>
            <ul class="list-unstyled"> 
              <li><a href="#" class="text-muted text-decoration-none mb-2">Account</a></li>
              <li><a href="#" class="text-muted text-decoration-none mb-2">Manage Deliveries</a></li>
              <li><a href="#" class="text-muted text-decoration-none mb-2">Orders</a></li>
              <li><a href="#" class="text-muted text-decoration-none mb-2">Payments</a></li>
            </ul>
          </div>
           <div class="col-6 col-lg-2 mb-4">
            <h6 class="fw-bold">RESOURCES</h6>
            <ul class="list-unstyled">
              <li><a href="#" class="text-muted text-decoration-none mb-2">Free eBooks</a></li>
              <li><a href="#" class="text-muted text-decoration-none mb-2">Development Tutorial</a></li>
              <li><a href="#" class="text-muted text-decoration-none mb-2">How to - Blog</a></li>
              <li><a href="#" class="text-muted text-decoration-none mb-2">Youtube Playlist</a></li>
            </ul>
          </div>
        </div>
        <hr>
        <div class="d-flex flex-column flex-lg-row justify-content-between align-items-center">
          <p class="text-muted mb-3 mb-lg-0">Shop.co © 2000-2023, All Rights Reserved</p>
          <div>
            <img src="${visaIcon}" alt="Visa" class="ms-2">
            <img src="${mastercardIcon}" alt="Mastercard" class="ms-2">
            <img src="${paypalIcon}" alt="Paypal" class="ms-2">
            <img src="${applepayIcon}" alt="Applepay" class="ms-2">
            <img src="${googlepayIcon}" alt="Googlepay" class="ms-2">
          </div>
        </div>
      </div>
    </div>
  `;
  return html;
};

export const initializeFooter = () => {
  const container = document.getElementById('footer-container');
  if (container) {
    container.innerHTML = render();
  }
};