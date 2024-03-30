import React from 'react';
import PropTypes from 'prop-types';
import './Table.css';

// Định nghĩa một functional component TableHeader để hiển thị phần header của bảng
const TableHeader = ({ columns, }) => {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th key={index}>{column.label}</th>
        ))}
      </tr>
    </thead>
  );
};

// Định nghĩa một functional component Table để tổng hợp phần header và các hàng dữ liệu của bảng
const Table = ({ columns, data, onDataClick, }) => {
  return (
    <table id={'Table'}>
      <TableHeader columns={columns} />
      <tbody>
        {data.map((rowData, rowIndex) => (
          <tr key={rowIndex} onClick={onDataClick}>
            {columns.map((column, colIndex) => {
              if (column.type === 'component') {
                const Component = column.component;
                return <td key={colIndex}><Component data={rowData[column.key]} /></td>;
              } else {
                return <td key={colIndex}>{rowData[column.key]}</td>;
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.array,
};

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  onDataClick: PropTypes.func,
};

export default Table;

