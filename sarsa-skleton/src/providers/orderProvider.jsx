import React, { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxios";
export const OrderContext = createContext(null);

const OrderProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(50); //keeping fixed delivery charge for now
  const [discount, setDiscount] = useState(0);
  const axios = useAxiosPublic();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/users/get-cart");
        const cartData = response.data.data;

        // Calculate the total cart amount based on the product prices and quantities
        const calculatedTotal = cartData.reduce((acc, productItem) => {
          const itemTotal = productItem.sizes.reduce(
            (sum, sizeObj) => sum + sizeObj.quantity * productItem.product.price,
            0
          );
          return acc + itemTotal;
        }, 0);

        setTotal(calculatedTotal);

        // Calculate discount 
        //- now keeping as 10% of total purch amount
        const discountAmount = calculatedTotal * 0.10;
        setDiscount(discountAmount);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, [axios]);

  return (
    <OrderContext.Provider value={{ total, deliveryCharge, discount }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;

