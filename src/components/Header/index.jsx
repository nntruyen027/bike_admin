import PropTypes from 'prop-types';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import React from 'react';

export default function Header({ title, }) {
  return (
    <div id={'Header'}>
      <img className={'logo192'} alt={'Đây là logo 192'} src={process.env.PUBLIC_URL + '/logo192.png'}/>
      <span className={'title'}>{title}</span>
      <span className={'search-box'}>
        <FontAwesomeIcon className={'search-icon'} icon={faMagnifyingGlass} />
        <input type={'text'} placeholder={'Tìm kiếm'}/>
      </span>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};