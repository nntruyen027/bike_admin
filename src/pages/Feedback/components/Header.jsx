import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faScrewdriverWrench,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import React from "react";
import PropTypes from "prop-types";

export default function FeedbackHeader({ currentTab, setCurrentTab }) {
  return (
    <div id={"Feedback-Header"}>
      <HeaderItem
        title={"Đánh giá"}
        icon={faCommentDots}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <HeaderItem
        title={"Báo cáo"}
        icon={faTriangleExclamation}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <HeaderItem
        title={"Thu hồi xe"}
        icon={faScrewdriverWrench}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
    </div>
  );
}

function HeaderItem({ title, icon, currentTab, setCurrentTab }) {
  function handleClick() {
    setCurrentTab(title);
  }

  return (
    <span
      className={currentTab === title ? "Header-Item selected" : "Header-Item"}
      onClick={handleClick}
    >
      <FontAwesomeIcon className={"icon"} icon={icon} />
      <span>{title}</span>
    </span>
  );
}

FeedbackHeader.propTypes = {
  currentTab: PropTypes.string,
  setCurrentTab: PropTypes.func,
};

HeaderItem.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.any,
  currentTab: PropTypes.string,
  setCurrentTab: PropTypes.func,
};
