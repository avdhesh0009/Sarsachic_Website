import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import t1 from "../../images/t1.jpg";
import t2 from "../../images/t2.jpg";
import t3 from "../../images/t3.jpg";
import useAxiosPublic from "../../hooks/useAxios";
import { WebContext } from "../../providers/WebProvider";
import coupongenerator from "../../../../skleton-backend/src/utils/coupon.js";
import CashCard from "../CashCard.jsx";
import { OrderContext } from "../../providers/orderProvider.jsx";

function Cart() {
  const axios = useAxiosPublic();
  const [cart,setCart] = useState('');

  // const { user } = useContext(WebContext);

  const generateCoupon = () => {
    const newCoupon = coupongenerator();
    setCoupon(newCoupon);
  };
  const {total,deliveryCharge,discount} = useContext(OrderContext);
  console.log({total,deliveryCharge,discount});

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/users/get-cart");
        const cartData = response.data.data;
        console.log(cartData);
        setCart(cartData);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  },[]);
  return (
    <div>
      <p class="paymenthead">Checkout</p>
      <CashCard props={{total,deliveryCharge,discount}}/>
      <div class="summbox">
        {cart &&
          cart.map((productItem, index) => (
            <div className="tshirt1" key={index}>
              <div>productItem</div>
              <img
                src={productItem.product.images[0]}
                className="image-t1"
                alt={productItem.product.name}
              />
              <div className="t1des">
                <div className="box1-cart">
                  <span className="quant">-</span>
                  <span className="quant">{productItem.quantity}</span>
                  <span className="quant">+</span>
                </div>
                <p>{productItem.product.name}</p>
                {/* <p id="t1price">{productItem.product.price}</p> */}
                <p id="t1price2">${productItem.product.price}</p>
                <p>
                  <ul>
                    {productItem.sizes.map(sizeObj => (
                      <li key={sizeObj._id}>
                        Size: {sizeObj.size}, Quantity: {sizeObj.quantity}
                      </li>
                    ))}
                  </ul>
                </p>
              </div>
            </div>
          ))}
      </div>
      <button className="ship">
        <Link to="/shipping" className="ship-cart">
          Shipping
        </Link>
      </button>
    </div>
  );
}

export default Cart;
