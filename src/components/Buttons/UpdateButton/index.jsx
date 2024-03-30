import React from 'react';
import PropTypes from 'prop-types';
import './DeleteButton.css';

function DeleteButton({ onClick, }) {
  return <button id={'DeleteButton'} onClick={onClick}>Xóa</button>;
}

DeleteButton.propTypes = {
  onClick: PropTypes.func,
};

export default DeleteButton;