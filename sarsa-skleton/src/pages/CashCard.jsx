import React from 'react';
import './Cash_Card.css';

function CashCard({ total, deliveryCharge, discount }) {
  return (
    <div className="cashcard">
      <span className="subtotal">Subtotal</span>
      <span className="subtotal1">${total?.toFixed(2)}</span>
      <hr className="hl1" />
      <div className="discount-cart">
        <label htmlFor="coupon">Enter Discount Code</label>
        <div className="discountbox">
          <input type="text" name="coupon" id="coupon" />
          <button className="apply">Apply</button>
        </div>
      </div>
      <span className="del">Delivery Charge</span>
      <span className="del1">${deliveryCharge?.toFixed(2)}</span>
      <hr className="hl2" />
      <span className="grandt">Grand Total</span>
      <span className="grandt1">${(total + deliveryCharge - discount)?.toFixed(2)}</span>
    </div>
  );
}

export default CashCard;
