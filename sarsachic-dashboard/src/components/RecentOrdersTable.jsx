import React from 'react';

const RecentOrdersTable = () => {
  // Sample data for illustration
  const orders = [
    { id: 1, invoiceNo: 'INV-001', orderTime: '2024-07-03 10:00 AM', customerEmail: 'customer@example.com', methodOfPayment: 'Credit Card', amount: '₹ 500', status: 'Pending' },
    { id: 2, invoiceNo: 'INV-002', orderTime: '2024-07-02 02:30 PM', customerEmail: 'anothercustomer@example.com', methodOfPayment: 'PayPal', amount: '₹ 300', status: 'Delivered' },
    // Add more sample data as needed
  ];

  return (
    <div className="bg-white border rounded-lg p-4">
      <p className="text-lg font-semibold mb-4">Recent Orders</p>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method of Payment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map(order => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">{order.invoiceNo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.orderTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.customerEmail}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.methodOfPayment}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
