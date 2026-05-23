import { calculateCartQuantity } from "../data/cart.js";

const checkoutCartQuantity = document.querySelector('.js-checkout-header-cart-quantity');
checkoutCartQuantity.innerText = '';

export function updateCheckoutHeader() {
  checkoutCartQuantity.innerText = `${calculateCartQuantity()} items`;
}