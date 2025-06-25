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
            <a href="#"><img src="${twitterIcon}" alt="Twitter"></a>
            <a href="#" class="ms-3"><img src="${facebookIcon}" alt="Facebook"></a>
            <a href="#" class="ms-3"><img src="${instagramIcon}" alt="Instagram"></a>
            <a href="#" class="ms-3"><img src="${githubIcon}" alt="github"></a>
            
          </div>

          <div class="col-6 col-md-3 col-lg-2 ps-5">
            <h6 class="fw-bold">COMPANY</h6>
            <ul class="list-unstyled">
              <li><a href="#" class="text-muted text-decoration-none">About</a></li>
              <li><a href="#" class="text-muted text-decoration-none">Features</a></li>
              <li><a href="#" class="text-muted text-decoration-none">Works</a></li>
              <li><a href="#" class="text-muted text-decoration-none">Career</a></li>
            </ul>
          </div>
          <div class="col-6 col-md-3 col-lg-2">
            <h6 class="fw-bold">HELP</h6>
            <ul class="list-unstyled">
              <li><a href="#" class="text-muted text-decoration-none">Customer Support</a></li>
              <li><a href="#" class="text-muted text-decoration-none">Delivery Details</a></li>
              <li><a href="#" class="text-muted text-decoration-none">Terms & Conditions</a></li>
              <li><a href="#" class="text-muted text-decoration-none">Privacy Policy</a></li>
            </ul>
          </div>
          <div class="col-6 col-md-3 col-lg-2">
            <h6 class="fw-bold">FAQ</h6>
            <ul class="list-unstyled">
              <li><a href="#" class="text-muted text-decoration-none">Account</a></li>
              <li><a href="#" class="text-muted text-decoration-none">Manage Deliveries</a></li>
              <li><a href="#" class="text-muted text-decoration-none">Orders</a></li>
              <li><a href="#" class="text-muted text-decoration-none">Payments</a></li>
            </ul>
          </div>
           <div class="col-6 col-md-3 col-lg-2">
            <h6 class="fw-bold">RESOURCES</h6>
            <ul class="list-unstyled">
              <li><a href="#" class="text-muted text-decoration-none">Free eBooks</a></li>
              <li><a href="#" class="text-muted text-decoration-none">Development Tutorial</a></li>
              <li><a href="#" class="text-muted text-decoration-none">How to - Blog</a></li>
              <li><a href="#" class="text-muted text-decoration-none">Youtube Playlist</a></li>
            </ul>
          </div>
        </div>
        <hr>
        <div class="d-flex justify-content-between align-items-center">
          <p class="text-muted mb-0">Shop.co © 2000-2023, All Rights Reserved</p>
          <div>
            <img src="${visaIcon}" alt="Visa" class="ms-1">
            <img src="${mastercardIcon}" alt="Mastercard" class="ms-1">
            <img src="${paypalIcon}" alt="Paypal" class="ms-1">
            <img src="${applepayIcon}" alt="Applepay" class="ms-1">
            <img src="${googlepayIcon}" alt="Googlepay" class="ms-1">
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