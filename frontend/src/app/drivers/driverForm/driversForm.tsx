import style from './driversForm.module.scss';
import {useState} from "react";
import BlockInput from "@/app/requests/new/blockInput/blockInput";
import {onChangeDefault} from "@/components/utils/formUtils";
import InputButton from "@/app/requests/new/inputButton/inputButton";
import PostDrivers from "@/app/API/postDrivers";
import {useRouter} from "next/navigation";
import {XMLParser} from "fast-xml-parser";
import getCoordsByAddress from "@/app/API/geocoder";
import PostCar from "@/app/API/postCar";

export default function DriversForm(props) {
    const close = (e) => {
        e.preventDefault()
        props.setOpenForm(!props.openForm)
    }

    const [values, setValues] = useState({
        "timetable": [
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F",
            "F"
        ]
    });

    const parser = new XMLParser();
    const rever = async (start) => {
        let result = {
            ...start
        }
        let loc = await getCoordsByAddress(start.location, parser)
        result["latitude"] = loc.lats;
        result["longitude"] = loc.long;

        return result
    }

    let link = useRouter()
    async function submitHandler (e) {
        e.preventDefault();

        await console.log(await rever(values))

        await PostDrivers.sendRequest(await rever(values));

        props.setOpenForm(!props.openForm)
        setTimeout(() => {
            props.fun()
            link.push('/drivers');
        }, 100)
    }

    return (
        <div className={style.main}>
            <div className={style.block}>

                <button className={style.close} onClick={close} style={{zIndex: '99'}}>+</button>

                <p>Регистрация водителя</p>

                <div>
                    <BlockInput gridName={"A"} type={'text'} text={"ФИО водителя"} placeholder={""} require={true} name={"name"} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                    <BlockInput gridName={"A"} type={'tel'} text={"Номер телефона"} placeholder={""} require={true} name={"phoneNumber"} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                    <BlockInput gridName={"A"} type={'text'} text={"Почта водителя"} placeholder={""} require={true} name={"mail"} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                    <BlockInput gridName={"A"} type={'text'} text={"Категория"} placeholder={"С, В, Е..."} require={true} name={"category"} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                    <BlockInput gridName={"A"} type={'text'} text={"Адрес автопарка"} placeholder={""} require={true} name={"location"} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                </div>

                <div className={style.button} onClick={submitHandler}>Создать водителя</div>
            </div>
        </div>
    )
}