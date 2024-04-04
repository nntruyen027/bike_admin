import React, { useEffect, useState, } from 'react';
import './index.css';
import PropTypes from 'prop-types';

export default function Sidebar({ setUser, }) {
  const [users, setUsers,] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST_IP}/messengers/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then(res => res.status === 200 ? res.json() : Promise.reject(res.json()))
      .then(data => setUsers(data.data))
      .catch(err => alert(err));
  }, []);

  return (
    <div id={'chat-sidebar'}>
      {users.map(item => (<SidebarItem key={item.user} item={item} setUser={setUser}/>))}
    </div>
  );
}

function SidebarItem({ item, setUser, }) {
  return (
    <div className={'item'} onClick={() => {
      setUser(item.user);
      console.log(item.user);
    }}>
      <div className={'username'}>{item.user}</div>
      <div className={'content'}>{item?.latest_message?.content || 'Chưa có tin nhắn'}</div>
    </div>
  );
}

Sidebar.propTypes ={
  setUser: PropTypes.func,
};

SidebarItem.propTypes = {
  item: PropTypes.object,
  setUser: PropTypes.func,
};

