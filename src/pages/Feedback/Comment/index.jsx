import React, { useEffect, useState, } from 'react';
import { Table, } from '~/components';

export default function index() {
  const [eventFeedback, setEventFeedback,] = useState([]);
  const [typeFeedback, setTypeFeedback,] = useState([]);
  const [bicycleFeedback, setBicycleFeedback,] = useState([]);

  useEffect(() => {
    getListFeedback();
  }, []);

  const getListFeedback = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/feedbacks/events/`, {
      method: 'GET',
      headers : {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then(
        res => {
          if(res.status === 200)
            return res.json();
          else
            return Promise.reject(res.json()?.error);
        }
      )
      .then(data => {
        setEventFeedback(data.data);
      })
      .catch(error => alert(error));

    fetch(`${process.env.REACT_APP_HOST_IP}/feedbacks/bicycle-types/`, {
      method: 'GET',
      headers : {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then(
        res => {
          if(res.status === 200)
            return res.json();
          else
            return Promise.reject(res.json()?.error);
        }
      )
      .then(data => {
        setTypeFeedback(data.data);
      })
      .catch(error => alert(error));

    fetch(`${process.env.REACT_APP_HOST_IP}/feedbacks/bicycles/`, {
      method: 'GET',
      headers : {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then(
        res => {
          if(res.status === 200)
            return res.json();
          else
            return Promise.reject(res.json()?.error);
        }
      )
      .then(data => {
        setBicycleFeedback(data.data);
      })
      .catch(error => alert(error));
  };

  return (
    <div id={'comment-component'}>
      {eventFeedback.length !== 0 && (
        <Table
          data={eventFeedback}
          columns={[
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
            {
              key: 'event',
              label: 'Mã sự kiện',
            },
          ]}
        />
      )}
      { typeFeedback.length !== 0 &&
        <Table
          data={typeFeedback}
          columns={[
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
            {
              key: 'bicycle_type',
              label: 'Mã loại xe',
            },
          ]}
        />
      }
      { bicycleFeedback.length !== 0 && <Table
        data={bicycleFeedback}
        columns={[
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
          {
            key: 'bicycle',
            label: 'Mã xe',
          },
        ]}/>}

    </div>
  );
}