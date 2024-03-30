import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPersonBiking, } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import React from 'react';

// eslint-disable-next-line react/prop-types
export default function CategoryHeader({ currentTab, setCurrentTab, }) {
  return (
    <div id={'Category-Header'} >
      <HeaderItem title={'Loại xe'} icon={faPersonBiking} currentTab={currentTab}
        setCurrentTab={setCurrentTab}/>
      <HeaderItem title={'Điểm giao dịch'} icon={faLocationDot} currentTab={currentTab}
        setCurrentTab={setCurrentTab}/>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function HeaderItem({ title, icon, currentTab, setCurrentTab, }) {
  function handleClick () {
    setCurrentTab(title);
  }

  return (
    <span className={currentTab === title ? 'Header-Item selected' : 'Header-Item'}
      onClick={handleClick}>
      <FontAwesomeIcon className={'icon'} icon={icon} />
      <span>{title}</span>
    </span>
  );
}