import React from "react";
import "./Summary.css";

import img1 from '../../images/full-sweater.png';
import img2 from '../../images/white-shirt.png';

const OrderReview = () => {
  // Hardcoded order data
  const order = {
    id: "12345",
    date: "2024-09-01T10:00:00Z",
    items: [
      {
        name: "Never fear Oversized T-Shirt",
        size: "MEDIUM",
        quantity: 2,
        price: 699,
        image: img1
      },
      {
        name: "White Shirt",
        size: "SMALL",
        quantity: 1,
        price: 499,
        image: img2
      }
    ],
    payment: {
      subTotal: 1897,
      shippingCharge: 50,
      discount: 189.7,
      total: 1757.3,
      paymentType:"GooglePay",
    }
  };

  return (
    <div className="order-review-container">
      <h1>Order Review</h1>

      <div className="order-details">
        <h2>Order Details</h2>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
        <h3>Items</h3>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>
              <img src={item.image} alt={item.name} className="order-item-image" />
              <p><strong>Product:</strong> {item.name}</p>
              <p><strong>Size:</strong> {item.size}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="payment-details">
        <h2>Payment Details</h2>
        <p><strong>Subtotal:</strong> ${order.payment.subTotal.toFixed(2)}</p>
        <p><strong>Shipping Charge:</strong> ${order.payment.shippingCharge.toFixed(2)}</p>
        <p><strong>Discount:</strong> ${order.payment.discount.toFixed(2)}</p>
        <p><strong>Total:</strong> ${order.payment.total.toFixed(2)}</p>
        <p><strong>Payment Method:</strong> {order.payment.paymentType}</p>
      </div>

      <div className="order-actions">
        <button className="button">Back to Orders</button>
        <button className="button">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default OrderReview;
