import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SalesChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Sales in Rupees',
            data: [1000, 1200, 800, 1500, 900, 1300, 1100,800, 1500, 900, 1300, 1100],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          // {
          //   label: 'Product B',
          //   data: [800, 1100, 700, 1200, 1000, 900, 1300],
          //   backgroundColor: 'rgba(255, 99, 132, 0.6)',
          //   borderColor: 'rgba(255, 99, 132, 1)',
          //   borderWidth: 1,
          // },
        ],
      },
      options: {
        scales: {
          x: {
            stacked: true,
            grid: {
              display: true,
            },
          },
          y: {
            stacked: true,
            beginAtZero: true,
          },
        },
        responsive: true,
        maintainAspectRatio: true,
      },
    });

    // Cleanup function
    return () => {
      chartInstance.destroy();
    };
  }, []);

  return (
    <div className="bg-white border rounded-lg p-4 mb-8">
      <div className='flex justify-between mb-4'>

      <p className="text-lg font-semibold text-center">Sales Data</p>

      <p className='border px-4 rounded bg-blue-400 cursor-pointer text-white' >Export to CSV</p>
      </div>
      <div className="mb-4">
        <canvas ref={chartRef} style={{ width: '100%' }}></canvas>
      </div>
    </div>
  );
};

export default SalesChart;
