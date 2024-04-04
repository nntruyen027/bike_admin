import React, { useEffect, useState, } from 'react';
import { Table, } from '~/components';

export default function Report() {
  const [reports, setReports,] = useState([]);

  useEffect(() => {
    getReport();
  }, []);

  const getReport = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/reports/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
      method: 'GET',
    })
      .then(res => res.status === 200 ? res.json() : Promise.reject(res.json()) )
      .then(data => setReports(data.data))
      .catch(err => alert(err));
  };

  return (
    <div id={'report-component'}>
      <Table
        data={reports}
        // onDataClick={clickOnRow}
        columns={[
          {
            key: 'id',
            label: 'Mã báo cáo',
          },
          {
            key: 'user',
            label: 'Người dùng',
          },
          {
            key: 'title',
            label: 'Tiêu đề',
          },
          {
            key: 'text',
            label: 'Nội dung',
          },
        ]}
      />
    </div>
  );
}