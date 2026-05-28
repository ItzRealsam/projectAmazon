export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {

  return orders.find((order) => {
    return order.id === orderId;
  });

}

export function getProductFromOrder(orderId, productId) {

  if (orders.length === 0) {
    return
  }
  else {
    const matchingOrder = getOrder(orderId);

    const productsInOrder = matchingOrder.products;

    const productFromOrder = productsInOrder.find((product) => {
      return product.productId === productId;
    });

    return productFromOrder;
    }
}