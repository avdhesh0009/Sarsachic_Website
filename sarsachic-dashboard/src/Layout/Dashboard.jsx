import React, { useEffect, useState } from 'react'
import DashSidebar from '../components/DashSidebar'
import AdminDashboard from '../pages/AdminDashboard'
import { useLocation } from 'react-router-dom';
import ManageUsers from '../pages/ManageUsers';
import AddProducts from '../pages/AddProducts';
import ManageProducts from '../pages/ManageProducts';
import AppCustomization from '../pages/AppCustomization';

const Dashboard = () => {

    const location = useLocation();
    const [tab, setTab] = useState();
  
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get("tab");
      if(tabFromUrl) {
        setTab(tabFromUrl);
      }
    }, [location.search]);


  return (
    <div className="min-h-screen flex flex-col md:flex-row ">
      {/* sidebar */}
      <div className="md:w-72 shadow  h-full md:h-screen p-6">
        <DashSidebar />
      </div>
    
        <div className='flex-1 h-screen overflow-y-scroll  p-6' >
        {tab === 'admin-dashboard' && <AdminDashboard />}
        {tab === 'manage-users' && <ManageUsers />}
        {tab === 'add-products' && <AddProducts />}
        {tab === 'manage-products' && <ManageProducts />}
        {tab === 'app-customization' && <AppCustomization />}


        </div>

    </div>
  )
}

export default Dashboard