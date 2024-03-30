import './DeviceList.css';
import React, { useLayoutEffect, useState, } from 'react';
import PropTypes from 'prop-types';
import DeviceDetail from '~/pages/Category/Device/DeviceDetail';

export default function DeviceType() {
  const [deviceList, setDeviceList,] = useState(null); // State để lưu trữ danh sách thiết bị

  useLayoutEffect(() => {
    fetch(process.env.REACT_APP_HOST_IP + '/bicycles/types/', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access'),
        'Accept': 'application/json', // Sử dụng 'application/json' thay vì '*/*'
      },
    })
      .then(res => res.json())
      .then(data => {
        // Sau khi nhận được dữ liệu từ API, cập nhật state để lưu trữ danh sách thiết bị
        setDeviceList(data.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div id={'Device-Type'}>
      {deviceList?.map((device) => <DeviceItem key={device.id} device={device}/>)}
    </div>
  );
}

function DeviceItem({ device, }) {
  const [imageError, setImageError, ] = useState(false);
  const [showDetail, setShowDetail,] =useState(false);

  function handleClick() {
    setShowDetail(true);
  }

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <span className={'Device-Item'} onClick={handleClick}>
      {/* eslint-disable-next-line react/prop-types */}
      {
        imageError ? <img src={process.env.PUBLIC_URL + '/assets/images/category/image-input.png'}
          alt={'Ảnh lỗi'}/> :
          <img src={(process.env.REACT_APP_HOST_IMAGE_IP + device.image)} alt={device.name}
            onError={handleImageError}/> }
      {/* eslint-disable-next-line react/prop-types */}
      <div className={'device-name'}>{device.name}</div>
      {/* eslint-disable-next-line react/prop-types */}
      <div className={'device-price'}>{device.price}</div>
      {showDetail && <DeviceDetail setDetail={setShowDetail} device_object={device}/>}
    </span>
  );
}

DeviceItem.propTypes = {
  setDetail: PropTypes.func,
  device: PropTypes.object,
};