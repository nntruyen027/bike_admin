import './index.css';
import HomeHeader from './components/Header';
import TimeChooser from './components/TimeChooser';
import React from 'react';

export default function Home() {
  return (
    <div id={'Home'}>
      <HomeHeader/>
      <TimeChooser/>
    </div>
  );
}
