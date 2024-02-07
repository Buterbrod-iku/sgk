import style from "./CargoContent.module.scss";
import TitleBlock from "@/app/requests/new/titleBlock/titleBlock";
import BlockInput from "@/app/requests/new/blockInput/blockInput";

export const CargoContent = (props) => {
    const selectArray = ["Грузовой", "Пассажирский", "Грузо-пассажирский"];

    return (
        <div className={style.mainTest} style={props.style}>
            <TitleBlock text={"Данные о грузах"} fontSize={"16px"}/>

            <div className={style.pos}>
                <BlockInput gridName={"A"} type={'text'} text={"Характер груза"} placeholder={"Описание..."} require={false} />
                <BlockInput gridName={"B"} type={'integer'} text={"Вес груза"} placeholder={"0 кг"} require={false} />
                <BlockInput gridName={"C"} type={'integer'} text={"Объем груза"} placeholder={"0 л"} require={false} />
                <BlockInput gridName={"D"} type={'select'} text={"Пункт доставки"} placeholder={"Не выбран"} selectArray={selectArray} require={false} />
            </div>
        </div>
    )
}