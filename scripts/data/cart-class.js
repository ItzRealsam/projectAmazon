import { getDeliveryOption } from "./deliveryOptions.js";

class Cart {

  cartItems;
  localStorageKey;

  constructor (localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadCartFromStorage();
  };

  loadCartFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [
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
  };

  saveCartToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  };

  getCartItem(productId) {
    return this.cartItems.find((cartItem) => {
      return cartItem.productId === productId;
    });
  };

  calculateCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
  };

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
  };

  removeFromCart(productId) {
    
    this.cartItems = this.cartItems.filter((cartItem) => {
      return cartItem.productId !== productId;
    });

    this.saveCartToStorage();
  };

  updateCartQuantity(
    productId,
    newQuantity
  ) {

    const cartItem = this.getCartItem(productId);

    if (!cartItem) return; 
    
    cartItem.quantity = newQuantity;

    this.saveCartToStorage();

  };

  updateDeliveryOption(productId, deliveryOptionId) {
    const cartItem = this.getCartItem(productId);
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    if (!cartItem || !deliveryOption) {
      return
    }

    cartItem.deliveryOptionId = deliveryOptionId;

    this.saveCartToStorage();
  };

};


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

//cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');

console.log(cart);
console.log(businessCart);




