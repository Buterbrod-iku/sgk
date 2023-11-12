import style from './carBlock.module.scss';
import Link from "next/link";

export default function CarBlock({info}) {
    return (
        <>
            <Link href={'/openCar'} className={style.link}>
                <div className={style.main}>
                        <p className={style.name}>{info.fioName}</p>
                        <p className={style.phone}>{info.phone}</p>
                        <hr/>
                        <p className={style.car} style={{marginTop: '15px'}}>{info.carName}</p>
                        <p className={style.car}>{info.carNumber}</p>
                        <p className={style.car}>{info.price}</p>

                        <button className={style.button}>Подробнее</button>
                </div>
            </Link>
        </>

    )
}