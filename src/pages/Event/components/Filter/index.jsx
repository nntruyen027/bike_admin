import React, { useEffect, useState, } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import { CreateButton, } from '~/components';

const statusOptions = ['Tất cả', 'Sắp diễn ra', 'Đang diễn ra', 'Đã diễn ra',];

const Filter = ({ setFilterData, originData, onShowCreate, }) => {
  const [selectedStatus, setSelectedStatus,] = useState('Tất cả');

  useEffect(() => {
    if (selectedStatus === 'Tất cả') {
      setFilterData(originData);
    } else {
      const filteredData = originData.filter(event => {
        switch (selectedStatus) {
        case 'Sắp diễn ra':
          return new Date(event.begin_at) > new Date();
        case 'Đang diễn ra':
          return new Date(event.begin_at) <= new Date() && new Date(event.end_at) >= new Date();
        case 'Đã diễn ra':
          return new Date(event.end_at) < new Date();
        default:
          return false;
        }
      });
      setFilterData(filteredData);
    }
  }, [selectedStatus, originData, setFilterData,]);

  return (
    <div id='Event-Filter'>
      <CreateButton onClick={onShowCreate} />

      <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
        {statusOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

Filter.propTypes = {
  setFilterData: PropTypes.func,
  onShowCreate: PropTypes.func,
  originData: PropTypes.array,
};

export default Filter;
