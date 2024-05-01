import PropTypes from 'prop-types';
import React, { useEffect, useState, } from 'react';
import './index.css';
import { formatDateTimePostgresToReadable, } from '~/pages/Event/functions';
import { DeleteButton, UpdateButton, } from '~/components';
import { Modal, } from '~/components';
import { Update, } from '~/pages/Event/components';

export default function Detail ({ id, onDelete, onUpdate, }) {
  const [name, setName,] = useState('');
  const [address, setAddress,] = useState('');
  const [image, setImage,] = useState(null);
  const [beginAt, setBeginAt,] = useState('');
  const [endAt, setEndAt,] = useState('');
  const [text, setText,] = useState('');
  const [showUpdateModal, setShowUpdateModal,] = useState(false);
  const [event, setEvent,] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST_IP}/events/${id}/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then(res => {
        if(res.status < 250)
          return res.json();
        else{
          alert(res.json());
        }
      })
      .then(data => {
        setEvent(data?.data);
        setName(data.data?.name);
        setAddress(data.data?.address);
        setImage(data.data?.poster);
        setBeginAt(data.data?.begin_at);
        setEndAt(data.data?.end_at);
        setText(data.data?.text);
      })
      .catch(error => alert(error));
  }, []);

  return (
    <div id={'event-detail'} className='modal-content'>
      {image && (
        <div className='event-image'>
          <img src={`${process.env.REACT_APP_HOST_IMAGE_IP}${image}`} alt='Sự kiện'/>
        </div>)}
      <div className='event-info'>
        <div>
          <strong>Tên sự kiện:</strong> {name}
        </div>
        <div>
          <strong>Địa chỉ:</strong> {address}
        </div>
        <div>
          <strong>Thời gian bắt đầu:</strong> {formatDateTimePostgresToReadable(beginAt) }
        </div>
        <div>
          <strong>Thời gian kết thúc:</strong> { formatDateTimePostgresToReadable(endAt)}
        </div>
        <div>
          <strong>Mô tả:</strong> {text}
        </div>
        <DeleteButton onClick={() => {
          onDelete(id);
        }}/> <UpdateButton onClick={() => setShowUpdateModal(!showUpdateModal)}/>
        {showUpdateModal && <Modal title={'Chỉnh sửa thông tin sự kiện'} setShow={() => setShowUpdateModal(!showUpdateModal)}>
          <Update onUpdate={onUpdate} event={event}/>
        </Modal>}
      </div>
    </div>
  );
}

Detail.propTypes = {
  id: PropTypes.string,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};