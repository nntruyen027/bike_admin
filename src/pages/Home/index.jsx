import './index.css';
import HomeHeader from './components/Header';
import { UsageChart, } from './components';
import React from 'react';

export default function Home() {
  return (
    <div id={'Home'}>
      <HomeHeader/>
      <UsageChart/>
    </div>
  );
}
