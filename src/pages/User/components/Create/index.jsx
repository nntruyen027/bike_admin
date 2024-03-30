import './AddStaff.css';
import React from 'react';
import PropTypes from 'prop-types';
import { CreateButton, ExitButton, } from '~/components';

export default function AddStaff({ setAddUser, }) {

  function handleClick() {
    setAddUser(false);
  }

  return (
    <div id={'Add-Staff'}>
      <div className={'image-container'}>
        <input type='file' id='image-input' accept='image/*' style={{
          display: 'none',
        }}/>
        <label htmlFor='image-input'>
          <img src={process.env.PUBLIC_URL + 'assets/images/category/image-input.png'}
            alt='Your Image'/>
        </label>
      </div>

      <div className={'body-container'}>
        <table>
          <tr>
            <td>
              <div>Họ tên</div>
              <input type={'text'}/>
            </td>
            <td>
              <div>Ngày sinh</div>
              <input type={'date'}/>
            </td>
          </tr>
          <tr>
            <td>
              <div>Giới tính</div>
              <input type={'text'}/>
            </td>
            <td>
              <div>Số điện thoại</div>
              <input type={'text'}/>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <div>Địa chỉ</div>
              <input type={'text'} style={{
                width: '90%',
              }}/>
            </td>
          </tr>
        </table>

        <div className={'button-container'}>
          <ExitButton onClick={handleClick}/>
          <CreateButton onClick={handleClick} />
        </div>

      </div>
    </div>

  );
}

AddStaff.propTypes = {
  setAddUser: PropTypes.func,
};