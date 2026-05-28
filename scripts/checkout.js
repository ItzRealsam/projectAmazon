import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadCart, loadCartFetch } from "./data/cart-class.js";
import { loadProducts, loadProductsFetch } from "./data/products.js";
//import "./data/car.js"
//import './data/backend-practice.js'


async function loadPage() {
  try{
    //throw 'error1';

    await Promise.all([
      loadProductsFetch(),

      loadCartFetch()
    ])

    

    /*
    const value = await new Promise ((resolve, reject) => {
      //throw 'error2'
      loadCart(() => {
        //throw 'error3';
        //reject('error3')
        resolve('value3');
      });
    });

    console.log(value);

    */

  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }

  
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
