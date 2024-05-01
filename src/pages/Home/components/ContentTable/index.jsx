import React, { useState, } from 'react';
import './index.css';

export default function ContentTable() {
  const [showAll, setShowAll,] = useState(false);

  const handleMouseOver = () => {
    setShowAll(true);
  };

  const handleMouseLeave = () => {
    setShowAll(false);
  };

  const allMenu = () => {
    if(showAll)
      return (<>
        
        <li><a href='#usage-chart'>Biểu đồ Thống kê tổng quan lượt sử dụng</a></li>
        <li><a href='#revenue-chart'>Biểu đồ Thống kê tổng quan doanh số</a></li>
        <li><a href='#week-chart'>Biểu đồ Thống kê lượt sử dụng theo tuần</a></li>
        <li><a href='#revenue-conparision-chart'>Biểu đồ So sánh doanh thu cùng kỳ</a></li>
        <li><a href='#top-used-table'>Top loại xe được sử dụng nhiều nhất</a></li>
        <li><a href='#top-revenue-table'>Top loại xe có doanh thu cao nhất</a></li>
      </>
      );
    else 
      return (
        <>
        </>
      );
  };

  return (
    <div id={'content-table'} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <h3>Mục lục</h3>
      {allMenu()}
    </div>
  );
}