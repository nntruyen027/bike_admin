import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { SaveButton, } from '~/components';
import './index.css';

function UpdateInfo({ info, updateInfo, setShow, }) {
  const [fullName, setFullName,] = useState(info?.full_name);
  const [email, setEmail,] = useState(info?.email);
  const [phone, setPhone,] = useState(info?.phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateInfo({
      fullname: fullName, email: email, phone: phone,
    });
    setShow();
  };

  return (
    <form id={'form-container'}>
      <div>
        <label htmlFor='fullName'>Họ và tên:</label>
        <input
          type='text'
          id='fullName'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='phone'>Số điện thoại:</label>
        <input
          type='tel'
          id='phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div>
        <SaveButton onClick={handleSubmit}/>
      </div>
    </form>
  );
}

UpdateInfo.propTypes = {
  info: PropTypes.object,
  setShow: PropTypes.func,
  updateInfo: PropTypes.func,
};

export default UpdateInfo;
