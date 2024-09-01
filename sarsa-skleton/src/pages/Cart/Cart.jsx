import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxios";
import { OrderContext } from "../../providers/OrderProvider.jsx";
import CashCard from "../CashCard.jsx";

function Cart() {
  const axios = useAxiosPublic();
  const [cart, setCart] = useState([]);
  const { total, deliveryCharge, discount } = useContext(OrderContext);

  // Fetch cart data on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/users/get-cart");
        const cartData = response.data.data;
        setCart(cartData);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, [axios]);

  // Handle quantity change (increment/decrement)
  const handleQuantityChange = async (productId, sizeId, change) => {
    const updatedCart = cart.map((item) => {
      if (item.product._id === productId) {
        // Update size quantity (if applicable)
        const updatedSizes = item.sizes.map((size) =>
          size._id === sizeId
            ? { ...size, quantity: size.quantity + change }
            : size
        );

        // Ensure the quantity doesn't drop below 1
        return {
          ...item,
          sizes: updatedSizes.map((size) => ({
            ...size,
            quantity: Math.max(1, size.quantity),
          })),
        };
      }
      return item;
    });
    setCart(updatedCart);

    // Optional: make an API call to update quantity on the server
    // await axios.put(`/users/update-cart`, { productId, sizeId, quantity });
  };

  return (
    <div className="cart-container">
      <p className="paymenthead">Checkout</p>

      {/* CashCard component for displaying total, deliveryCharge, discount */}
      <CashCard props={{ total, deliveryCharge, discount }} />

      <div className="summbox">
        {cart.length > 0 ? (
          cart.map((productItem, index) => (
            <div className="tshirt1" key={index}>
              <img
                src={productItem.product.images[0]} // Assumes product images array exists
                className="image-t1"
                alt={productItem.product.name}
              />
              <div className="t1des">
                <p className="product-name">{productItem.product.name}</p>
                <p className="price">${productItem.product.price.toFixed(2)}</p>

                {/* Size and quantity controls */}
                {productItem.sizes.map((sizeObj) => (
                  <div className="size-controls" key={sizeObj._id}>
                    <p>Size: {sizeObj.size}</p>
                    <div className="box1-cart">
                      <button
                        className="quant"
                        onClick={() =>
                          handleQuantityChange(
                            productItem.product._id,
                            sizeObj._id,
                            -1
                          )
                        }
                      >
                        -
                      </button>
                      <span className="quant">{sizeObj.quantity}</span>
                      <button
                        className="quant"
                        onClick={() =>
                          handleQuantityChange(
                            productItem.product._id,
                            sizeObj._id,
                            1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {/* Link to the shipping page */}
      <button className="ship">
        <Link to="/shipping" className="ship-cart">
          Shipping
        </Link>
      </button>
    </div>
  );
}

export default Cart;
