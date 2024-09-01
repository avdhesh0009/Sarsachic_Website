import React, { useState } from 'react';
import './Payment.css';
import { Link } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';

function Payment() {
    const [selectedPayment, setSelectedPayment] = useState("");
    const [showDebitCardForm, setShowDebitCardForm] = useState(false);

    const handleChange = (e) => {
      const value = e.target.value;
      setSelectedPayment(value);
      setShowDebitCardForm(value === 'debit-card');
    };

    return (
        <div>
            <CheckoutSteps />
            <div className="payment-method">
                <h2>Select Payment Method</h2>
                <div className="payment-options">
                    <label>
                        Debit Card
                        <input
                            type="radio"
                            value="debit-card"
                            checked={selectedPayment === 'debit-card'}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Google Pay
                        <input
                            type="radio"
                            value="gpay"
                            checked={selectedPayment === 'gpay'}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        PayPal
                        <input
                            type="radio"
                            value="paypal"
                            checked={selectedPayment === 'paypal'}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Cash on Delivery
                        <input
                            type="radio"
                            value="cash-on-delivery"
                            checked={selectedPayment === 'cash-on-delivery'}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                {showDebitCardForm && (
                    <div className="debit-card-form">
                        <h2>Enter Debit Card Details</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="card-number">Card Number</label>
                                <input type="text" id="card-number" placeholder="1234 5678 9012 3456" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="expiry-date">Expiry Date</label>
                                <input type="text" id="expiry-date" placeholder="MM/YY" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cvv">CVV</label>
                                <input type="text" id="cvv" placeholder="123" required />
                            </div>
                        </form>
                    </div>
                )}
                <div className="selected-payment">
                    <p>Selected Payment Method: {selectedPayment.replace(/-/g, ' ').toUpperCase()}</p>
                </div>
                <button className="continuebt">
                    <Link to='/summary'><span>Continue</span></Link>
                </button>
            </div>
        </div>
    );
}

export default Payment;
