import { cart } from "./data/cart-class.js";
import { orders } from "./data/orders.js";
import { getProduct, loadProductsFetch } from "./data/products.js";
import { renderHeader, updateHeader } from "./header.js";
import formatCurrency from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

console.log(orders);

async function loadPage() {
  try {
    renderHeader();

    await loadProductsFetch();

    renderOrders();
    console.log('orders page loaded');

    initOrdersListeners();
    console.log('listeners attached');
  }
  catch (error) {
    console.error('Error rendering page', error);
  }
}

function renderOrders() {
  let ordersHTML = '';

  orders.forEach((order) => {
    const orderId = order.id;
    const orderPrice = `$${formatCurrency(order.totalCostCents)}`;
    const orderTime = dayjs(order.orderTime).format("MMMM D");

    //to hold ONLY the products for THIS specific order
    let productsListHTML = '';

    order.products.forEach((product) => {
      const productId = product.productId;
      const matchingProduct = getProduct(productId);

      console.log(matchingProduct);

      productsListHTML += `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${dayjs(product.estimatedDeliveryTime).format("MMMM D")}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary
            js-buy-again-button" 
            data-product-id="${productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${orderId}&productId=${productId}">
            <button class="track-package-button button-secondary
              js-track-package-button"
              data-product-id="${productId}">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    ordersHTML += `
      <div class="order-container">   
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTime}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>${orderPrice}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderId}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsListHTML} 
        </div>
      </div>
    `;
  });

  const ordersGrid = document.querySelector(".js-order-grid");
  if (ordersGrid) {
    ordersGrid.innerHTML = ordersHTML;
  }

}

export function initOrdersListeners() {
  const ordersGrid = document.querySelector(".js-order-grid");

  if (ordersGrid) {
    ordersGrid.addEventListener("click", (event) => {
      // Use .closest to find the button even if the icon is clicked
      const buyAgainBtn = event.target.closest(".js-buy-again-button");

      if (buyAgainBtn) {
        const { productId } = buyAgainBtn.dataset;
        
        cart.addToCart(productId);
        updateHeader();

        // Update the button text
        buyAgainBtn.innerHTML = 'Added';
        
        setTimeout(() => {
          // Reset the button HTML after 1 second
          buyAgainBtn.innerHTML = `
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          `;
        }, 1000);
      }
    });
  }
}

loadPage();