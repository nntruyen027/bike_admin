import './App.css';
import React, { useLayoutEffect, useState, } from 'react';
import { Header, Sidebar, } from '~/components';
import { Category, Event, Feedback, Home, Login, User, Device, Chat, } from '~/pages';
import '~/fonts/inter';
import '~/fonts/source-sans-pro';

function App() {
  const [accessToken, setAccessToken,] = useState(() =>
    localStorage.getItem('access'));

  const [currentPage, setCurrentPage,] = useState('Trang chủ');

  useLayoutEffect(() => {
    if(accessToken)
      document.querySelector('body').style.backgroundColor = 'rgba(248, 249, 250, 1)';
  }, []);

  const renderPage = () => {
    if (currentPage === 'Trang chủ') {
      return <Home />;
    } else if (currentPage === 'Danh mục') {
      return <Category/>;
    }
    else if(currentPage === 'Sự kiện') {
      return <Event/>;
    }
    else if(currentPage === 'Thiết bị') {
      return <Device/>;
    }
    else if(currentPage === 'Người dùng') {
      return <User/>;
    }
    else if(currentPage === 'Phản hồi') {
      return <Feedback/>;
    }
    else if(currentPage === 'Trò chuyện') {
      return <Chat/>;
    }
  };

  if(!accessToken) {
    return <Login setAccessToken={setAccessToken}/>;
  }
  else {
    return (
      <div className='App'>
        <Header title={currentPage}/>
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage}
          setAccessToken={setAccessToken} />
        {renderPage()}
      </div>
    );
  }
}

export default App;
