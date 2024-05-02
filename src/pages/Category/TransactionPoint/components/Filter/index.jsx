import React, { useEffect, useState, } from 'react';
import PropTypes from 'prop-types';
import { locations, } from '~/constants'; //
import './Filter.css';
import { CreateButton, } from '~/components';

export default function Filter({ setData, showCreateModal, }) {
  const [district, setDistrict,] = useState('Tất cả');
  const [ward, setWard,] = useState('Tất cả');

  useEffect(() => {

    let filter = {
      district: 'all', ward: 'all',
    };

    if (district !== 'Tất cả') {
      filter.district = district;
    }

    if (ward !== 'Tất cả') {
      filter.ward = ward;
    }

    setData(filter);
  }, [ward, district,]);

  // Lấy danh sách quận/huyện từ dữ liệu mẫu
  const districts = locations.map(location => location.name);

  // Lấy danh sách xã/phường của quận/huyện được chọn
  const selectedDistrictData = locations.find(location => location.name === district);
  const wards = selectedDistrictData ? selectedDistrictData.wards.map(ward => ward.name) : [];

  return (
    <div id={'Location-Filter'}>
      <CreateButton onClick={showCreateModal} />

      <span>Quận/huyện</span>
      <select value={district} onChange={(e) => {
        const selectedDistrict = e.target.value;
        setDistrict(selectedDistrict);
        setWard('Tất cả');
      }}>
        {districts.map(value => <option key={value} value={value}>{value}</option>)}
      </select>
      <span>Xã/Phường/Thị trấn</span>
      <select value={ward} onChange={(e) => setWard(e.target.value)}>
        {wards.map(value => <option key={value} value={value}>{value}</option>)}
      </select>
    </div>
  );
}

Filter.propTypes = {
  setData: PropTypes.func,
  showCreateModal: PropTypes.func,
};
