import React, { useEffect, useState, } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import { CreateButton, } from '~/components';

const statusOptions = ['Tất cả', 'Sắp diễn ra', 'Đang diễn ra', 'Đã diễn ra',];

const Filter = ({ setFilterData, onShowCreate, }) => {
  const [selectedStatus, setSelectedStatus,] = useState('Tất cả');

  useEffect(() => {
    if(selectedStatus === 'Tất cả')
      setFilterData('all');
    else if(selectedStatus === 'Sắp diễn ra')
      setFilterData('upcoming');
    else if(selectedStatus === 'Đang diễn ra')
      setFilterData('happening');
    else 
      setFilterData('past');
  }, [selectedStatus,]);

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
