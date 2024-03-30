import React from 'react';
import PropTypes from 'prop-types';
import './ExitButton.css';

function ExitButton({ onClick, }) {
  return <button id={'ExitButton'} onClick={onClick}>Thoát</button>;
}

ExitButton.propTypes = {
  onClick: PropTypes.func,
};

export default ExitButton;