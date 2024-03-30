import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots, faScrewdriverWrench, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import './Header.css'
import {useState} from "react";


export default function FeedbackHeader() {
    const [currentTab, setCurrentTab] = useState('Đánh giá')

    return (
        <div id={'Feedback-Header'} >
            <HeaderItem title={'Đánh giá'} icon={faCommentDots} currentTab={currentTab}
                        setCurrentTab={setCurrentTab}/>
            <HeaderItem title={'Báo cáo'} icon={faTriangleExclamation} currentTab={currentTab}
                        setCurrentTab={setCurrentTab}/>
            <HeaderItem title={'Thu hồi xe'} icon={faScrewdriverWrench} currentTab={currentTab}
                        setCurrentTab={setCurrentTab}/>
        </div>
    )
}

function HeaderItem({title, icon, currentTab, setCurrentTab}) {
    function handleClick (e)  {
        setCurrentTab(title)
    }

    return (
        <span className={currentTab === title  ? 'Header-Item selected' : 'Header-Item'}
              onClick={handleClick}>
            <FontAwesomeIcon className={'icon'} icon={icon} />
            <span>{title}</span>
        </span>
    )
}