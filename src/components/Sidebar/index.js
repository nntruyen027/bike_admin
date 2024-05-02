import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket,
  faBicycle,
  faCalendarCheck,
  faComment,
  faGrip,
  faHouse,
  faUserGroup, } from '@fortawesome/free-solid-svg-icons';
import { useLayoutEffect, useState, } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
export default function Index({ setCurrentPage, setAccessToken, }) {
  const title = [
    'Trang chủ', 'Danh mục', 'Sự kiện', 'Thiết bị', 'Người dùng', 'Phản hồi','', 'Trang cá nhân', 'Đăng xuất',
  ];

  const [showSidebar, setShowSidebar,] = useState(false);

  function handleMouseEnter() {
    setShowSidebar(true);
  }

  function handleMouseLeave() {
    setShowSidebar(false);
  }

  function handleClick(e) {
    const clickedElement = e.currentTarget;

    setCurrentPage(clickedElement.children[1].textContent);

    clickedElement.classList.add('selected');

    const parentElement = clickedElement.parentNode;

    const siblings = Array.from(parentElement.children).filter(child => child !== clickedElement);

    siblings.forEach(value => {
      if (value.classList.contains('selected'))
        value.classList.remove('selected');
    });
  }

  function handleLogout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setAccessToken('');
    setCurrentPage('Trang chủ');
  }

  useLayoutEffect(() => {
    const sidebar = document.querySelector('#Sidebar');
    if(showSidebar) {
      sidebar.style.width = '15%';
      title.forEach((value, index) => {
        if(sidebar.children[index].children[1])
          sidebar.children[index].children[1].textContent = value;
      });
    }
    else {
      sidebar.style.width = '4.1%';
      title.forEach((value, index) => {
        if(sidebar.children[index].children[1])
          sidebar.children[index].children[1].textContent = '';
      });
    }

  },[showSidebar,]);

  return (
    <div id={'Sidebar'} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div id={'home'} className={'tab selected'} onClick={handleClick} >
        <FontAwesomeIcon className={'icon'} icon={faHouse}/>
        <div className={'name'}></div>
      </div>
      <div id={'category'} className={'tab'} onClick={handleClick}>
        <FontAwesomeIcon className={'icon'} icon={faGrip}/>
        <div className={'name'}></div>
      </div>
      <div id={'event'} className={'tab'} onClick={handleClick}>
        <FontAwesomeIcon className={'icon'} icon={faCalendarCheck}/>
        <div className={'name'}></div>
      </div>
      <div id={'bicycle'} className={'tab'} onClick={handleClick}>
        <FontAwesomeIcon className={'icon'} icon={faBicycle}/>
        <div className={'name'}></div>
      </div>
      <div id={'user'} className={'tab'} onClick={handleClick}>
        <FontAwesomeIcon className={'icon'} icon={faUserGroup}/>
        <div className={'name'}></div>
      </div>
      <div id={'feedback'} className={'tab'} onClick={handleClick}>
        <FontAwesomeIcon className={'icon'} icon={faComment}/>
        <div className={'name'}></div>
      </div>
      <div id={'line'}></div>

      <div id={'avatar'} className={'tab'} onClick={handleClick}>
        <img className={'avatar90'} alt={'Đây là avtar'} src={process.env.PUBLIC_URL + 'logo192.png'}/>
        <div className={'name'}></div>
      </div>

      <div id={'logout'} className={'tab'} onClick={handleLogout}>
        <FontAwesomeIcon className={'icon'} icon={faArrowRightFromBracket}/>
        <div className={'name'}></div>
      </div>

    </div>
  );
}

Index.proTypes = {
  currentPage: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};