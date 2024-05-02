import React, { useEffect, useState, } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import { CreateButton, } from '~/components';

const status = ['Sẵn sàng sử dụng', 'Đang sữa chữa', 'Đang sử dụng', 'Ngưng sử dụng',];

export default function Filter({ setFilterData, onShowCreate, }) {
  const [bicycleTypes, setBicycleTypes,] = useState([]);
  const [selectedType, setSelectedType,] = useState('Tất cả');
  const [selectedStatus, setSelectedStatus,] = useState('Tất cả');
  const [locations, setLocations,] = useState([]);
  const [selectedLocation, setSelectedLocation,] = useState('Tất cả');

  useEffect(() => {
    getBicycleTypes();
    getLocations();
  }, []);

  useEffect(() => {
    let filter = {
      location: 'all', type: 'all', status: 'all',
    };

    if(selectedType !== 'Tất cả')
      filter.type = selectedType;

    if(selectedLocation !== 'Tất cả')
      filter.location = selectedLocation;

    if(selectedStatus !== 'Tất cả')
      filter.status = selectedStatus;

    setFilterData(filter);

  }, [selectedStatus, selectedLocation, selectedType,]);

  const getBicycleTypes = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/bicycles/types/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setBicycleTypes(data.data))
      .catch(error => alert(error));
  };

  const getLocations = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/transactions/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setLocations(data?.data))
      .catch(error => alert(error));
  };

  return (
    <div id={'Device-Filter'}>
      <CreateButton onClick={onShowCreate}/>

      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        <option key={'Tất cả'} value={'Tất cả'} label={'Tất cả'}/>
        {bicycleTypes?.map(value => <option key={value?.id} value={value?.id} label={value?.name}/>)}
      </select>
      <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
        <option key={'Tất cả'} value={'Tất cả'} label={'Tất cả'}/>
        {locations?.map(value => <option key={value?.id} value={value?.id} label={value?.name}/>)}
      </select>
      <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
        <option key={'Tất cả'} value={'Tất cả'} label={'Tất cả'}/>
        {status?.map(value => <option key={value} value={value} label={value}/>)}
      </select>
    </div>
  );
}

Filter.propTypes = {
  setFilterData: PropTypes.func,
  onShowCreate: PropTypes.func,
};