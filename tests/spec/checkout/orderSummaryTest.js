import { initOrderSummaryListeners, renderOrderSummary } from "../../../scripts/checkout/orderSummary.js";
import { cart } from "../../../scripts/data/cart-class.js";
import { loadProductsFetch } from "../../../scripts/data/products.js";

describe('test suite: renderOrderSummary', () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done(); // Tells Jasmine it is safe to proceed to beforeEach hooks
    });
  });

  beforeEach(() => {
    document.querySelector('.js-test-container')
    .innerHTML = `
      <div class="js-checkout-header-cart-quantity"></div>
      <div class="js-order-summary"></div>
      <div class="js-payment-summary">
        <div class="js-payment-summary-shipping"></div>
        <div class="js-payment-summary-total"></div>
      </div>
    `;

    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 1,
          deliveryOptionId: '2'
        },
        {
          productId: productId2,
          quantity: 2,
          deliveryOptionId: '3'
        }
      ]);
    });
    
    cart.loadCartFromStorage();  
    renderOrderSummary();
    initOrderSummaryListeners();

  })

  afterEach(() => {
    document.querySelector('.js-test-container')
      .innerHTML = ``;
  })

  it('displays the cart', () => {

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 1');
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 2');
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual('Intermediate Size Basketball');
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toEqual('$10.90');
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual('$20.95');

  });

  it('removes an item', () => {

    document.querySelector(`.js-delete-quantity-link-${productId1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual('Intermediate Size Basketball');
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual('$20.95');

  });

  it('updates the delivery option', () => {

    document.querySelector(`.js-delivery-option-${productId1}-${'3'}`).click();

    expect(
      document.querySelector(`.js-delivery-option-input-${productId1}-${'3'}`).checked
    ).toEqual(true);

    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
    
    expect(
      document.querySelector('.js-payment-summary-shipping').innerText
    ).toEqual('$19.98');
    expect(
      document.querySelector('.js-payment-summary-total').innerText
    ).toEqual('$80.06');

  });
  
});