import React from "react";
import { FiCalendar, FiShoppingBag } from "react-icons/fi";

const Card = ({ icon,backgroundColor, label, value, sales }) => {
  let Icon;
  if (icon === "FiCalendar") {
    Icon = FiCalendar;
  } else if (icon === "FiShoppingBag") {
    Icon = FiShoppingBag;
  } else {
    Icon = FiCalendar;
  }
  return (
    <div className={` ${backgroundColor} text-white border shadow rounded-lg p-6 flex flex-col  justify-between`}>
      {/* <Icon className="text-4xl m-2 " /> */}
      <span className="text-lg mb-2 font-semibold">{label}</span>
      <div className="text-3xl font-semibold">{value}</div>
      <span className="mt-4" >The Sales Amount is {sales}</span>
    </div>
  );
};

export default Card;
