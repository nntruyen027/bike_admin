import './DeviceList.css';
import PropTypes from 'prop-types';

import React, { useState, useEffect, } from 'react';
import { Create, Detail, Filter, } from './components';
import Modal from '~/components/Modal';
import { Loading, Pagination, } from '~/components';

export default function DeviceType() {
  const [deviceList, setDeviceList,] = useState([]);
  const [showCreate, setShowCreate,] = useState(false);
  const [currentPage, setCurrentPage,] = useState(1);
  const [totalPage, setTotalPage,] = useState(0);
  const [loading ,setLoading,] = useState(true);
  const [priceFrom, setPriceFrom,] = useState('all');
  const [priceTo, setPriceTo,] = useState('all');

  useEffect(() => {
    fetchDeviceList();
  }, [currentPage, priceFrom, priceTo,]);

  const fetchDeviceList = () => {
    setLoading(true);
    fetch(process.env.REACT_APP_HOST_IP + `/bicycles/types/?page=${currentPage}&price_from=${priceFrom}&price_to=${priceTo}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access'),
        'Accept': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setDeviceList(data.data);
        setTotalPage(data?.meta?.total_pages);
        setLoading(false);
      })
      .catch(error => console.log(error));
  };

  const setFilterDevice = ({ fromPrice, toPrice, }) => {
    if(fromPrice)
      setPriceFrom(fromPrice);
    if(toPrice)
      setPriceTo(toPrice);
  };

  const handleDeleteDevice = (deletedDeviceId) => {
    // Gọi API để xóa thiết bị
    fetch(process.env.REACT_APP_HOST_IP + `/bicycles/types/${deletedDeviceId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access'),
        'Accept': 'application/json',
      },
    })
      .then(res => {
        if (res.ok) {
          // Nếu xóa thành công, gọi lại API để cập nhật danh sách thiết bị
          fetchDeviceList();
        }
      })
      .catch(error => console.log(error));
  };

  const handleCreateType = ({ image, name, description, price, }) => {
    const form = new FormData();

    if(name)
      form.append('name', name);
    if(description)
      form.append('description', description);
    if(image)
      form.append('image', image);
    if(price)
      form.append('price', price);

    console.log(price, image);

    fetch(`${process.env.REACT_APP_HOST_IP + '/bicycles/types/'}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access'),
        Accept: 'application/json',
      },
      body: form,
    })
      .then((res) => {
        if(res.status === 201) {
          alert('Đã tạo loại xe thành công');
          fetchDeviceList();
        }
        else {
          res.json().then((data) => alert(data));
        }

      })
      .catch((error) => alert(error));
  };

  const handleEditDevice = (id, name, price, description, image, newImage) => {
    const form = new FormData();
    form.append('name', name);
    if(newImage)
      form.append('image', newImage);
    form.append('description', description);
    form.append('price', price);

    fetch(process.env.REACT_APP_HOST_IP + '/bicycles/types/' + id + '/', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access'),
        'Accept': 'application/json',
      },
      body: form,
    })
      .then(res => {
        if (res.ok) {
          fetchDeviceList();
        }
      })
      .catch(error => console.log(error));
  };

  function showCreateModal() {
    setShowCreate(!showCreate);
  }

  return (
    <div id={'Device-Type'}>
      {loading && <Loading/> }
      <Filter showCreateModal={showCreateModal} setData={setFilterDevice}/>
      {deviceList?.map(device => (
        <DeviceItem key={device.id} device={device} onDelete={handleDeleteDevice} onUpdate={handleEditDevice}/>
      ))}
      {showCreate && <Modal title={'Thêm loại xe'} setShow={showCreateModal}><Create onCreate={handleCreateType}/></Modal>}
      <Pagination currentPage={currentPage} onPageChange={setCurrentPage} totalPage={totalPage}/>
    </div>
  );
}

function DeviceItem({ device, onDelete, onUpdate, }) {
  const [showDetailModal, setShowDetailModal,] = useState(false);

  const setShow = () => {
    setShowDetailModal(!showDetailModal);
  };

  return (
    <>
      <span className={'Device-Item'} onClick={() => setShow()}>
        <img src={(process.env.REACT_APP_HOST_IMAGE_IP + device.image)} alt={device.name} />
        <div className={'device-name'}>{device.name}</div>
        <div className={'device-price'}>{device?.price}</div>
      </span>
      {showDetailModal
        && <Modal title={'Chi tiết loại xe'} setShow={setShow}>
          <Detail id={device.id} onDelete={onDelete} onUpdate={onUpdate}/>
        </Modal>
      }
    </>
  );
}

DeviceItem.propTypes = {
  device: PropTypes.object,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};
