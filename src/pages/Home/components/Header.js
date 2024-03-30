import Cart from './Cart';
import { faCartShopping, faFile, faGlobe, faWallet, } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import React, { useEffect, useState, } from 'react';

export default function HomeHeader() {
  const [user, setUser,] = useState(0);
  const [bicycle, setBicycle,] = useState(0);
  const [event, setEvent,] = useState(0);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST_IP}/statistics/count/`)
      .then(res => res.status === 200 ? res.json() : Promise.reject(res.json()))
      .then(data => {
        setBicycle(data.data.bicycle);
        setUser(data.data.user);
        setEvent(data.data.event);
      })
      .catch(error => alert(error));
  }, []);

  return (
    <div id={'Home-Header'}>
      <Cart title={'Doanh thu hôm nay'} content={'$53,000'} variability={'+55%'} increase={true} icon={faWallet}/>
      <Cart title={'Tổng người dùng '} content={user} variability={'+5%'} increase={true} icon={faGlobe}/>
      <Cart title={'Tổng sự kiện'} content={event} variability={'-14'} increase={false} icon={faFile}/>
      <Cart title={'Tổng xe đạp'} content={bicycle} variability={'+8%'} increase={true} icon={faCartShopping}/>
    </div>
  );
}