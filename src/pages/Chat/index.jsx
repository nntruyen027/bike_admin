import React, { useState, } from 'react';
import { Sidebar, Detail, } from './components';
import './index.css';

export default function index () {
  const [userDetail, setUserDetail,] = useState('');
  return (
    <div id={'chat-component'}>
      <Sidebar setUser={setUserDetail}/>
      <Detail user={userDetail}/>
    </div>
  );
}