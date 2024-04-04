import './index.css';
import HomeHeader from './components/Header';
import { UsageChart, RevenueChart, } from './components';
import React from 'react';

export default function Home() {
  return (
    <div id={'Home'}>
      <HomeHeader/>
      <UsageChart/>
      <RevenueChart/>
    </div>
  );
}
