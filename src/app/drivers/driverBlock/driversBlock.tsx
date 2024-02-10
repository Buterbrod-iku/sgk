import style from './driversBlock.module.scss';
import {useRouter} from "next/navigation";

export default function DriversBlock({id, info}) {
    const router = useRouter();

    const openRequestHandler = e => {
        router.push(`/drivers/${id}`);
    };

    return (
        <>
            <div onClick={openRequestHandler} className={style.link}>
                <div className={style.main}>
                    <p className={style.name}>{info.lastName + " " + info.firstName}</p>
                    <p className={style.phone}>Категория - {info.category}</p>
                    <button className={style.button}>Подробнее</button>
                </div>
            </div>
        </>
    )
}