import style from './carBlock.module.scss';
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function CarBlock({id, info}) {
    const router = useRouter();

    const openRequestHandler = e => {
        router.push(`/fleet/${id}`);
    };

    const [type, setType] = useState("")
    useEffect(() => {
        if (info.title === "cargo"){
            setType( "Грузовой")
        }
        else if(info.title === "human"){
            setType( "Пассажирский")
        }
        else if(info.title === "all"){
            setType( "Грузо-пассажирский")
        }
    }, [])


    return (
        <>
            <div onClick={openRequestHandler} className={style.link}>
                <div className={style.main}>
                        <p className={style.name}>{info.name}</p>
                        <p className={style.phone}>{type}</p>
                        <hr/>
                        <p className={style.car} style={{marginTop: '15px'}}>{info.numberOfTransport}</p>

                        <button className={style.button}>Подробнее</button>
                </div>
            </div>
        </>

    )
}