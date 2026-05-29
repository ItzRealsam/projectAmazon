import { getOrder, getProductFromOrder } from "./data/orders.js";
import { getProduct, loadProductsFetch } from "./data/products.js";
import { renderHeader } from "./header.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

async function loadPage() {
  renderHeader();

  await loadProductsFetch();

  renderTracking();
  console.log('tracking page loaded');

}

loadPage();

function renderTracking() {

  const url = new URL(window.location.href);

  const orderId = url.searchParams.get('orderId');
  const matchingOrder = getOrder(orderId);

  const productId = url.searchParams.get('productId');
  const matchingProduct = getProduct(productId);

  const matchingItem = getProductFromOrder(orderId, productId);

  const currentTime = dayjs();
  const orderTime = dayjs(matchingOrder.orderTime);
  const deliveryTime = dayjs(matchingItem.estimatedDeliveryTime);
  
  const deliveredMessage = currentTime < deliveryTime ? 'Arriving on' : 'Delivered on';
  
  // 1. Calculate durations using the native .diff() method in milliseconds
  const totalDuration = deliveryTime.diff(orderTime); // Total delivery window
  const elapsedDuration = currentTime.diff(orderTime); // Time passed since order

  
  let progressCalculation = totalDuration === 0 
    ? 0 
    : (elapsedDuration / totalDuration) * 100;

  const percentProgress = Math.min(Math.max(progressCalculation, 0), 100);

  console.table({
    currentTime: currentTime.format('MMMM D'),
    orderTime: orderTime.format('MMMM D'),
    deliveryTime: deliveryTime.format('MMMM D'),
    percentProgress
  });

  
  let trackingHTML = `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        ${deliveredMessage} on  ${deliveryTime.format("dddd, MMMM D")}
      </div>

      <div class="product-info">
        ${matchingProduct.name}
      </div>

      <div class="product-info">
        Quantity: ${matchingItem.quantity}
      </div>

      <img class="product-image" src="${matchingProduct.image}">

      <div class="progress-labels-container">
        <div class="progress-label 
          ${percentProgress < 50 ? 'current-status' : ''} ">
          Preparing
        </div>
        <div class="progress-label 
          ${ (percentProgress >= 50 && percentProgress < 100)
            ? 'current-status' : '' }">
          Shipped
        </div>
        <div class="progress-label ${ percentProgress >= 100
          ? "current-status" : ''}">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar"
           style="width: ${percentProgress}%;"></div>
      </div>
    </div>
  `;

  const container = document.querySelector(".js-main");
  if (container) {
    container.innerHTML = trackingHTML;
  }
}
