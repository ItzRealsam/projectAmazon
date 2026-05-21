import { calculateCartQuantity, cart, removeFromCart, updateCartQuantity } from '../data/cart.js';
import { getProduct } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

const checkoutCartQuantity = document.querySelector('.js-checkout-header-cart-quantity');
checkoutCartQuantity.innerText = '';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  const matchingItem = getProduct(productId);

  cartSummaryHTML +=
  `
    <div class="cart-item-container
    js-cart-item-container-${matchingItem.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingItem.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingItem.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label 
                js-quantity-label-${matchingItem.id}">
                ${cartItem.quantity}
              </span>
            </span>
            <span class="update-quantity-link 
              js-update-quantity-link link-primary"
              data-product-id ="${matchingItem.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingItem.id}">
            <span class="save-quantity-link 
              js-save-quantity-link link-primary"
              data-product-id = "${matchingItem.id}">
              Save
            </span>
            <span class="delete-quantity-link 
              js-delete-quantity-link link-primary"
              data-product-id = "${matchingItem.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

});

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {

      const { productId } = link.dataset;

      removeFromCart(productId);

      const container =
        document.querySelector(
          `.js-cart-item-container-${productId}`
        );

      container.remove();

      updateCheckoutCartQuantity();

    });
  });

function updateCheckoutCartQuantity() {
  checkoutCartQuantity.innerText = `${calculateCartQuantity()} items`;
}

updateCheckoutCartQuantity();

document.querySelectorAll('.js-update-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {

      const { productId } = link.dataset;

      const container =
        document.querySelector(
          `.js-cart-item-container-${productId}`
        );
      
      container.classList.add('is-editing-quantity');
    })
    
  })

function saveQuantity(productId) {

  const input = document.querySelector(
    `.js-quantity-input-${productId}`
  );

  const newQuantity = Number(input.value);

  if (
    newQuantity < 1 ||
    isNaN(newQuantity)
  ) {
    alert('Quantity must be at least 1');
    return;
  }

  updateCartQuantity(productId, newQuantity);

  const container = document.querySelector(
    `.js-cart-item-container-${productId}`
  );

  container.classList.remove(
    'is-editing-quantity'
  );

  container.querySelector(
    '.quantity-label'
  ).innerText = newQuantity;

  updateCheckoutCartQuantity();

}

document.querySelectorAll('.js-save-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {

      const { productId } = link.dataset;

      saveQuantity(productId);
    })
    
  })

document.querySelectorAll('.quantity-input')
  .forEach((input) => {

    input.addEventListener('keydown', (event) => {

      if (event.key === 'Enter') {

        const { productId } = input.dataset;

        saveQuantity(productId);
      }

    });

  });

