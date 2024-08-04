import React from 'react'
import './Payment.css'
import { Link } from 'react-router-dom'
import CashCard from '../CashCard'
import { useContext } from 'react'
import { OrderContext } from '../../providers/orderProvider'

function Payment() {
    const {total,deliveryCharge,discount} = useContext(OrderContext);
    return (
        <div>
            <p class="paymenthead">Payment Method</p>
            <div class="addressdisplay">
                <img src="img/home.png" alt="Error" class="home" />
                <span class="line">--------------------------------------</span>
                <img src="img/wallet.jpg" alt="Error" class="wallet" />
                <span class="line">--------------------------------------</span>
                <img src="img/notepad.jpg" alt="Error" class="notepad" />

            </div>
            <CashCard props={{total,deliveryCharge,discount}}/>
            <form action="" class="paymentform" />
            <h3>Select a payment method</h3>
            <div class="debit">
                <input type="radio" /><h4 > Debit/Credit card</h4>

            </div>
            <div class="cardno">
                <label for="number">Card Number</label>
                <div>
                    <input type="number" name="myname" id="number" />
                </div>

            </div>
            <div class="card">

                <label for="name">Card Name</label>
                <div>
                    <input type="text" name="myname" id="name" />
                </div>
            </div>
            <div class="expirydate_cvv">
                <div class="ex">
                    <label for="date">Expiry Date</label>
                    <div>
                        <input type="number" name="myname" id="date" />
                    </div>

                </div>
                <div class="cv">
                    <label for="cvv">CVV</label>
                    <div>
                        <input type="password" name="myname" id="cvv" />
                    </div>

                </div>

            </div>
            <button class="addcard"><span>Add Card</span></button>
            <div class="gpay">
                <input type="radio" /><h4 > Google Pay</h4>

            </div>
            <div class="paypal">
                <input type="radio" /><h4 > Paypal</h4>

            </div>
            <div class="cod">
                <input type="radio" /><h4 > Cash On Delivery</h4>

            </div>
            <button class="continue"><Link to='/summary'><span>Continue</span></Link></button>
        </div>

    )
}

export default Payment