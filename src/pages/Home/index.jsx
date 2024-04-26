import './index.css';
import HomeHeader from './components/Header';
import { UsageChart, RevenueChart, WeekChart, RevenueComparisonChart, TopUsedTable, TopRevenueTable, ContentTable, } from './components';
import React from 'react';
// import { PDFDownload, } from '~/components';

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
      {/* <PDFDownload/> */}
      {content()}
    </div>
  );
}
