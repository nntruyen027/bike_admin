import React from 'react';
import PropTypes from 'prop-types';
import './CreateButton.css';

function CreateButton({ onClick, }) {
  return <button id={'CreateButton'} onClick={onClick}>Thêm mới</button>;
}

CreateButton.propTypes = {
  onClick: PropTypes.func,
};

export default CreateButton;