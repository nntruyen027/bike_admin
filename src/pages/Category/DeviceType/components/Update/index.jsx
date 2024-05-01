import React, { useState, useEffect, } from 'react';
import './Update.css';
import PropTypes from 'prop-types';
import { SaveButton, } from '~/components';

function Update({ onUpdate, type, }) {
  const defaultImage = process.env.PUBLIC_URL + 'assets/images/category/image-input.png';
  const [image, setImage,] = useState( );
  const [name, setName,] = useState(type?.name || '');
  const [price, setPrice,] = useState(type?.price || '');
  const [description, setDescription,] = useState(type?.description || '');

  useEffect(() => {
    setImage( null);
    setName(type.name || '');
    setPrice(type.price || '');
    setDescription(type.description || '');
  }, [type,]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert('Vui lòng điền đầy đủ thông tin và chọn hình ảnh.');
      return;
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      alert('Vui lòng nhập một số hợp lệ cho giá.');
      return;
    }

    onUpdate(type.id, name, price, description, type.image, image);
  };
  console.log(image);

  return (
    <form id='update-car-type-form' onSubmit={handleSubmit} encType='multipart/form-data'>
      <div className='image-input'>
        <label htmlFor='fileInput'>
          <img src={image ? URL.createObjectURL(image) : defaultImage} alt='Car Type' className='image-preview' />
        </label>
        <input id='fileInput' type='file' accept='image/*' onChange={handleImageChange} style={{
          display: 'none', 
        }} />
      </div>
      <div className='info-input'>
        <label>
          Tên loại xe:
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Giá:
          <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label>
          Mô tả:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <SaveButton onClick={handleSubmit}/>
      </div>
    </form>
  );
}

Update.propTypes = {
  onUpdate: PropTypes.func,
  type: PropTypes.object,
};

export default Update;
