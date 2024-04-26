import React, { useEffect, useState, } from 'react';
import { Table, } from '~/components';
import './index.css';

export default function TopRevenueTable() {
  const [data, setData, ] = useState([]);
  const [start, setStart, ] = useState('');
  const [end, setEnd, ] = useState('');

  useEffect(() => {
    fetchData();
  }, [start, end,]);

  const fetchData = () => {
    const queryParams = new URLSearchParams({
      start: start,
      end: end,
    });

    fetch(`${process.env.REACT_APP_HOST_IP}/statistics/best-revenue/?${queryParams.toString()}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data.data.map(value => {
          return {
            type_name: value?.type_name,
            revenue: formatCurrency(value?.revenue),
            percentage: ((value?.revenue / data?.total_revenue)*100).toLocaleString(undefined, {
              maximumFractionDigits: 2, 
            }) + '%',
          };
        }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const formatCurrency = value => new Intl.NumberFormat('vi-VN', {
    style: 'currency', currency: 'VND', 
  }).format(value);

  console.log(data);

  return (
    <div id='top-revenue-table'>
      <h2>Top loại xe có doanh thu nhiều nhất</h2>
      <div className='input-container'>
        <label htmlFor='startDate'>Từ ngày:</label>
        <input type='date' id='startDate' value={start} onChange={(e) => setStart(e.target.value)} />
        <label htmlFor='endDate'>Đến ngày:</label>
        <input type='date' id='endDate' value={end} onChange={(e) => setEnd(e.target.value)} />
      </div>
      <Table data={data} columns={
        [
          {
            label: 'Tên loại xe',
            key: 'type_name',
          },
          {
            label: 'Tổng doanh thu',
            key: 'revenue',
          },
          {
            label: 'Tỷ lệ',
            key: 'percentage',
          },
        ]
      }/>
    </div>
  );
}