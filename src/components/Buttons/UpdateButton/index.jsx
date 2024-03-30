import React from 'react';
import PropTypes from 'prop-types';
import './UpdateButton.css';

function UpdateButton({ onClick, }) {
  return <button id={'UpdateButton'} onClick={onClick}>Chỉnh sửa</button>;
}

UpdateButton.propTypes = {
  onClick: PropTypes.func,
};

export default UpdateButton;