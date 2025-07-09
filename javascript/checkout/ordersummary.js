import { cart, deletefromCart , updatedeloption} from '../../javascript/cart.js';
import { product , getproduct } from '../../javascript/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getdeliveryOption } from '../../javascript/delivery.js';
import { RenderPaymentSummary } from './paymentsummary.js';


export function renderOrdersummary(){

let cartsummaryHTML = '';

cart.forEach((cartitem) => {

  const productId = cartitem.productId;

  const matchingProduct = getproduct(productId);

  const deliveryOptionId = cartitem.deliveryOptionId;
  
  const deliveryOption = getdeliveryOption(deliveryOptionId);

  const today = dayjs();
  const deldate = (deliveryOption.deliveryDays);
  const deliveryDate = today.add(deldate, 'days');
  const deliveryString = deliveryDate.format('dddd, MMMM D');

  cartsummaryHTML +=
    `
    <div class="cart-item-container js-delete-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${deliveryString}
          </div>
          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                $${(Math.round(matchingProduct.priceCents) / 100).toFixed(2)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cartitem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete" data-product-id = "${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingProduct, cartitem)}
            </div>
          </div>
        </div>
    `
});

document.querySelector('.order-summary').innerHTML = cartsummaryHTML;

document.querySelectorAll('.js-delete')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      deletefromCart(productId);

      const container = document.querySelector(`.js-delete-${productId}`);

      container.remove();   //remove the product from cart.
    })
  });

function deliveryOptionsHTML(matchingProduct, cartitem) {

  let html = '';

  deliveryOptions.forEach((deliveryOptions) => {

    const today = dayjs();
    const deldate = (deliveryOptions.deliveryDays);
    const deliveryDate = today.add(deldate, 'days');
    const deliveryString = deliveryDate.format('dddd, MMMM D');

    const pricestring = deliveryOptions.priceCents === 0 ? 'FREE' : `$${Math.round(deliveryOptions.priceCents / 100).toFixed(2)} -`;

    const isChecked = deliveryOptions.id === cartitem.deliveryOptionId;

    html +=
      `
    <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" 
        data-delivery-option-id= "${deliveryOptions.id}">
      <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${deliveryString}
        </div>
        <div class="delivery-option-price">
          ${pricestring} Shipping
        </div>
      </div>
    </div>
    
    `
  });
  return html;

}

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click', () => {
    const {productId , deliveryOptionId} = element.dataset;
    updatedeloption(productId,deliveryOptionId);
    renderOrdersummary();
    RenderPaymentSummary();
  })
});

}

