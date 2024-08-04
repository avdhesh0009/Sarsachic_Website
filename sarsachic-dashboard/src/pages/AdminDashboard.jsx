import React from 'react'
import Card from '../components/Card';
import OrderStatus from '../components/OrderStatus';
import SalesChart from '../components/SalesChart';
import BestSellingProducts from '../components/BestSellingProducts';
import RecentOrdersTable from '../components/RecentOrdersTable';


const cardData = [
  {
    icon: "FiCalendar",
    label: "Today's Orders",
    value: 25,
    sales: 1000,
    backgroundColor: "bg-orange-500",
  },
  {
    icon: "FiCalendar",
    label: "This Week's Orders",
    value: 150,
    sales: 5000,
    backgroundColor: "bg-green-500",
  },
  {
    icon: "FiCalendar",
    label: "This Month's Orders",
    value: 600,
    sales: 20000,
    backgroundColor: "bg-blue-500",
  },
  {
    icon: "FiCalendar",
    label: "All Time Orders",
    value: 2500,
    sales: 100000,
    backgroundColor: "bg-purple-500",
  },
]

const AdminDashboard = () => {
  return (
    <div className=" mx-auto p-4">


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cardData.map((card, index) => (
          <Card key={index} backgroundColor={card.backgroundColor} sales={card.sales} icon={card.icon} label={card.label} value={card.value} />
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <OrderStatus title="Orders Pending" count={200} />
        <OrderStatus title="Orders In Process" count={300} />
        <OrderStatus title="Delivered Products" count={2000} />
      </div>

      {/* Charts Section */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <SalesChart />
        <BestSellingProducts />
      </div>

    

      {/* Bottom Section */}
      <RecentOrdersTable />

    </div>
  );
};

export default AdminDashboard