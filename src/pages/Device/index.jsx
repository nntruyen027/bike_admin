import './index.css';
import Filter from './components/Filter';
import AddDevice from './components/AddDevice';
import React, { useState, } from 'react';
import PropTypes from 'prop-types';

export default function Device() {
  const [addDevice, setAddDevice,] = useState(false);
  const [bicycleList, ,] = useState([]);

  function renderBody() {
    if(!addDevice) {
      return (<table>
        <thead>
          <tr>
            <th>
                        ID
            </th>
            <th>
                        Loại xe đạp
            </th>
            <th className={'text-align-center'}>
                        Số lần sử dụng
            </th>
            <th className={'text-align-center'}>
                        Điểm giao dịch
            </th>
            <th className={'text-align-center'}>
                        Trạng thái sử dụng
            </th>
          </tr>
        </thead>
        <tbody>
          {bicycleList.map((device, index) => <DeviceItem key={index} device={device}/> )}
        </tbody>
      </table>);
    } else {
      return <AddDevice setAddDevice={setAddDevice}/>;
    }
  }

  return (
    <div id={'Device'}>
      <Filter setAddDevice={setAddDevice}/>
      {renderBody()}
    </div>
  );
}

function DeviceItem({ device, }) {
  return (
    <tr>
      <td>
        {device.uuid}
      </td>
      <td>
        {device.type}
      </td>
      <td className={'text-align-center'}>
        {device.used}
      </td>
      <td>
        {device.transaction}
      </td>
      <td className={'text-align-center'}>
        {device.status}
      </td>
    </tr>
  );
}

DeviceItem.propTypes = {
  device : PropTypes.object,
};