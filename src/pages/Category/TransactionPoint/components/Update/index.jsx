import './Create.css';
import React, { useEffect, useState, } from 'react';
import PropTypes from 'prop-types';
import { SaveButton, } from '~/components';

export default function Update({ onUpdate, id, }) {
  const [name, setName,] = useState('');
  const [address, setAddress,] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST_IP}/transactions/${id}/`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access'),
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.data.name);
        setAddress(data.data.address);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const handleSubmit = () => {
    if (!name || !address) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    onUpdate({
      id,
      name,
      address,
    });

    setName('');
    setAddress('');
  };

  return (
    <div className='simple-form'>
      <div className='info-input'>
        <label>
          Tên:
          <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
        </label>
        <label>
          Địa chỉ:
          <input type='text' value={address} onChange={(e) => setAddress(e.target.value)}/>
        </label>
      </div>
      <SaveButton onClick={handleSubmit}/>
    </div>
  );
}

Update.propTypes = {
  onUpdate: PropTypes.func,
  id: PropTypes.string,
};
