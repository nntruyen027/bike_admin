import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

function Modal({ title, setShow, children, }) {

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <div className='modal-header'>
          <h2>{title}</h2>
          <button className='close-button' onClick={() => setShow()}>×</button>
        </div>
        <div className='modal-content'>
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  setShow: PropTypes.func,
  children: PropTypes.any,
};

export default Modal;
