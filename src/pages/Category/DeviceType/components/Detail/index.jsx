import './Detail.css';
import React, { useLayoutEffect, useState, } from 'react';
import PropTypes from 'prop-types';
import { DeleteButton, UpdateButton, } from '~/components';
import Modal from '~/components/Modal';
import Update from '~/pages/Category/DeviceType/components/Update';

export default function Detail({ id, onDelete, onUpdate, }) {
  const [data, setData,] = useState(null);
  const [showUpdateModal, setShowUpdateModal,] = useState(false);

  const showUpdate = ()=> {
    setShowUpdateModal(!showUpdateModal);
  };

  useLayoutEffect(() => {
    fetch(`${process.env.REACT_APP_HOST_IP}/bicycles/types/${id}/`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access'),
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setData(data.data));
  }, []);

  return (
    <>
      <div className='modal-content-inner'>
        <div className='left-section'>
          <img src={process.env.REACT_APP_HOST_IMAGE_IP + '' + data?.image}
            alt={data?.name} className='car-type-image'/>
        </div>
        <div className='right-section'>
          <h2>{data?.name}</h2>
          <div className='car-type-info'>
            <p><strong>Giá:</strong> {data?.price}</p>
            <p><strong>Mô tả:</strong> {data?.description}</p>
          </div>

          <DeleteButton onClick={() => onDelete(id)}/>
          <UpdateButton onClick={() => showUpdate()}/>
        </div>
      </div>
      {showUpdateModal && <Modal title={'Chỉnh sửa thông tin'} setShow={showUpdate}>
        <Update onUpdate={onUpdate} type={data} />
      </Modal> }
    </>

  );
}

Detail.propTypes = {
  id: PropTypes.bool,
  onDelete: PropTypes.any,
  onUpdate: PropTypes.any,
};