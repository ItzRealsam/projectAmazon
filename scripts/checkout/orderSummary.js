import { calculateCartQuantity, cart, removeFromCart, updateCartQuantity, updateDeliveryOption } from '../data/cart.js';
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from '../data/deliveryOptions.js';
import { getProduct } from '../data/products.js';
import { renderPaymentSummary } from './paymentSummary.js';
import formatCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { updateCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingItem = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const deliveryDate = calculateDeliveryDate(deliveryOption);
    
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );

    cartSummaryHTML +=
    `
      <div class="cart-item-container
        js-cart-item-container
        js-cart-item-container-${matchingItem.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingItem.image}">

          <div class="cart-item-details">
            <div class="product-name
              js-product-name-${matchingItem.id}">
              ${matchingItem.name}
            </div>
            <div class="product-price
              js-product-price-${matchingItem.id}">
              $${formatCurrency(matchingItem.priceCents)}
            </div>
            <div class="product-quantity
              js-product-quantity-${matchingItem.id}">
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
              <input class="quantity-input js-quantity-input-${matchingItem.id}"
                data-product-id="${matchingItem.id}">
              <span class="save-quantity-link 
                js-save-quantity-link link-primary"
                data-product-id = "${matchingItem.id}">
                Save
              </span>
              <span class="delete-quantity-link 
                js-delete-quantity-link
                js-delete-quantity-link-${matchingItem.id}
                link-primary"
                data-product-id = "${matchingItem.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            
            ${deliveryOptionsHTML(matchingItem, cartItem)}

          </div>
        </div>
      </div>
    `;

  });

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;


  /* 
  //my former code May 23, 2026 - 1:39PM 
  document.querySelectorAll('.js-delete-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {

        const { productId } = link.dataset;

        removeFromCart(productId);

        renderOrderSummary();
        renderPaymentSummary();

      });
    });

  document.querySelectorAll('.js-update-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {

        const { productId } = link.dataset;

        const container =
          document.querySelector(
            `.js-cart-item-container-${productId}`
          );

        const quantityLabel =
          container.querySelector('.quantity-label');

        const input =
          container.querySelector('.quantity-input');

        input.value = quantityLabel.innerText;
        
        container.classList.add('is-editing-quantity');
      })
      
    })

  document.querySelectorAll('.js-save-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {

        const { productId } = link.dataset;

        saveQuantity(productId);
        renderPaymentSummary();
      })
      
    })

  document.querySelectorAll('.quantity-input')
    .forEach((input) => {

      input.addEventListener('keydown', (event) => {

        if (event.key === 'Enter') {

          const { productId } = input.dataset;

          saveQuantity(productId);
          renderPaymentSummary();
        }

      });

    });

  document.querySelectorAll('.js-delivery-option')
    .forEach( (deliveryOption) => {
      
      deliveryOption.addEventListener('click', () => {
        
        const { productId, deliveryOptionId } = deliveryOption.dataset;
        
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      })

    })
  
  
  updateCheckoutHeader();
  */

  //AI Improvements

  const orderSummaryContainer = document.querySelector('.js-order-summary');
  orderSummaryContainer.innerHTML = cartSummaryHTML;

  // 1. CAPTURE ALL CLICKS (Delete, Update, Save, and Delivery Options)
  orderSummaryContainer.addEventListener('click', (event) => {
    // Find the closest element matching our target class name
    const target = event.target;

    // Handle Delete Link
    if (target.classList.contains('js-delete-quantity-link')) {
      const { productId } = target.dataset;
      removeFromCart(productId);
      renderOrderSummary();
      renderPaymentSummary();
      return;
    }

    // Handle Update Link
    if (target.classList.contains('js-update-quantity-link')) {
      const { productId } = target.dataset;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      const quantityLabel = container.querySelector('.quantity-label');
      const input = container.querySelector('.quantity-input');

      input.value = quantityLabel.innerText;
      container.classList.add('is-editing-quantity');
      return;
    }

    // Handle Save Link
    if (target.classList.contains('js-save-quantity-link')) {
      const { productId } = target.dataset;
      saveQuantity(productId);
      renderPaymentSummary();
      return;
    }

    // Handle Delivery Option Row Click
    const deliveryOption = target.closest('.js-delivery-option');
    if (deliveryOption) {
      const { productId, deliveryOptionId } = deliveryOption.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    }
  });

  // 2. CAPTURE KEYDOWN EVENTS (Enter key on inputs)
  orderSummaryContainer.addEventListener('keydown', (event) => {
    const target = event.target;

    if (target.classList.contains('quantity-input') && event.key === 'Enter') {
      const { productId } = target.dataset;
      saveQuantity(productId);
      renderPaymentSummary();
    }
  });

  updateCheckoutHeader();

}

function deliveryOptionsHTML(matchingItem, cartItem) {
  let html = ``;

  deliveryOptions.forEach((deliveryOption) => {

    const deliveryDate = calculateDeliveryDate(deliveryOption);
    
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );
    const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option 
        js-delivery-option
        js-delivery-option-${matchingItem.id}-${deliveryOption.id}"
        data-product-id = "${matchingItem.id}"
        data-delivery-option-id = "${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input
            js-delivery-option-input-${matchingItem.id}-${deliveryOption.id}"
          name="delivery-option-${matchingItem.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `
  })

  return html
}

function saveQuantity(productId) {

  const input = document.querySelector(
    `.js-quantity-input-${productId}`
  );

  const newQuantity = Number(input.value);

  if (
    newQuantity < 1 ||
    isNaN(newQuantity) ||
    !Number.isInteger(newQuantity)
  ) {
    alert(
      'Quantity must be a whole number at least 1'
    );

    return;
  }

  const container = document.querySelector(`.js-cart-item-container-${productId}`);
  container.classList.remove('is-editing-quantity');
  
  updateCartQuantity(productId, newQuantity);
  renderOrderSummary();
}