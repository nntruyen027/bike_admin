import './AddStaff.css';
import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { SaveButton, } from '~/components';

export default function AddStaff({ onCreate, }) {
  const [username, setUsername,] = useState('');
  const [email, setEmail,] = useState( '');
  const [phone, setPhone,] = useState('');
  const [fullname, setFullname,] = useState('');
  const [gender, setGender,] = useState('Nam');

  return (
    <div id={'Add-Staff'}>
      <div className={'body-container'}>
        <table>
          <tr>
            <td>
              <div>Họ tên</div>
              <input
                type={'text'}
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </td>
            <td>
              <div>Tên tài khoản</div>
              <input
                type={'text'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <div>Giới tính</div>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option key={'Nam'} label={'Nam'} value={'Nam'} />
                <option key={'Nữ'} label={'Nữ'} value={'Nữ'} />
              </select>
            </td>
            <td>
              <div>Số điện thoại</div>
              <input
                type={'text'}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <div>Email</div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type={'text'}
                style={{
                  width: '90%',
                }}
              />
            </td>
          </tr>
        </table>

        <div className={'button-container'}>
          <SaveButton onClick={() => {
            onCreate({
              username, fullname, email, phone, gender,
            });
          }}/>
        </div>
      </div>
    </div>
  );
}

AddStaff.propTypes = {
  onCreate: PropTypes.func,
};