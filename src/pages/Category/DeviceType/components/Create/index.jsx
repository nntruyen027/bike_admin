import React, { useState, } from 'react';
import './Create.css';
import PropTypes from 'prop-types';
import { SaveButton, } from '~/components';

function Create({ onCreate, }) {
  const defaultImage = process.env.PUBLIC_URL + 'assets/images/category/image-input.png';
  const [image, setImage,] = useState(null);
  const [name, setName,] = useState('');
  const [price, setPrice,] = useState('');
  const [description, setDescription,] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !image) {
      alert('Vui lòng điền đầy đủ thông tin và chọn hình ảnh.');
      return;
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      alert('Vui lòng nhập một số hợp lệ cho giá.');
      return;
    }

    onCreate({
      price, name, description, image,
    });

    setName('');
    setDescription('');
    setImage(null);
    setPrice('');
  };

  return (
    <form id='add-car-type-form' onSubmit={handleSubmit} encType='multipart/form-data'>
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
        <SaveButton />
      </div>
    </form>
  );
}

Create.propTypes = {
  onCreate: PropTypes.func,
};

export default Create;
