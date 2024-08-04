import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const BestSellingProductsChart = () => {
  // Demo data for illustration
  const data = {
    labels: ['T-Shirt - 300', 'Oversize - 50', 'Children - 100', 'Men - 150', 'Women - 200'],
    datasets: [
      {
        label: 'Best Selling Products',
        data: [300, 50, 100, 150, 200],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 205, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  };

  return (
    <div className="bg-white border rounded-lg p-4 mb-8">
      <p className="text-lg font-semibold  mb-8 text-center">Best Selling Products</p>
      <div className="mb-4">
        <Doughnut
        style={{ width: '100%',  margin: 'auto' }}
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  boxWidth: 10,
                  fontStyle: 'bold',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BestSellingProductsChart;
