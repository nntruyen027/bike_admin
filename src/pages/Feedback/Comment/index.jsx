import React, { useEffect, useState, } from 'react';
import { Modal, Table, } from '~/components';
import './index.css';
import { Detail, } from './components';

const FEEDBACK_TYPE = ['Sự kiện', 'Loại xe', 'Xe',];

export default function index() {
  const [eventFeedback, setEventFeedback,] = useState([]);
  const [typeFeedback, setTypeFeedback,] = useState([]);
  const [bicycleFeedback, setBicycleFeedback,] = useState([]);
  const [feedbackType, setFeedbackType,] = useState('Sự kiện');
  const [showDetail, setShowDetail,] = useState(false);
  const [selectedFeedBack, setSelectedFeedback,] = useState(null);

  useEffect(() => {
    getListFeedback();
  }, [feedbackType,]);

  const getListFeedback = () => {
    if (feedbackType === 'Sự kiện') {
      getEventFeedbacks();
    } else if (feedbackType === 'Loại xe') {
      getBicycleTypeFeedbacks();
    } else {
      getBicycleFeedbacks();
    }
  };

  const getEventFeedbacks = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/feedbacks/events/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else return Promise.reject(res.json()?.error);
      })
      .then((data) => {
        setEventFeedback(data.data);
      })
      .catch((error) => alert(error));
  };

  const getBicycleTypeFeedbacks = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/feedbacks/bicycle-types/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else return Promise.reject(res.json()?.error);
      })
      .then((data) => {
        setTypeFeedback(data.data);
      })
      .catch((error) => alert(error));
  };

  const getBicycleFeedbacks = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/feedbacks/bicycles/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else return Promise.reject(res.json()?.error);
      })
      .then((data) => {
        setBicycleFeedback(data.data);
      })
      .catch((error) => alert(error));
  };

  const clickOnRow = (e) => {
    setShowDetail(!showDetail);
    if (!showDetail)
      setSelectedFeedback(e.target.parentNode.firstChild.textContent);
    else setSelectedFeedback(null);
  };

  return (
    <div id={'comment-component'}>
      {showDetail && (
        <Modal
          setShow={() => setShowDetail(!showDetail)}
          title={'Xem chi tiết phản hồi'}
        >
          <Detail id={selectedFeedBack} />
        </Modal>
      )}

      <select
        className={'filter-select'}
        value={feedbackType}
        onChange={(e) => setFeedbackType(e.target.value)}
      >
        {FEEDBACK_TYPE.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {eventFeedback.length !== 0 && feedbackType === 'Sự kiện' && (
        <Table
          data={eventFeedback}
          onDataClick={clickOnRow}
          columns={[
            {
              key: 'id',
              label: 'Mã phản hồi',
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
            {
              key: 'event',
              label: 'Mã sự kiện',
            },
          ]}
        />
      )}
      {typeFeedback.length !== 0 && feedbackType === 'Loại xe' && (
        <Table
          data={typeFeedback}
          onDataClick={clickOnRow}
          columns={[
            {
              key: 'id',
              label: 'Mã feedback',
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
            {
              key: 'bicycle_type',
              label: 'Mã loại xe',
            },
          ]}
        />
      )}
      {bicycleFeedback.length !== 0 && feedbackType === 'Xe' && (
        <Table
          data={bicycleFeedback}
          onDataClick={clickOnRow}
          columns={[
            {
              key: 'id',
              label: 'Mã feedback',
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
            {
              key: 'bicycle',
              label: 'Mã xe',
            },
          ]}
        />
      )}
    </div>
  );
}
