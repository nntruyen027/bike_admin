import React, { useEffect, useState, } from 'react';
import Chart from 'chart.js/auto';

const RevenueComparisonChart = () => {
  const [revenueData, setRevenueData,] = useState({
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_HOST_IP}/statistics/months/`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setRevenueData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(revenueData).length === 0) return;

    const chartData = {
      labels: [],
      datasets: [
        {
          label: `Năm ${revenueData?.last_year[0]?.month?.substring(0, 4)}`,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          data: [],
        },
        {
          label: `Năm ${revenueData?.current_year[0]?.month?.substring(0, 4)}`,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: [],
        },
      ],
    };

    revenueData.current_year?.forEach(month => {
      chartData.labels.push(`Tháng ${month.month.substring(5, 7)}`);
      chartData.datasets[1].data.push(month.revenue);
    });

    revenueData.last_year?.forEach(month => {
      chartData.datasets[0].data.push(month.revenue);
    });

    const canvas = document.getElementById('revenueComparisonChart');
    const ctx = canvas.getContext('2d');

    // Kiểm tra nếu một thể hiện Chart đã tồn tại trên canvas
    if (canvas.chart) {
      canvas.chart.destroy(); // Hủy thể hiện Chart hiện tại
    }

    // Tạo một thể hiện Chart mới
    canvas.chart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        indexAxis: 'x',
        responsive: true,
        plugins: {
          title: {
            display: false,
          },
          legend: {
            position: 'top',
          },
        },
        scales: {
          y: {
            ticks: {
              callback: function (value) {
                return value.toLocaleString('vi-VN', {
                  style: 'currency', currency: 'VND', 
                });
              },
            },
          },
        },
      },
    });
  }, [revenueData,]);

  return (
    <div style={{
      marginTop: '60px', 
    }} id={'revenue-conparision-chart'}>
      <h2>So sánh doanh thu cùng kỳ</h2>
      <canvas id='revenueComparisonChart' />
    </div>
  );
};

export default RevenueComparisonChart;
