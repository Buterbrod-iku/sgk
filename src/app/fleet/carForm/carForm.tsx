import style from './carForm.module.scss';
import {onChangeDefault} from "@/components/utils/formUtils";
import {useState} from "react";
import InputButton from "@/app/requests/new/inputButton/inputButton";
import {useRouter} from "next/navigation";
import PostDrivers from "@/app/API/postDrivers";
import PostCar from "@/app/API/postCar";
import BlockInput from "@/app/requests/new/blockInput/blockInput";

export default function CarForm(props) {
    const close = (e) => {
        e.preventDefault()
        props.setOpenForm(!props.openForm)
    }

    const [values, setValues] = useState({});

    let link = useRouter()
    async function submitHandler (e) {
        e.preventDefault();

        await PostCar.sendRequest(values);

        props.setOpenForm(!props.openForm)
        setTimeout(() => {
            props.fun()
            link.push('/fleet');
        }, 100)
    }

    const selectArray = ["Грузовой", "Пассажирский", "Грузо-пассажирский"];

    return (
        <div className={style.main}>
            <div className={style.block}>

                <button className={style.close} onClick={close} style={{zIndex: '99'}}>+</button>

                <p>Регистрация автомобиля</p>

                <div>
                    <BlockInput gridName={"A"} type={'integer'} text={"Номер автомобиля"} placeholder={"а123аа"} require={true} name={"numberOfTransport"} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                    <BlockInput gridName={"A"} type={'select'} text={"Тип автомобиля"} placeholder={"Не выбран"} require={true} name={"title"} selectArray={selectArray} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                    <BlockInput gridName={"A"} type={'integer'} text={"Максимальное количество посадочных мест"} placeholder={""} require={true} name={"maxNumberOfPassengersInCar"} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                    <BlockInput gridName={"A"} type={'integer'} text={"Максимальная грузопдъёмность"} placeholder={""} require={true} name={"maxAmountOfCargoInCar"} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                    <BlockInput gridName={"A"} type={'text'} text={"Адрес автопарка"} placeholder={""} require={true} name={"location"} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                </div>

                <div className={style.button} onClick={submitHandler}>Создать автомобиль</div>
            </div>
        </div>
    )
}