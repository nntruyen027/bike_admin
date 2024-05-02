import './Filter.css';
import React, { useEffect, useState, } from 'react';
import PropTypes from 'prop-types';
import { CreateButton, } from '~/components';

export default function Filter({ setData, showCreateModal, }) {
  const filters = [
    'Tất cả', 10000,50000, 100000, 200000, 300000, 400000, 500000,
  ];
  
  const [minPrice, setMinPrice,] = useState('Tất cả');
  const [maxPrice, setMaxPrice,] = useState('Tất cả');

  useEffect(() => {
    let filter = {
      fromPrice: 'all', toPrice: 'all', 
    };
    if(minPrice != 'Tất cả') {
      filter.fromPrice = minPrice;
    }
    if(maxPrice != 'Tất cả') {
      filter.toPrice = maxPrice;
    }

    setData(filter);
  }, [maxPrice, minPrice, ]);

  const handleSelectMinPrice = (e) => {
    setMinPrice(e.target.value);
  };

  const handleSelectMaxPrice = (e) => {
    setMaxPrice(e.target.value);
  };

  return (
    <div id={'Device-Type-Filter'}>
      <CreateButton onClick={() => showCreateModal()}/>
      <span>Lọc từ</span>
      <select value={minPrice} onChange={handleSelectMinPrice}>
        {filters.map(value => <option key={value} value={value} label={value}/>)}
      </select>
      <span>Đến</span>
      <select value={maxPrice} onChange={handleSelectMaxPrice}>
        {filters.map(value => <option key={value} value={value} label={value}/>)}
      </select>
    </div>
  );
}

Filter.propTypes = {
  setData: PropTypes.func,
  showCreateModal: PropTypes.func,
};