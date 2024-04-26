import './index.css';
import { useState, } from 'react';
import DeviceType from './DeviceType';
import TransactionPoint from './TransactionPoint';
import React from 'react';
import Header from './components/Header';
import Notification from '~/pages/Category/Notification';

export default function Category() {
  const [currentTab, setCurrentTab,] = useState('Loại xe');

  function renderList() {
    if(currentTab === 'Loại xe') {
      return <DeviceType/>;
    }
    else if(currentTab === 'Điểm giao dịch') {
      return <TransactionPoint/>;
    }
    else if(currentTab === 'Thông báo') {
      return <Notification/>;
    }
  }

  function renderBody() {
    return (
      <>
        {renderList()}
      </>
    );
  }

  return (
    <div id={'Category'} >
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab}/>
      {renderBody()}
    </div>
  );
}

