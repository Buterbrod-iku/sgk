import style from './driversForm.module.scss';
import {useState} from "react";
import BlockInput from "@/app/requests/new/blockInput/blockInput";
import {onChangeDefault} from "@/components/utils/formUtils";
import InputButton from "@/app/requests/new/inputButton/inputButton";
import PostDrivers from "@/app/API/postDrivers";
import {useRouter} from "next/navigation";

export default function DriversForm(props) {
    const close = (e) => {
        e.preventDefault()
        props.setOpenForm(!props.openForm)
    }
    const [values, setValues] = useState({});


    let link = useRouter()
    async function submitHandler (e) {
        e.preventDefault();

        await PostDrivers.sendRequest(values);

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
                    <BlockInput gridName={"A"} type={'text'} text={"Фамилия водителя"} placeholder={""} require={true} name={"firstName"} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                    <BlockInput gridName={"A"} type={'text'} text={"Имя водителя"} placeholder={""} require={true} name={"lastName"} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                    <BlockInput gridName={"A"} type={'text'} text={"Категория"} placeholder={"С, В, Е..."} require={true} name={"category"} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                    <BlockInput gridName={"A"} type={'text'} text={"Адрес автопарка"} placeholder={""} require={true} name={"location"} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                </div>

                <div className={style.button} onClick={submitHandler}>Создать водителя</div>
            </div>
        </div>
    )
}