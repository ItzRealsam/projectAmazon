import { calculateCartQuantity } from "../data/cart.js";

export function updateCheckoutHeader() {
  const checkoutCartQuantity = document.querySelector('.js-checkout-header-cart-quantity');
  //checkoutCartQuantity.innerText = '';

  // Guard clause protects your test environment from crashing
  if (!checkoutCartQuantity) return;

  checkoutCartQuantity.innerText = `${calculateCartQuantity()} items`;
}