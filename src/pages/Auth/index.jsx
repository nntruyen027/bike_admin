import React from 'react';
import { useLayoutEffect, useState, } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
export default function Login ({ setAccessToken, }) {
  const [username, setUsername,] = useState('');
  const [password, setPassword,] = useState('');

  useLayoutEffect(() => {
    document.querySelector('body').style.backgroundColor = 'white';
  }, []);
  function preventSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    fetch(process.env.REACT_APP_HOST_IP + '/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        if (data.access && data.refresh) {
          setAccessToken(data.access);
          localStorage.setItem('access', data.access);
          localStorage.setItem('refresh', data.refresh);
          document.querySelector('body').style.backgroundColor = 'rgba(248, 249, 250, 1)';
        } else {
          console.error('Invalid response format');
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <div id='Login'>
      <img className={'logo512'} alt='logo' src={process.env.PUBLIC_URL + '/logo512.png'}/>
      <form onSubmit={preventSubmit}>
        <label htmlFor='username'>Tên đăng nhập</label>
        <input id='username' type='text' value={username}
          onChange={e => setUsername(e.target.value)}/>
        <label htmlFor='password'>Mật khẩu</label>
        <input id='password' type='password' value={password}
          onChange={e => setPassword(e.target.value)}/>
        <input id='submit' type='submit' value='Đăng nhập'/>
        <img className='the-boy' alt='Người con trai dẫn xe đạp'
          src={process.env.PUBLIC_URL + 'assets/images/login/the_boy.png'}/>
        <img className={'the-girl'} alt={'Người con gái chạy xe đap'}
          src={process.env.PUBLIC_URL + 'assets/images/login/the_girl.png'}/>
      </form>

    </div>
  );
}

Login.propTypes = {
  setAccessToken: PropTypes.func.isRequired,
};