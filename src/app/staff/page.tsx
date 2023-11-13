'use client'

import style from './staff.module.scss';
import Link from "next/link";
import car from '../../assets/images/fleet/garage_car_4484.png'
import driver from '../../assets/images/fleet/steeringwheel_theapplication_direccio_2925.png'

export default function Staff() {

    return (
        <div className={style.main}>
            <div className={style.block}>
                {/*<h3 className={style.title}>asdkjasdkj</h3>*/}

                <div style={{display: "flex"}}>
                    <Link href={"/drivers"} className={style.left}>
                        <div className={style.switch}>
                            <img src={driver.src} className={style.image}/>
                            <p>Водители</p>
                        </div>
                    </Link>

                    <Link href={"/fleet"} className={style.right}>
                        <div className={style.switch}>
                            <img src={car.src} className={style.image}/>
                            <p>Автомобили</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}