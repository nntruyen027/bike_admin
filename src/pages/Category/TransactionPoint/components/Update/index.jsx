import './Create.css';
import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { SaveButton, } from '~/components';

export default function Create({ onCreate, }) {
  const [name, setName,] = useState('');
  const [address, setAddress,] = useState('');

  const handleSubmit = () => {
    if (!name || !address) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    onCreate({
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

Create.propTypes = {
  onCreate: PropTypes.func,
};
