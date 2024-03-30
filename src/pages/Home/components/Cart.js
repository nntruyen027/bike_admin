import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';

export default function Cart({ title, content, icon, }) {
  return (
    <div id={'Cart'}>
      <div>
        <div className={'main'}>
          <div className={'title'}>{title}</div>
          <span className={'content'}>{content}</span>
        </div>
        <span className={'icon-container'}>
          <FontAwesomeIcon className={'icon'} icon={icon}/>
        </span>
      </div>
    </div>
  );
}

Cart.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  icon: PropTypes.any,
};