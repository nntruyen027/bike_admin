import React, { useState, useEffect, } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, } from 'recharts';

const WeekChart = () => {
  const [data, setData,] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/statistics/weeks/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div
      id={'week-chart'}
      style={{
        width: '100%',
        height: 300,
      }}
    >
      <h2>Thống kê số lượt sử dụng theo tuần</h2>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey='day_of_week' name='Lượt sử dụng'/>
          <YAxis label={{
            value: 'Lượt sử dụng', angle: -90,
          }}/>
          <CartesianGrid strokeDasharray='3 3'/>
          <Tooltip formatter={(value ) => ['Số lượt: ' + value,]}/>
          <Bar dataKey='count' fill='#8884d8'/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeekChart;
