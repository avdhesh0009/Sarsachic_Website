import React from "react";

const SidebarItem = ({ active, children }) => {
  return (
    <div
      className={`${
        active ? "bg-gray-800 text-white" : "hover:bg-gray-200"
      } ' px-4 py-2 my-2 rounded-md flex items-center cursor-pointer'`}
    >
      {children}
    </div>
  );
};

export default SidebarItem;
