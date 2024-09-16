import React, { useState, useEffect } from 'react';
import './CartNew.css';
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import CheckoutSteps from './CheckoutSteps';
import ProductBar from '../../components/ProductBar/ProductBar.jsx';
import useAxiosPublic from '../../hooks/useAxios.jsx';
import emptyCartImage from '../../images/emptyCart.jpg'; 
import { useNavigate } from 'react-router-dom';

const CartNew = () => {
  const axios = useAxiosPublic();
  const [items, setItems] = useState([]);
  const navigate=useNavigate();

  // Fetch cart data on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/users/get-cart");
        const cartData = response.data.data;
        console.log("Initial cart data:", cartData); // Add this to check data
        setItems(cartData);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, []);

  // Products
  const goToShop=()=>{
    navigate("/");
  }

  // Handle quantity change
  const handleQuantityChange = async (productId, sizeId, change) => {
    const updatedCart = items.map((item) => {
      if (item.product._id === productId) {
        const updatedSizes = item.sizes.map((size) =>
          size._id === sizeId
            ? { ...size, quantity: Math.max(1, size.quantity + change) }
            : size
        );
        return { ...item, sizes: updatedSizes };
      }
      return item;
    });

    setItems(updatedCart);

    try {
      const updatedItem = updatedCart.find((item) => item.product._id === productId);
      const updatedSize = updatedItem.sizes.find((size) => size._id === sizeId);

      await axios.post(`/users/update-cart`, {
        productId,
        sizeId,
        quantity: updatedSize.quantity,
      });
      toast.success("Item Quantity Changed");
    } catch (error) {
      toast.error("Error updating quantity:");
      console.error("Error updating quantity:", error);
    }
  };

  // Handle deleting an item
  const handleDelete = async (productId) => {
    try {
      const response = await axios.post(`/users/remove-from-cart`, { productId });
      console.log("Remaining items after deletion:", response.data.data); // Add log to check
      setItems([...response.data.data]); // Ensure re-render
      toast.error("Item Deleted");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Some error occurred!");
    }
  };

  // Calculate subtotal, shipping, and total
  const subTotal = items.reduce((sum, item) => {
    const itemTotal = item.sizes.reduce((sizeSum, sizeObj) => {
      return sizeSum + item.product.price * sizeObj.quantity;
    }, 0);
    return sum + itemTotal;
  }, 0);

  const shipping = 50;
  const totalPrice = subTotal + shipping;
  const discount = totalPrice * 0.10;
  const discountedPrice = totalPrice - discount;

  return (
    <>
      <ProductBar />
      <CheckoutSteps />
      <div className="cart-container">
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart">
              <img src={emptyCartImage} alt="Empty Cart" className="empimg" onClick={goToShop} />
              <p>Your cart is empty.</p>
              
            </div>
            
          ) : (
            items.map((item) => (
              <div key={item.product._id} className="cart-item">
                <img
                  src={item.product.images && item.product.images.length > 0 ? item.product.images[0] : 'default-image-url'}
                  alt={item.product.name}
                />
                <div className="item-details">
                  <h3>{item.product.name}</h3>
                  <p>PRICE: {item.product.price}</p>

                  {item.sizes.map((sizeObj) => (
                    <div className="size-controls" key={`${item.product._id}-${sizeObj._id}`}>
                      <p>Size: {sizeObj.size}</p>
                      <div className="quantity-control">
                        <button
                          className="quant"
                          onClick={() => handleQuantityChange(item.product._id, sizeObj._id, -1)}
                        >
                          -
                        </button>
                        <span className="quant">{sizeObj.quantity}</span>
                        <button
                          className="quant"
                          onClick={() => handleQuantityChange(item.product._id, sizeObj._id, 1)}
                        >
                          +
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(item.product._id)}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-summary">
            <p>SUB TOTAL: {subTotal}</p>
            <p>SHIPPING CHARGE: {shipping}</p>
            <hr />
            <p id="total">TOTAL: {totalPrice}</p>
            <button className="checkout-button">CHECKOUT</button>
          </div>
        )}
      </div>
   
    </>
  );
};

export default CartNew;
