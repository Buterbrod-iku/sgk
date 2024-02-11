import style from "./PassengersContent.module.scss";
import TitleBlock from "@/app/requests/new/titleBlock/titleBlock";
import BlockInput from "@/app/requests/new/blockInput/blockInput";
import {onChangeDefault} from "@/components/utils/formUtils";
import {useEffect, useState} from "react";

export const PassengersContent = (props) => {
    const selectArray = ["Грузовой", "Пассажирский", "Грузо-пассажирский"];
    const [passengersContent, setPassengersContent] = useState({
        "index": props.index,
    });

    useEffect(() => {
        let obj = props.values
        obj.push(passengersContent)
        props.setValues(obj)
    }, [passengersContent])
    
    return (
        <div className={style.mainTest} style={props.style}>
            <TitleBlock text={"Данные пассажира"} fontSize={"16px"}/>

            <div className={style.pos}>
                <BlockInput gridName={"A"} type={'text'} text={"ФИО сотрудника"} placeholder={"Фамилия Имя Отчество"} require={true} name={"name"} onChange={(e) => onChangeDefault(e, passengersContent, setPassengersContent)}/>
                <BlockInput gridName={"B"} type={'tel'} text={"Телефонный номер"} placeholder={"+7 (000) 000-00-00"} require={true} name={"contact"} onChange={(e) => onChangeDefault(e, passengersContent, setPassengersContent)}/>
                <BlockInput gridName={"C"} type={'select'} text={"Пункт доставки"} placeholder={"Не выбран"} selectArray={selectArray} require={true} name={"endIndex"} onChange={(e) => onChangeDefault(e, passengersContent, setPassengersContent)}/>
            </div>
        </div>
    )
}