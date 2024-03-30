import { SaveButton, } from '~/components';
import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { convertToPostgresTimestamp, } from '~/pages/Event/functions';

export default function Create ({ onCreate, }) {
  const defaultImage = process.env.PUBLIC_URL + 'assets/images/category/image-input.png';
  const [image, setImage,] = useState(null);
  const [address, setAddress,] = useState('');
  const [name, setName,] = useState('');
  const [beginAt, setBeginAt,] = useState('');
  const [endAt, setEndAt,] = useState('');
  const [text, setText,] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image || !address || !name || !beginAt || !endAt || !text)
      return alert('Vui lòng nhập đầy đủ thông tin');

    onCreate({
      name, address, image, beginAt: convertToPostgresTimestamp(beginAt), endAt:
      convertToPostgresTimestamp(endAt), text,
    });
  };

  return (
    <form id={'create-form'} onSubmit={handleSubmit}>
      <div className='image-input'>
        <label htmlFor='fileInput'>
          <img src={image ? URL.createObjectURL(image) : defaultImage} alt='Car Type' className='image-preview'/>
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

Create.propTypes = {
  onCreate: PropTypes.func,
};