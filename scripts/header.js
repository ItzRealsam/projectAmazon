import { cart } from "./data/cart-class.js";

export function updateHeader() {
  const homeCartQuantity = document.querySelector('.js-cart-quantity');

  if (homeCartQuantity) {
    homeCartQuantity.innerText = cart.calculateCartQuantity();
  }
}
