import './index.css';
import Filter from './components/Filter';
import { compareTime, convertIsoToDdMmYyyy, } from './functions';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faCalendarDays, } from '@fortawesome/free-solid-svg-icons';
import React, { useLayoutEffect, useState, } from 'react';
import AddEvent from './components/AddEvent';
import PropTypes from 'prop-types';

export default function Event() {
  const [add, setAdd,] = useState(false);
  return (
    <div id={'Event'}>
      {renderBody(add, setAdd)}
    </div>
  );
}

function renderBody(add, setAdd) {
  const [eventList, setEventList,] = useState([]);

  useLayoutEffect(() => {
    fetch(process.env.REACT_APP_HOST_IP + '/events/', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access'),
        'Accept': 'application/json', // Sử dụng 'application/json' thay vì '*/*'
      },
    })
      .then(res => res.json())
      .then(data => setEventList(data.data))
      .catch(error => console.log(error));
  }, []);

  if(add === true)
    return <AddEvent setAdd={setAdd}/>;
  return (
    <div id={'Event-Body'}>
      <Filter setAdd={setAdd}/>
      {eventList?.map((event, index) => <EventItem key={index} event={event}/>)}
    </div>
  );
}

function EventItem({ event, }) {
  const [imageError, setImageError,] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <span className={'Event-Item'}>
      {
        imageError ? <img src={process.env.PUBLIC_URL + '/assets/images/category/image-input.png'}
          alt={'Ảnh lỗi'}/> :
          <img src={(process.env.REACT_APP_HOST_IMAGE_IP + event?.event_images[0]?.image)} alt={event.name}
            onError={handleImageError}/> }
      <div className={'event-name'}>{event.name}
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
};

EventState.propTypes = {
  event: PropTypes.object,
};