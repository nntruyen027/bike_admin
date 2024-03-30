import React, { useEffect, useState, } from 'react';
import './UpdateDevice.css';
import { SaveButton, } from '~/components';
import PropTypes from 'prop-types';

const status = ['Sẵn sàng sử dụng', 'Đang sữa chữa', 'Đang sử dụng', 'Ngưng sử dụng',];

export default function Update({ id, onUpdate, }) {
  const [bikeTypes, setBikeTypes,] = useState([]);
  const [locations, setLocations,] = useState([]);
  const [selectedType, setSelectedType,] = useState('');
  const [selectedLocation, setSelectedLocation,] = useState('');
  const [selectedStatus, setSelectedStatus,] = useState(status[0]);

  useEffect(() => {
    getTypes();
    getLocations();
  }, []);

  const getTypes = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/bicycles/types/`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access'),
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBikeTypes(data?.data);
        setSelectedType(data?.data[0]?.id);
      })
      .catch((err) => console.log(err));
  };

  const getLocations = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/transactions/`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access'),
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLocations(data?.data);
        setSelectedLocation(data?.data[0].id);
      })
      .catch((err) => console.log(err));
  };

  const createDevice = () => {
    onUpdate(
      {
        id, selectedLocation, selectedType, selectedStatus,
      });
  };

  return (
    <div id={'Update-Bicycle'}>
      <div className={'body-container'}>
        <table>
          <tr>
            <td>
              <div>Loại xe</div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {bikeTypes.map((bikeType) => (
                  <option key={bikeType?.id} value={bikeType?.id}>
                    {bikeType?.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <div>Điểm giao dịch</div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map((location) => (
                  <option key={location?.id} value={location?.id}>
                    {location?.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <div>Trạng thái sử dụng</div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {status.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </td>
            <td></td>
          </tr>
        </table>

        <div className={'button-container'}>
          <SaveButton onClick={createDevice} />
        </div>
      </div>
    </div>
  );
}

Update.propTypes ={
  id: PropTypes.string,
  onUpdate: PropTypes.func,
};