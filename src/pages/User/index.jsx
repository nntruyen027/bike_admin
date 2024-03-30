import './index.css';
import Header from './components/Header';
import React, { useState, } from 'react';
import CustomerList from './CustomerList';
import StaffList from './StaffList';

export default function User() {
  const [currentTab, setCurrentTab,] = useState('Khách hàng');

  return (
    <div id={'User'}>
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {renderList(currentTab)}
    </div>
  );
}

function renderList(currentTab) {

  if(currentTab === 'Khách hàng')
    return <CustomerList />;
  else {
    return (
      <>
        <StaffList/>
      </>);
  }
}