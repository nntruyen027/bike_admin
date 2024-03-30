import React from 'react';
import PropTypes from 'prop-types';

export default function StaffList({ list, }) {
  return (
    <table>
      <thead>
        <tr>
          <th>
                    Nhân viên
          </th>
          <th>
                    Số điện thoại
          </th>
          <th>
                    Ngày sinh
          </th>
          <th>
                    Giới tính
          </th>
          <th>
                    Địa chỉ
          </th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => <ItemList key={index} item={item} />)}
      </tbody>
    </table>
  );
}

function ItemList({ item, }) {
  return (
    <tr>
      <td>{item.full_name}</td>

      <td>{item.phone_number}</td>
      <td>{item.date_of_birth}</td>
      <td>{item.gender}</td>
      <td>{item.address}</td>
    </tr>
  );
}

StaffList.propTypes = {
  list: PropTypes.array,
};

ItemList.propTypes = {
  item: PropTypes.object,
};