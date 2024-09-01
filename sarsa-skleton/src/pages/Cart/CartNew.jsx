import React, { useContext, useState } from 'react';
import './CartNew.css';
import toast from "react-hot-toast";
import img1 from '../../images/full-sweater.png';
import img2 from '../../images/white-shirt.png';
import { MdDelete } from "react-icons/md";
import CheckoutSteps from './CheckoutSteps';
import { OrderContext } from "../../providers/OrderProvider.jsx";
import CashCard from '../CashCard';
import ProductBar from '../../components/ProductBar/ProductBar.jsx';

const CartNew = () => {
 
  const [items, setItems] = useState([
    { id: 1, name: 'Never fear Oversized T-Shirt', size: 'MEDIUM', price: 699, quantity: 1, image: img1 },
    { id: 2, name: 'Never fear Oversized T-Shirt', size: 'MEDIUM', price: 699, quantity: 1, image: img2 },
    { id: 3, name: 'Never fear Oversized T-Shirt', size: 'MEDIUM', price: 699, quantity: 1, image: img2 },
    { id: 4, name: 'Never fear Oversized T-Shirt', size: 'MEDIUM', price: 699, quantity: 1, image: img2 },
  ]);

  // Handle increment quantity
  const handleIncrement = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    toast.success("Item Quantity Increased");
  };

  // Handle decrement quantity
  const handleDecrement = (id) => {
    setItems(items.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
    toast.error("Item Quantity Deccreased");
  };

  // Handle deleting an item
  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
    toast.error("Item Deleted");
  };

  const subTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 50;
  const totalPrice = subTotal + shipping;
  const discount=totalPrice*.10;
  const dicountedPrice=totalPrice-discount;

 


  return (
    <>
     <ProductBar/>
    <CheckoutSteps/>
   
      <div className="cart-container">
        <div className="cart-items">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>SIZE: {item.size}</p>
                <p>PRICE: {item.price}</p>
                <div className="quantity-control">
                  <button onClick={() => handleDecrement(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item.id)}>+</button>
                  <button className="delete-button" onClick={() => handleDelete(item.id)}><MdDelete /></button>
                </div>
              
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <p>SUB TOTAL: {subTotal}</p>
          <p>SHIPPING CHARGE: {shipping}</p> <hr />
          <p id='total'>TOTAL: {totalPrice}</p>
          <button className="checkout-button">CHECKOUT</button>
        </div>
        
      </div>
      
     
    </>
  );
};

export default CartNew;
