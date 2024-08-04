import React from 'react'
import './Summary.css'
import CashCard from '../CashCard'
import { useContext } from 'react'
import { OrderContext } from '../../providers/orderProvider'

function Summary() {
    const {total,deliveryCharge,discount} = useContext(OrderContext);
    return (
        <div>
            <p class="paymenthead">Review Your Order</p>
            <div class="addressdisplay">
                <img src="img/home.png" alt="Error" class="home" />
                <span class="line">--------------------------------------</span>
                <img src="img/wallet.jpg" alt="Error" class="wallet" />
                <span class="line">--------------------------------------</span>
                <img src="img/notepad.jpg" alt="Error" class="notepad" />

            </div>
            <CashCard props={{total,deliveryCharge,discount}}/>
            <div class="summbox">
                <span>Estimated Delivery: 17 July 2024</span>
                <div class="tshirt1">
                    <img src="img/tshirt1.png" alt="" />
                    <div class="t1des">
                        <p>Black T-shirt</p>
                        <p>$20.00</p>
                        <p>Size:M</p>
                    </div>

                </div>
                <div class="tshirt2">
                    <img src="img/tshirt2.png" alt="" />
                    <div class="t2des">
                        <p>White T-shirt</p>
                        <p>$20.00</p>
                        <p>Size:M</p>
                    </div>
                </div>
                <div class="tshirt3">
                    <img src="img/tshirt3.jpg" alt="" />
                    <div class="t3des">
                        <p>White T-shirt</p>
                        <p>$20.00</p>
                        <p>Size:M</p>
                    </div>
                </div>
                <div class="shippingadd">
                    <h3>Shipping Address</h3>
                    <img src="img/edit.jpg" alt="" class="edit1" />
                    <p>Robert Fox</p>
                    <p>415 Washington Ave, Manchester Kentucky 39495</p>ff
                    <h3>Payment Method</h3>
                    <img src="img/edit.jpg" alt="" class="edit2" />
                    <p>Debit Card(... ... ... 849)</p>
                </div>

            </div>
        </div>
    )
}

export default Summary