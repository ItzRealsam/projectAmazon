export let cart;

loadCartFromStorage();

export function loadCartFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [
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

export function getCartItem(productId) {

  return cart.find((cartItem) => {
    return cartItem.productId === productId;
  });

}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity = 1) {
  const matchingItem = getCartItem(productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  }
  else {
    cart.push(
      {
        productId,
        quantity,
        deliveryOptionId: '1'
      }
    );
  }

  saveCartToStorage();
}

export function removeFromCart(productId) {
  
  cart = cart.filter((cartItem) => {
    return cartItem.productId !== productId;
  });

  saveCartToStorage();
}

export function updateCartQuantity(
  productId,
  newQuantity
) {

  const cartItem = getCartItem(productId);

  cartItem.quantity = newQuantity;

  saveCartToStorage();

}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const cartItem = getCartItem(productId);

  cartItem.deliveryOptionId = deliveryOptionId;

  saveCartToStorage();
}