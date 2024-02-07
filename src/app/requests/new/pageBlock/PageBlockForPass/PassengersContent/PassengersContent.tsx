import style from "./PassengersContent.module.scss";
import TitleBlock from "@/app/requests/new/titleBlock/titleBlock";
import BlockInput from "@/app/requests/new/blockInput/blockInput";

export const PassengersContent = (props) => {
    const selectArray = ["Грузовой", "Пассажирский", "Грузо-пассажирский"];
    
    return (
        <div className={style.mainTest} style={props.style}>
            <TitleBlock text={"Данные пассажира"} fontSize={"16px"}/>

            <div className={style.pos}>
                <BlockInput gridName={"A"} type={'text'} text={"ФИО сотрудника"} placeholder={"Фамилия Имя Отчество"} require={true} />
                <BlockInput gridName={"B"} type={'tel'} text={"Телефонный номер"} placeholder={"+7 (000) 000-00-00"} require={true} />
                <BlockInput gridName={"C"} type={'select'} text={"Пункт доставки"} placeholder={"Не выбран"} selectArray={selectArray} require={true} />
            </div>
        </div>
    )
}