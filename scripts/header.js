import { cart } from "./data/cart-class.js";

export function updateHeader() {
  const homeCartQuantity = document.querySelector('.js-cart-quantity');

  if (homeCartQuantity) {
    homeCartQuantity.innerText = cart.calculateCartQuantity();
  }
}

export function renderHeader() {
  let headerHTML = `
    
    <div class="amazon-header-left-section">
      <a href="index.html" class="header-link">
        <img class="amazon-logo"
          src="images/amazon-logo-white.png">
        <img class="amazon-mobile-logo"
          src="images/amazon-mobile-logo-white.png">
      </a>
    </div>

    <form class="amazon-header-middle-section js-search-form">
      <input class="search-bar js-search-bar" type="text" placeholder="Search">
      
      <button type="submit" class="search-button js-search-button" aria-label="Search">
        <img class="search-icon" src="images/icons/search-icon.png" alt="">
      </button>
    </form>

    <div class="amazon-header-right-section">
      <a class="orders-link header-link" href="orders.html">
        <span class="returns-text">Returns</span>
        <span class="orders-text">& Orders</span>
      </a>

      <a class="cart-link header-link" href="checkout.html">
        <img class="cart-icon" src="images/icons/cart-icon.png">
        <div class="cart-quantity js-cart-quantity"></div>
        <div class="cart-text">Cart</div>
      </a>
    </div>

  `;

  const headerContainer = document.querySelector('.js-amazon-header');
  headerContainer.innerHTML = headerHTML;

  updateHeader();

  initHeaderListeners();
}

export function initHeaderListeners() {
  const searchForm = document.querySelector('.js-search-form');
  const searchBar = document.querySelector('.js-search-bar');

  if (!searchForm || !searchBar) return;
  
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents the page from reloading
    
    const query = searchBar.value.trim().toLowerCase();;
    if (query) {
      window.location.href = `index.html?search=${encodeURIComponent(query)}`;
    }

    console.log(query);
  });
  
}