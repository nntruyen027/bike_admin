import { SaveButton, } from '~/components';
import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { convertDatetimeToLocalString, convertToPostgresTimestamp, } from '~/pages/Event/functions';

export default function Update ({ onUpdate, event, }) {
  const [image, setImage,] = useState(null);
  const [address, setAddress,] = useState(event?.address);
  const [name, setName,] = useState(event.name);
  const [beginAt, setBeginAt,] = useState(convertDatetimeToLocalString(event.begin_at));
  const [endAt, setEndAt,] = useState(convertDatetimeToLocalString(event.end_at));
  const [text, setText,] = useState(event.text);

  console.log(event);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address || !name || !beginAt || !endAt || !text)
      return alert('Vui lòng nhập đầy đủ thông tin');

    console.log(beginAt, endAt);

    onUpdate({
      id: event.id,
      name,
      address,
      image,
      beginAt: convertToPostgresTimestamp(beginAt),
      endAt: convertToPostgresTimestamp(endAt),
      text,
    });
  };

  return (
    <form id={'update-form'} onSubmit={handleSubmit}>
      <div className='image-input'>
        <label htmlFor='fileInput'>
          <img src={image ? URL.createObjectURL(image) : `${process.env.REACT_APP_HOST_IMAGE_IP}${event?.poster}`} alt='Car Type' className='image-preview'/>
        </label>
        <input id='fileInput' type='file' accept='image/*' onChange={handleImageChange} style={{
          display: 'none',
        }}/>
      </div>
      <div className='info-input'>
        <label>
          Tên sự kiện:
          <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
        </label>
        <label>
          Địa chỉ:
          <input type='text' value={address} onChange={(e) => setAddress(e.target.value)}/>
        </label>
        <label>
          Thời gian bắt đầu:
          <input type='datetime-local' value={beginAt} onChange={(e) => setBeginAt(e.target.value)}/>
        </label>
        <label>
          Thời gian kết thúc:
          <input type='datetime-local' value={endAt} onChange={(e) => setEndAt(e.target.value)}/>
        </label>
        <label>
          Mô tả:
          <textarea value={text} onChange={(e) => setText(e.target.value)}/>
        </label>
        <SaveButton/>
      </div>
    </form>
  );
}
Update.propTypes = {
  onUpdate: PropTypes.func,
  event: PropTypes.object,
};