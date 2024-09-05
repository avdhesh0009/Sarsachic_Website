import React, { useContext, useState, useEffect } from 'react';
import './CartNew.css';
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import CheckoutSteps from './CheckoutSteps';
import ProductBar from '../../components/ProductBar/ProductBar.jsx';
import useAxiosPublic from '../../hooks/useAxios.jsx';
import { OrderContext } from "../../providers/OrderProvider.jsx";
//   // const [items, setItems] = useState([
//   //   { id: 1, name: 'Never fear Oversized T-Shirt', size: 'MEDIUM', price: 699, quantity: 1, image: img1 },
//   //   { id: 2, name: 'Never fear Oversized T-Shirt', size: 'MEDIUM', price: 699, quantity: 1, image: img2 },
//   //   { id: 3, name: 'Never fear Oversized T-Shirt', size: 'MEDIUM', price: 699, quantity: 1, image: img2 },
//   //   { id: 4, name: 'Never fear Oversized T-Shirt', size: 'MEDIUM', price: 699, quantity: 1, image: img2 },
//   // ]);
const CartNew = () => {

  const axios = useAxiosPublic();
  const [items, setItems] = useState([]);
  const { total, deliveryCharge, discount } = useContext(OrderContext);

  // Fetch cart data on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/users/get-cart");
        const cartData = response.data.data;
        console.log(cartData);
        setItems(cartData);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, [axios]);

  // Handle increment quantity
  const handleIncrement = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    toast.success("Item Quantity Increased");
  };

  // Handle decrement quantity
  const handleDecrement = (id) => {
    setItems(items.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
    toast.error("Item Quantity Decreased");
  };

  // Handle deleting an item
  const handleDelete = async (productId) => {
    try {
      const response = await axios.post(`users/remove-from-cart`, { productId });
      setItems(response.data.data);
    } catch (error) {
      console.log(error);
    }
    toast.error("Item Deleted");
  };

  const handleQuantityChange = async (productId, sizeId, change) => {
    const updatedCart = items.map((item) => {
      if (item.product._id === productId) {
        const updatedSizes = item.sizes.map((size) =>
          size._id === sizeId ? { ...size, quantity: Math.max(1, size.quantity + change) } : size
        );
        return { ...item, sizes: updatedSizes };
      }
      return item;
    });

    setItems(updatedCart);

    try {
      const updatedItem = updatedCart.find(item => item.product._id === productId);
      const updatedSize = updatedItem.sizes.find(size => size._id === sizeId);

      await axios.post(`/users/update-cart`, {
        productId,
        sizeId,
        quantity: updatedSize.quantity,
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const subTotal = items.reduce((sum, item) => {
    const itemTotal = item.sizes.reduce((acc, sizeObj) => acc + item.product.price * sizeObj.quantity, 0);
    return sum + itemTotal;
  }, 0);

  const shipping = 50;  // Assuming shipping is static
  const totalPrice = (subTotal + shipping).toFixed(2);
  const discountAmount = (totalPrice * 0.10).toFixed(2);
  const discountedPrice = (totalPrice - discountAmount).toFixed(2);

  return (
    <>
      <ProductBar />
      <CheckoutSteps />

      <div className="cart-container">
        <div className="cart-items">
          {items.map(item => (
            <div key={item.product._id} className="cart-item">
              <img src={item.product.images[0]} alt={item.product.name} />
              <div className="item-details">
                <h3>{item.product.name}</h3>
                <p>PRICE: {item.product.price}</p>
                {item.sizes.map((sizeObj) => (
                  <div className="size-controls" key={sizeObj._id}>
                    <p>Size: {sizeObj.size}</p>
                    <div className="box1-cart">
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
                      <button className="delete-button" onClick={() => handleDelete(item.product._id)}><MdDelete /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <p>SUB TOTAL: {subTotal}</p>
          <p>SHIPPING CHARGE: {shipping}</p>
          <p>DISCOUNT: {discountAmount}</p>
          <hr />
          <p id='total'>TOTAL: {discountedPrice}</p>
          <button className="checkout-button">CHECKOUT</button>
        </div>
      </div>
    </>
  );
};

export default CartNew;


 
