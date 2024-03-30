import './index.css'
import Header from "./Header";
import {useState} from "react";

export default function Feedback() {
    const [show, setShow] = useState(false)

    const handleClick = (e) => {
        if(show)
            setShow(false)
        else
            setShow(true)

        console.log(show)
    }

    function changValueButton() {
        if(show) {
            return <button onClick={handleClick}>Nhất để ẩn</button>
        } else {
            return <button onClick={handleClick}>Nhất để hiện</button>
        }
    }

    return (
        <div id={'Feedback'} >
            {changValueButton()}
        </div>
    )
}