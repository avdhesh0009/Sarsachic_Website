import React,{ createContext,useEffect,useState } from "react";
import useAxiosPublic from "../hooks/useAxios";
export const OrderContext = createContext(null);

const OrderProvider = ({children}) => {
    const [total, setTotal] = useState(0);
    const [deliveryCharge,setDeliveryCharge] = useState(10);
    const [discount, setDiscount] = useState(0);
    const axios = useAxiosPublic();

    useEffect(() => {
        const fetchCart = async () => {
          try {
            const response = await axios.get("/users/get-cart");
            const cartData = response.data.data;
            const calculatedTotal = cartData.reduce(
              (acc, productItem) => acc + productItem.quantity * productItem.product.price,
              0
            );
            setTotal(calculatedTotal);
          } catch (error) {
            console.error("Error fetching cart data:", error);
          }
        };
        fetchCart();
        console.log(total);
      },[]);

      return(
        <OrderContext.Provider value={{total,deliveryCharge,discount}}>
            {children}
        </OrderContext.Provider>
      )
}

export default OrderProvider;