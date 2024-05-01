import Cart from './Cart';
import { faCartShopping, faFile, faGlobe, faWallet, } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import React, { useEffect, useState, } from 'react';

export default function HomeHeader() {
  const [user, setUser,] = useState(0);
  const [bicycle, setBicycle,] = useState(0);
  const [event, setEvent,] = useState(0);
  const [using, setUsing,] = useState(0);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST_IP}/statistics/count/`)
      .then(res => res.status === 200 ? res.json() : Promise.reject(res.json()))
      .then(data => {
        setBicycle(data.data.bicycle);
        setUser(data.data.user);
        setEvent(data.data.event);
        setUsing(data.data.using);
      })
      .catch(error => alert(error));
  }, []);

  return (
    <div id={'Home-Header'}>
      <Cart title={'Tổng lượt thuê xe'} content={using} icon={faWallet}/>
      <Cart title={'Tổng người dùng '} content={user} icon={faGlobe}/>
      <Cart title={'Tổng sự kiện'} content={event} icon={faFile}/>
      <Cart title={'Tổng xe đạp'} content={bicycle} icon={faCartShopping}/>
    </div>
  );
}