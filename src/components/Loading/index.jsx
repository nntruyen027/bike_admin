import React from 'react';
import './index.css';

export default function Loading() {
  return (
    <div id={'loading'}>
      <img src={`${process.env.PUBLIC_URL}assets/images/loading.gif`} alt={'Ảnh loading'}/>
    </div>
  );
}