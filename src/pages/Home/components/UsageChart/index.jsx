import React, { useState, useEffect, } from 'react';
import './index.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';

const UsageChart = () => {
  const [usageData, setUsageData,] = useState([]);
  const [startDate, setStartDate,] = useState('');
  const [endDate, setEndDate,] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const twelveMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 11, 1);
    const formattedStartDate = twelveMonthsAgo.toISOString().slice(0, 10);
    const formattedEndDate = currentDate.toISOString().slice(0, 10);

    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);

    fetchData(formattedStartDate, formattedEndDate);
  }, []);

  const fetchData = (start, end) => {
    const queryParams = new URLSearchParams({
      start_date: start,
      end_date: end,
    });

    fetch(`${process.env.REACT_APP_HOST_IP}/statistics/usage-statistics/?${queryParams.toString()}`)
      .then(res => {
        if (res.status === 200) return res.json();
        else return Promise.reject(res.json());
      })
      .then(data => {
        if (data.data.length === 0) {
          const defaultData = getDefaultData(start, end);
          setUsageData(defaultData);
        } else {
          setUsageData(data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const getDefaultData = (start, end) => {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const dateDiff = (endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24);
    const defaultData = [];

    for (let i = 0; i <= dateDiff; i+=30) {
      const date = new Date(startDateObj);
      date.setDate(startDateObj.getDate() + i);
      const formattedDate = date.toISOString().slice(0, 10);
      defaultData.push({
        period: formattedDate,
        count: 0,
      });
    }

    return defaultData;
  };

  return (
    <div id='usage-chart'>
      <h2>Thống kê số lượt sử dụng</h2>
      <div className='input-container'>
        <label htmlFor='startDate'>Từ ngày:</label>
        <input type='date' id='startDate' value={startDate} onChange={e => setStartDate(e.target.value)} />
        <label htmlFor='endDate'>Đến ngày:</label>
        <input type='date' id='endDate' value={endDate} onChange={e => setEndDate(e.target.value)} />
      </div>
      <div className='chart-container'>
        <ResponsiveContainer>
          <LineChart data={usageData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='period' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='count' stroke='#8884d8' />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageChart;
