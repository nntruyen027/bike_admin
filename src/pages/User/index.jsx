import './index.css';
import Header from './components/Header';
import Filter from './components/Filter';
import React, { useState, } from 'react';
import AddStaff from './components/AddStaff';
import CustomerList from './CustomerList';
import StaffList from './components/StaffList';

export default function User() {
  const [currentTab, setCurrentTab,] = useState('Khách hàng');
  const [addUser, setAddUser,] = useState(false);

  function renderComponent() {
    if(addUser) {
      return <AddStaff setAddUser={setAddUser}/>;
    }
    else {
      return <Filter currentTab={currentTab} setAddUser={setAddUser}/>;
    }
  }

  return (
    <div id={'User'} >
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab}/>
      {renderComponent()}
      {addUser || renderList(currentTab)}
    </div>
  );
}

function renderList(currentTab) {
  if(currentTab === 'Khách hàng')
    return <CustomerList list={customers}/>;
  else {
    return <StaffList list={staffs}/>;
  }
}