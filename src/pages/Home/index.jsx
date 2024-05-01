import './index.css';
import HomeHeader from './components/Header';
import { UsageChart, RevenueChart, WeekChart, RevenueComparisonChart, TopUsedTable, TopRevenueTable, ContentTable, } from './components';
import React from 'react';

export default function Home() {

  const content = () => {
    return (
      <>
        <ContentTable/>
        <HomeHeader/>
        <UsageChart/>
        <RevenueChart/>
        <WeekChart/>
        <RevenueComparisonChart/>
        <TopUsedTable/>
        <TopRevenueTable/>
      </>
    );
  };

  return (
    <div id={'Home'}>
      <button >Generate PDF</button>
      {content()}
    </div>
  );
}
