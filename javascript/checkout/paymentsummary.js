import { cart } from "../cart.js";
import { getproduct } from '../../javascript/products.js';
import { getdeliveryOption } from '../../javascript/delivery.js';

export function RenderPaymentSummary() {
    let productPrice = 0;
    let ShippingPrice = 0;

    cart.forEach((cartitem) => {
        const product = getproduct(cartitem.productId);
        productPrice += product.priceCents * cartitem.quantity;

        const deliveryOption = getdeliveryOption(cartitem.deliveryOptionId);
        ShippingPrice += deliveryOption.priceCents;
    })

    const totalBeforeTax = productPrice + ShippingPrice;

    const Tax = totalBeforeTax * 0.1;
    const totalAfterTax = totalBeforeTax + Tax;

    const paymentsummaryHTML =
        `
        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (3):</div>
          <div class="payment-summary-money">$${(Math.round(productPrice )/ 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${(Math.round(ShippingPrice) / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${(Math.round(totalBeforeTax )/ 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${(Math.round(Tax)/ 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${(Math.round(totalAfterTax )/ 100).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
    
    `

    document.querySelector('.payment-summary').innerHTML = paymentsummaryHTML;

};