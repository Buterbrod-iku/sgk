import style from './carBlock.module.scss';
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function CarBlock({id, info}) {
    const router = useRouter();

    const openRequestHandler = e => {
        router.push(`/fleet/${id}`);
    };

    return (
        <>
            <div onClick={openRequestHandler} className={style.link}>
                <div className={style.main}>
                        <p className={style.name}>{info.numberOfTransport}</p>
                        <p className={style.phone}>{info.title}</p>
                        <hr/>
                        <p className={style.car} style={{marginTop: '15px'}}>{info.location}</p>

                        <button className={style.button}>Подробнее</button>
                </div>
            </div>
        </>

    )
}