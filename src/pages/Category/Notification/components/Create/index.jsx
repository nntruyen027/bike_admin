import './Create.css';
import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { SaveButton, } from '~/components';

export default function Create({ onCreate, }) {
  const [title, setTitle,] = useState('');
  const [text, setText,] = useState('');

  const handleSubmit = () => {
    if (!title || !text) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    onCreate({
      title,
      text,
    });

    setTitle('');
    setText('');
  };

  return (
    <div className='simple-form'>
      <div className='info-input'>
        <label>
          Tiêu đề:
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
        </label>
        <label>
          Nội dung:
          <textarea rows={10} value={text} onChange={(e) => setText(e.target.value)}/>
        </label>
      </div>
      <SaveButton onClick={handleSubmit}/>
    </div>
  );
}

Create.propTypes = {
  onCreate: PropTypes.func,
};
