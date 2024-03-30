import Cart from "./Cart";
import {faCartShopping, faFile, faGlobe, faWallet} from "@fortawesome/free-solid-svg-icons";
import './Header.css'

export default function HomeHeader() {
    return (
        <div id={'Home-Header'}>
            <Cart title={'Doanh thu hôm nay'} content={'$53,000'} variability={'+55%'} increase={true} icon={faWallet}/>
            <Cart title={'Truy cập hôm nay'} content={'2,300'} variability={'+5%'} increase={true} icon={faGlobe}/>
            <Cart title={'Khách hàng mới'} content={'3,052'} variability={'-14'} increase={false} icon={faFile}/>
            <Cart title={'Tổng doanh thu'} content={'$173,000'} variability={'+8%'} increase={true} icon={faCartShopping}/>
        </div>
    )
}