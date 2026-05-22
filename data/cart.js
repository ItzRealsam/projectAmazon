export let cart = JSON.parse(localStorage.getItem('cart')) || [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 1,
    deliveryOptionId: '1'
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 5,
    deliveryOptionId: '3'
  }
];

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

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity) {
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
    )
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  
  cart = cart.filter((cartItem) => {
    return cartItem.productId !== productId;
  });

  saveToStorage();
}

export function updateCartQuantity(
  productId,
  newQuantity
) {

  const cartItem = getCartItem(productId);

  cartItem.quantity = newQuantity;

  saveToStorage();

}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const cartItem = getCartItem(productId);

  cartItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}