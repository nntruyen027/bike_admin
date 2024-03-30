import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default function Cart({title, content, variability, icon, increase}) {
    return (
        <div id={'Cart'}>
            <div>
                <div className={'main'}>
                    <div className={'title'}>{title}</div>
                    <span className={'content'}>{content}</span>
                    <span className={increase ? 'increase variability' : 'reduce variability'}>{variability}</span>
                </div>
                <span className={'icon-container'}>
                    <FontAwesomeIcon className={'icon'} icon={icon}/>
                </span>
            </div>
        </div>
    )
}