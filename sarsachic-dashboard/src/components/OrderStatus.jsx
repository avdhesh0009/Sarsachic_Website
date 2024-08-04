import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';

const OrderStatus = ({ title, count }) => {
  return (
    <div className="bg-white text-center items-center justify-center border rounded-lg p-4 flex flex-col ">
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
};

export default OrderStatus;
