import './index.css';
import React, { useState, } from 'react';
import Header from './components/Header';
import Comment from './Comment';

export default function Feedback() {
  const [currentTab, setCurrentTab,] = useState('Đánh giá');

  const render = () => {
    if(currentTab === 'Đánh giá')
      return <Comment/>;
  };

  return (
    <div id={'Feedback'} >
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab}/>
      {render()}
    </div>
  );
}