import React from 'react'
import '../pages/Cart/Shipping.css'

function CashCard(props) {
  const { total, deliveryCharge, discount } = props.props;
  return (
    <div class="cashcard">
        <span class="subtotal">Subtotal</span>
        <span class="subtotal1">{total}</span>
        <hr class="hl1" />
        <div class="discount-cart">
            <label for="coupon">Enter Discount Code</label>

            <div class="discountbox">
            <input type="text" name="myname" id="coupon" />
            </div>
            <button className="apply">Apply</button>
        </div>
        <span class="del">Delivery Charge</span>
        <span className="del1">{`$ ${deliveryCharge}`} </span>
        <hr class="hl2" />
        <span class="grandt">Grand Total</span>
        <span class="grandt1">{total + deliveryCharge - discount}</span>
    </div> 
  )
}

export default CashCard