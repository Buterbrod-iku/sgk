import style from "./CargoContent.module.scss";
import TitleBlock from "@/app/requests/new/titleBlock/titleBlock";
import BlockInput from "@/app/requests/new/blockInput/blockInput";
import {onChangeDefault} from "@/components/utils/formUtils";
import {useEffect, useState} from "react";

export const CargoContent = (props) => {
    const selectArray = ["Грузовой", "Пассажирский", "Грузо-пассажирский"];
    const [cargoContent, setCargoContent] = useState({
        "index": props.index,
    });

    useEffect(() => {
        let obj = props.values
        obj.push(cargoContent)
        props.setValues(obj)
    }, [cargoContent])


    return (
        <div className={style.mainTest} style={props.style}>
            <TitleBlock text={"Данные о грузах"} fontSize={"16px"}/>

            <div className={style.pos}>
                <BlockInput gridName={"A"} type={'text'} text={"Характер груза"} placeholder={"Описание..."} require={false} name={"description"} onChange={(e) => onChangeDefault(e, cargoContent, setCargoContent)}/>
                <BlockInput gridName={"B"} type={'integer'} text={"Вес груза"} placeholder={"0 кг"} require={false} name={"weight"} onChange={(e) => onChangeDefault(e, cargoContent, setCargoContent)}/>
                <BlockInput gridName={"C"} type={'integer'} text={"Объем груза"} placeholder={"0 л"} require={false} name={"volume"} onChange={(e) => onChangeDefault(e, cargoContent, setCargoContent)}/>
                <BlockInput gridName={"D"} type={'select'} text={"Пункт доставки"} placeholder={"Не выбран"} selectArray={selectArray} require={false} name={"endIndex"} onChange={(e) => onChangeDefault(e, cargoContent, setCargoContent)}/>
            </div>
        </div>
    )
}