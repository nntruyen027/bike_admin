import React, { useEffect, useState } from "react";
import "./index.css";
import PropTypes from "prop-types";

export default function Detail({ id }) {
  const [feedback, setFeedback] = useState(null);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST_IP}/feedbacks/events/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
      method: "GET",
    })
      .then((res) =>
        res.status === 200 ? res.json() : Promise.reject(res.json()),
      )
      .then((data) => {
        setFeedback(data.data);
        getEvent(data.data.event);
      })
      .catch((err) => alert(err));
  }, []);

  const getEvent = (id) => {
    fetch(`${process.env.REACT_APP_HOST_IP}/events/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
      method: "GET",
    })
      .then((res) =>
        res.status === 200 ? res.json() : Promise.reject(res.json()),
      )
      .then((data) => {
        setEvent(data.data);
      })
      .catch((err) => alert(err));
  };

  return (
    <div id="feedback-detail-component">
      <div className="feedback-details">
        <p>
          <strong>Tiêu đề:</strong> {feedback?.title}
        </p>
        <p>
          <strong>Nội dung:</strong> {feedback?.text}
        </p>
        <p>
          <strong>Người tạo:</strong> {feedback?.user}
        </p>
        <p>
          <strong>Sự kiện:</strong> {event?.name}
        </p>
        <p>
          <strong>Ngày tạo:</strong> {feedback?.created_at}
        </p>
      </div>
      <div className="feedback-images">
        {feedback?.feedback_images?.map((item) => (
          <img
            key={item.src}
            alt={item.alt}
            src={`${process.env.REACT_APP_HOST_IMAGE_IP}/${item.src}`}
          />
        ))}
      </div>
    </div>
  );
}

Detail.propTypes = {
  id: PropTypes.func,
};
