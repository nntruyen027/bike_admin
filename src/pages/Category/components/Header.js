import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faLocationDot, faPersonBiking, faTriangleExclamation, faUser} from "@fortawesome/free-solid-svg-icons";
import './Header.css'


export default function CategoryHeader({currentTab, setCurrentTab, setAdd}) {
    return (
        <div id={'Category-Header'} >
            <HeaderItem title={'Loại xe'} icon={faPersonBiking} currentTab={currentTab}
                        setCurrentTab={setCurrentTab} setAdd={setAdd}/>
            <HeaderItem title={'Điểm giao dịch'} icon={faLocationDot} currentTab={currentTab}
                        setCurrentTab={setCurrentTab} setAdd={setAdd}/>
            <HeaderItem title={'Loại khách hàng'} icon={faUser} currentTab={currentTab}
                        setCurrentTab={setCurrentTab} setAdd={setAdd}/>
            <HeaderItem title={'Loại báo cáo'} icon={faTriangleExclamation} currentTab={currentTab}
                        setCurrentTab={setCurrentTab} setAdd={setAdd}/>
            <HeaderItem title={'Loại thông báo'} icon={faBell} currentTab={currentTab}
                        setCurrentTab={setCurrentTab} setAdd={setAdd}/>
        </div>
    )
}

function HeaderItem({title, icon, currentTab, setCurrentTab, setAdd}) {
    function handleClick (e)  {
        setCurrentTab(title)
        setAdd(false)
    }

    return (
        <span className={currentTab === title  ? 'Header-Item selected' : 'Header-Item'}
              onClick={handleClick}>
            <FontAwesomeIcon className={'icon'} icon={icon} />
            <span>{title}</span>
        </span>
    )
}