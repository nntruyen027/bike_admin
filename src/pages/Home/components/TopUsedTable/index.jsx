import React, { useEffect, useState, } from 'react';
import { Table, } from '~/components';
import './index.css';

export default function TopUsedTable() {
  const [data, setData, ] = useState([]);
  const [start, setStart, ] = useState('');
  const [end, setEnd, ] = useState('');

  useEffect(() => {
    fetchData();
  }, [start, end, ]);

  const fetchData = () => {
    const queryParams = new URLSearchParams({
      start: start,
      end: end,
    });
    fetch(`${process.env.REACT_APP_HOST_IP}/statistics/best-used/?${queryParams.toString()}`)
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
            total_usage: value?.total_usage,
            total_time_used: formatHoursMinutes(value?.total_time_used),
            percentage: ((value?.total_usage / data?.total_usage)*100).toLocaleString(undefined, {
              maximumFractionDigits: 2, 
            }) + '%',
          };
        }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const formatHoursMinutes = (decimalHours) => {
    // Tính số giờ và phút
    var hours = Math.floor(decimalHours);
    var minutes = Math.round((decimalHours - hours) * 60);

    // Định dạng chuỗi giờ và phút
    var formattedTime = hours + 'h ' + minutes + 'm';

    return formattedTime;
  };

  console.log(data);

  return (
    <div id='top-used-table'>
      <h2>Top loại xe được sử dụng nhiều nhất</h2>
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
            label: 'Tổng lượt sử dụng',
            key: 'total_usage',
          },
          {
            label: 'Tổng thời gian sử dụng',
            key: 'total_time_used',
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