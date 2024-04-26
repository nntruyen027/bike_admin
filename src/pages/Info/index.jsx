import React, { useEffect, useState, } from 'react';
import './index.css';
import { Modal, UpdateButton, } from '~/components';
import { UpdateAvatar, UpdateInfo, } from '~/pages/Info/components';

export default function Info() {
  const [info, setInfo,] = useState();
  const [showUpdateAvatar, setShowUpdateAvatar,] = useState(false);
  const [showUpdateInfo, setShowUpdateInfo,] = useState(false);

  useEffect(()=> {
    getInfo();
  }, []);

  const getInfo = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/info/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then(res => res.status === 200 ? res.json() : Promise.reject(res.json()))
      .then(data => setInfo(data.data))
      .catch(err => console.log(err));
  };

  const updateAvatar = ({ avatar, }) => {
    const form = new FormData();
    form.append('avatar', avatar);
    fetch(`${process.env.REACT_APP_HOST_IP}/user/?username=${info?.username}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
      body: form,
    })
      .then(() => getInfo())
      .then(() => setShowUpdateAvatar(!showUpdateAvatar));
  };

  const updateInfo = ({ fullname, email, phone, address, }) => {
    const form = new FormData();
    form.append('full_name', fullname);
    form.append('email', email);
    form.append('phone', phone);
    form.append('address', address);
    fetch(`${process.env.REACT_APP_HOST_IP}/user/?username=${info?.username}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
      body: form,
    })
      .then(() => getInfo())
      .then(() => setShowUpdateInfo(!showUpdateInfo));

  };
  
  return (
    <div id={'my-info'}>
      <div className={'avatar'} onClick={() => setShowUpdateAvatar(!showUpdateAvatar)}>
        <img src={`${process.env.REACT_APP_HOST_IMAGE_IP}${info?.avatar}`}
          onError={e =>
            e.target.src = `${process.env.PUBLIC_URL}/assets/images/default_avatar.jpg`}/>
      </div>
      <div className={'info'}>
        <div className={'fullname'}>{info?.full_name}</div>
        <div className={'email'}>{info?.email}</div>
        <div className={'phone'}>Số điện thoại: {info?.phone}</div>

        <UpdateButton onClick={() => setShowUpdateInfo(!showUpdateInfo)}/>
      </div>

      {showUpdateAvatar && (
        <Modal setShow={setShowUpdateAvatar} title={'Cập nhật avatar'}>
          <UpdateAvatar avatar={info?.avatar} updateAvatar={updateAvatar} setShow={() => setShowUpdateAvatar(!showUpdateAvatar)}/>
        </Modal>
      )}
      {showUpdateInfo && (
        <Modal title={'Chỉnh sửa thông tin'} setShow={setShowUpdateInfo}>
          <UpdateInfo info={info} setShow={() => setShowUpdateInfo(!showUpdateInfo)} updateInfo={updateInfo}/>
        </Modal>
      )}
    </div>
  );
}