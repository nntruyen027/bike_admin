import './TransactionPointList.css';
import React, { useLayoutEffect, useState, } from 'react';
import PropTypes from 'prop-types';

export default function TransactionPointList({ setEdit, }) {
  const [transactions, setTransactions, ] = useState([]);

  useLayoutEffect(() => {
    handleGetList();
  }, []);
  
  const handleGetList = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/transactions/`, {
      methods: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access'),
        'Accept': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setTransactions(data.data))
      .catch(err => alert(err));
  };

  return (
    <table id={'Point-List'} >
      <thead>
        <tr>
          <td className={'point-name'}>Điểm giao dịch</td>
          <td className={'point-address'}>Địa chỉ</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {transactions.map((point, index) => <PointItem key={index} point={point} setEdit={setEdit}/>)}
      </tbody>

    </table>
  );
}

function PointItem({ point, setEdit, }) {
  const handleClick = () => {
    setEdit(true);
  };

  return (
    <tr id={point.id} className={'Point-Item'}>
      <td className={'point-name'}>{point.name}</td>
      <td className={'point-address'}>{point.address}</td>
      <td className={'button-group'}>
        <button className={'edit-button'} onClick={handleClick}>Chỉnh sửa</button>
        <button className={'delete-button'}>Xóa</button>
      </td>
    </tr>
  );
}

TransactionPointList.propTypes = {
  setEdit: PropTypes.func,
};

PointItem.propTypes = {
  setEdit: PropTypes.func,
  point: PropTypes.object,
};