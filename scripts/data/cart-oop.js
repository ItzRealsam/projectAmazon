import { getDeliveryOption } from "./deliveryOptions.js";

function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadCartFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '2'
        },
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 2,
          deliveryOptionId: '3'
        }
      ];
    },

    getCartItem(productId) {
      return this.cartItems.find((cartItem) => {
        return cartItem.productId === productId;
      });
    },

    calculateCartQuantity() {
      let cartQuantity = 0;

      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });

      return cartQuantity;
    },

    saveCartToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId, quantity = 1) {
      const matchingItem = this.getCartItem(productId);

      if (matchingItem) {
        matchingItem.quantity += quantity;
      }
      else {
        this.cartItems.push(
          {
            productId,
            quantity,
            deliveryOptionId: '1'
          }
        );
      }

      this.saveCartToStorage();
    },

    removeFromCart(productId) {
      
      this.cartItems = this.cartItems.filter((cartItem) => {
        return cartItem.productId !== productId;
      });

      this.saveCartToStorage();
    },

    updateCartQuantity(
      productId,
      newQuantity
    ) {

      const cartItem = this.getCartItem(productId);

      if (!cartItem) return; 
      
      cartItem.quantity = newQuantity;

      this.saveCartToStorage();

    },

    updateDeliveryOption(productId, deliveryOptionId) {
      const cartItem = this.getCartItem(productId);
      const deliveryOption = getDeliveryOption(deliveryOptionId);

      if (!cartItem || !deliveryOption) {
        return
      }

      cartItem.deliveryOptionId = deliveryOptionId;

      this.saveCartToStorage();
    }

  };

  return cart;
}

const cart = Cart('cart-oop');

cart.loadCartFromStorage();





