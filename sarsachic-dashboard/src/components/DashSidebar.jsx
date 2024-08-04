import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { FaTachometerAlt, FaUsers, FaPlus, FaBoxes, FaCog } from 'react-icons/fa';


const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div>
      <Link to="/dashboard?tab=admin-dashboard">
        <SidebarItem active={tab === "admin-dashboard" || false}>
        <FaTachometerAlt className="mr-2 text-xl " /> Dashboard
        </SidebarItem>
      </Link>
      <Link to="/dashboard?tab=manage-users">
        <SidebarItem active={tab === "manage-users" || false}>
        <FaUsers className="mr-2 text-xl " /> Manage Users
        </SidebarItem>
      </Link>
      <Link to="/dashboard?tab=add-products">
        <SidebarItem active={tab === "add-products" || false}>
        <FaPlus className="mr-2 text-xl " /> Add Products
        </SidebarItem>
      </Link>
       <Link to="/dashboard?tab=manage-products">
         <SidebarItem active={tab === "manage-products" || false}>
        <FaBoxes className="mr-2 text-xl " />   Manage Products
         </SidebarItem>
       </Link>
      <Link to="/dashboard?tab=app-customization">
        <SidebarItem active={tab === "app-customization" || false}>
        <FaCog className="mr-2 text-xl " /> App Customization
        </SidebarItem>
      </Link>
    </div>
  );
};

export default DashSidebar;
