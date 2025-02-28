import React, { useContext, useState, useEffect } from 'react';
import './CartNew.css';
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import CheckoutSteps from './CheckoutSteps';
import ProductBar from '../../components/ProductBar/ProductBar.jsx';
import useAxiosPublic from '../../hooks/useAxios.jsx';
import emptyCartImage from '../../images/emptyCart.jpg'; 
import { useNavigate } from 'react-router-dom';
import { OrderContext } from "../../providers/OrderProvider.jsx";

const CartNew = () => {
  const axios = useAxiosPublic();
  const [items, setItems] = useState([]);
  const { total, deliveryCharge, discount } = useContext(OrderContext);
  const navigate = useNavigate();


    // Handle deleting an item
    const handleDelete = async (productId, sizeId) => {
      try {
        const response = await axios.post(`users/remove-from-cart`, { productId, sizeId });
        setItems(response.data.data);
        toast.error("Item Deleted");
      } catch (error) {
        toast.error("Some error occurred");
        console.log(error);
      }
    };
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
  }, [handleDelete]);

  

  // Products
  const goToShop = () => {
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
                          onClick={() => handleDelete(item.product._id, sizeObj._id)} // Ensure sizeId is passed
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


{/**  Avdhesh COde 
  
  
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
  
   // Handle deleting an item
   const handleDelete = async (productId,sizeId) => {
    try {
      const response = await axios.post(`users/remove-from-cart`, { productId,sizeId });
      setItems(response.data.data);
    } catch (error) {
      console.log(error);
    }
    toast.error("Item Deleted");
  };
  
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
  }, [handleDelete]);

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
            {item.sizes.map(sizeObj => (
              <div key={sizeObj._id} className="size-item">
                <img
                  src={(sizeObj.image || (item.product.images && item.product.images[0])) || '/path/to/default/image.jpg'} // Fallback to a default image if no images exist
                  alt={`${item.product.name} - ${sizeObj.size}`}
                />
                <div className="item-details">
                  <h3>{item.product.name}</h3>
                  <p>Size: {sizeObj.size}</p>
                  <p>Price: {sizeObj.price || item.product.price}</p> {/* Size-specific or default price 
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
                      onClick={() => handleDelete(item.product._id, sizeObj._id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
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

export default CartNew; */}