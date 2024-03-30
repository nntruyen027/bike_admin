import './Filter.css';
import React, { useEffect, useState, } from 'react';
import PropTypes from 'prop-types';
import { CreateButton, } from '~/components';

export default function Filter({ data, setData, originData, showCreateModal, }) {
  const filters = [
    'Tất cả', 10000,50000, 100000, 200000, 300000, 400000, 500000,
  ];
  
  const [minPrice, setMinPrice,] = useState('Tất cả');
  const [maxPrice, setMaxPrice,] = useState('Tất cả');

  console.log(data);

  useEffect(() => {
    if(isNaN(minPrice) || isNaN(maxPrice)){
      setData(originData);
    }

    else {
      const filteredData = originData.filter(item => item?.price >= minPrice && item?.price <= maxPrice);
      setData(filteredData);
    }
  }, [minPrice, maxPrice,]);

  return (
    <div id={'Device-Type-Filter'}>
      <CreateButton onClick={() => showCreateModal()}/>
      <span>Lọc từ</span>
      <select value={minPrice} onChange={(e) => setMinPrice(e.target.value)}>
        {filters.map(value => <option key={value} value={value} label={value}/>)}
      </select>
      <span>Đến</span>
      <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
        {filters.map(value => <option key={value} value={value} label={value}/>)}
      </select>
    </div>
  );
}

Filter.propTypes = {
  data: PropTypes.array,
  originData: PropTypes.array,
  setData: PropTypes.func,
  showCreateModal: PropTypes.func,
};