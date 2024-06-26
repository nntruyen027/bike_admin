import './index.css';
import { compareTime, convertIsoToDdMmYyyy, } from './functions';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faCalendarDays, } from '@fortawesome/free-solid-svg-icons';
import React, { useLayoutEffect, useState, } from 'react';
import PropTypes from 'prop-types';
import { Loading, Pagination, } from '~/components';
import Modal from '~/components/Modal';
import { Create, Detail, Filter, } from '~/pages/Event/components';

export default function Event() {
  const [showCreateModal, setShowCreateModal,] = useState(false);
  const [eventList, setEventList,] = useState([]);
  const [currentPage, setCurrentPage,] = useState(1);
  const [totalPage, setTotalPage,] = useState(0);
  const [loading, setLoading,] = useState(true);
  const [filterData, setFilterData,] = useState([]);

  useLayoutEffect(() => {
    getList();
  }, [currentPage,]);

  const getList = () => {
    fetch(process.env.REACT_APP_HOST_IP + `/events/?page=${currentPage}&limit=6`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access'),
        Accept: 'application/json', // Sử dụng 'application/json' thay vì '*/*'
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEventList(data.data);
        setFilterData(data.data);
        setTotalPage(data.meta.total_pages);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const onCreate = ({ name, address, image, beginAt, endAt, text, }) => {
    const form = new FormData();
    form.append('name', name);
    form.append('address', address);
    form.append('poster', image);
    form.append('begin_at', beginAt);
    form.append('end_at', endAt);
    form.append('text', text);
    
    fetch(`${process.env.REACT_APP_HOST_IP}/events/`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access'),
        Accept: 'application/json',
      },
      body: form,
    })
      .then((res) => res.json())
      .then(() => {
        alert('Đã thêm thành công sự kiện');
        setShowCreateModal(false);
        getList();
      })
      .catch((err) => alert(err));
  };

  return (
    <div id={'Event'}>
      {loading && <Loading/>}
      <Filter setFilterData={setFilterData} originData={eventList} onShowCreate={() => setShowCreateModal(!showCreateModal)}/>
      {showCreateModal && <Modal title={'Thêm sự kiện'} setShow={() => setShowCreateModal(!showCreateModal)}>
        <Create onCreate={onCreate}/>
      </Modal>}
      {renderBody(eventList, getList, filterData)}
      <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={setCurrentPage}/>
    </div>
  );
}

function renderBody(eventList, getList, filterData) {

  return (
    <div id={'Event-Body'}>
      {filterData?.map((event, index) => <EventItem key={index} event={event} getList={getList}/>)}
    </div>
  );
}

function EventItem({ event, getList, }) {
  const [imageError, setImageError,] = useState(false);
  const [showDetailModal, setShowDetailModal,] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const onUpdate = ({ id, name, image, address, beginAt, endAt, text, }) => {
    const form = new FormData();
    form.append('name', name);
    form.append('address', address);
    form.append('poster', image);
    form.append('begin_at', beginAt);
    form.append('end_at', endAt);
    form.append('text', text);

    console.log(beginAt, endAt);

    fetch(`${process.env.REACT_APP_HOST_IP}/events/${id}/`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access'),
        Accept: 'application/json',
      },
      body: form,
    })
      .then((res) => res.json())
      .then(() => {
        setShowDetailModal(!showDetailModal);
        getList();
      })
      .catch((err) => alert(err));
  };

  const onDelete = (id) => {
    fetch(process.env.REACT_APP_HOST_IP + '/events/' + id + '/', {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access'),
        Accept: 'application/json', // Sử dụng 'application/json' thay vì '*/*'
      },
    })
      .then(() => {
        getList();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {showDetailModal &&
        <Modal setShow={() => setShowDetailModal(!showDetailModal)} title={'Chi tiết sự kiện'}>
          <Detail id={event?.id} onDelete={onDelete} onUpdate={onUpdate}/>
        </Modal>}
      <span className={'Event-Item'} onClick={() => setShowDetailModal(!showDetailModal)}>
        {
          imageError ? <img src={process.env.PUBLIC_URL + '/assets/images/category/image-input.png'}
            alt={'Ảnh lỗi'}/> :
            <img src={(process.env.REACT_APP_HOST_IMAGE_IP + '' + event?.poster)} alt={event.name}
              onError={handleImageError}/> }
        <div className={'event-name'}>
          <p>{event.name}</p>
          {<EventState event={event} />}
        </div>
        <div className={'event-times'}>
          <FontAwesomeIcon style={{
            marginRight: '10px',
            color: 'rgba(0, 146, 82, 1)',
          }} icon={faCalendarDays} />
          {`Thời gian ${convertIsoToDdMmYyyy(event.begin_at)} - 
                    ${convertIsoToDdMmYyyy(event.end_at)}`}
        </div>
      </span>
    </>
  );
}

function EventState({ event, }) {
  const compare = compareTime(event.begin_at, event.end_at);
  if(compare<0) {
    return (<div className={'event-state upcoming'}>
            Sắp diễn ra
    </div>);
  }
  else if(compare === 0) {
    return (<div className={'event-state ongoing'}>
            Đang diễn ra
    </div>);
  }
  else {
    return (<div className={'event-state finished'}>
            Đã kết thúc
    </div>);
  }
}

EventItem.propTypes = {
  event: PropTypes.object,
  getList: PropTypes.func,
};

EventState.propTypes = {
  event: PropTypes.object,
};