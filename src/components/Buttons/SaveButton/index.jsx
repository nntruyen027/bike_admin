import React from 'react';
import PropTypes from 'prop-types';
import './SaveButton.css';

function SaveButton({ onClick, }) {
  return <button id={'SaveButton'} onClick={onClick}>Lưu</button>;
}

SaveButton.propTypes = {
  onClick: PropTypes.func,
};

export default SaveButton;