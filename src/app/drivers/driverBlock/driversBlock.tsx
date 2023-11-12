import style from './driversBlock.module.scss';
import Link from "next/link";

export default function DriversBlock({info}) {
    return (
        <>
            <Link href={'/openDrivers'} className={style.link}>
                <div className={style.main}>
                    <p className={style.name}>{info.fioName}</p>
                    <p className={style.phone}>{info.phone}</p>
                    <p className={style.phone}>{info.email}</p>
                    <button className={style.button}>Подробнее</button>
                </div>
            </Link>
        </>
    )
}