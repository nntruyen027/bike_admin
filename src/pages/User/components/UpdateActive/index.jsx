import './UpdateActive.css';
import React, { useEffect, useState, } from 'react';
import PropTypes from 'prop-types';
import { SaveButton, } from '~/components';

export default function UpdateActive({ username, onUpdate, }) {
  const [banned, setBanned,] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST_IP}/user/?username=${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
      method: 'GET',
    })
      .then(res => {
        if(res.status === 200)
          return res.json();
        else
          return Promise.reject(res.json());
      })
      .then(data => {
        setBanned(data.data.is_banned);
      })
      .catch(error => alert(error));
  }, []);

  return (
    <div id={'Update-Active'}>
      <div className={'body-container'}>
        <table>
          <tr>
            <td>
              <div>Trạng thái hoạt động</div>
              <select
                value={banned}
                onChange={(e) => setBanned(e.target.value)}
              >
                <option key={'false'} label={'Bình thường'} value={false} />
                <option key={'true'} label={'Cấm'} value={true} />
              </select>
            </td>
          </tr>
        </table>

        <div className={'button-container'}>
          <SaveButton onClick={() => {
            onUpdate({
              id:username, is_banned:banned,
            });
          }}/>
        </div>
      </div>
    </div>
  );
}

UpdateActive.propTypes = {
  onUpdate: PropTypes.func,
  username: PropTypes.string,
};