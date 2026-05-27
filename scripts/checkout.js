import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadCart } from "./data/cart-class.js";
import { loadProductsFetch } from "./data/products.js";
//import "./data/car.js"
//import './data/backend-practice.js'

async function loadPage() {
  await loadProductsFetch();

  const value = await new Promise ((resolve) => {
    loadCart(() => {
      resolve('value3');
    });
  });

  console.log(value);

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

/*
Promise.all([
  loadProductsFetch(),

  new Promise((resolve) => {
    loadCart(() => {
    resolve();
    });
  })

]).then((values) => {
  console.log(values);

  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
   resolve();
  });
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
}); */

/*
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
}); */
