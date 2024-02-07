import style from "./routePointContent.module.scss";
import TitleBlock from "@/app/requests/new/titleBlock/titleBlock";
import BlockInput from "@/app/requests/new/blockInput/blockInput";

export const RoutePointContent = (props) => {
    return (
        <div className={style.mainTest} style={props.style}>
            <TitleBlock text={"Сведения о пункте"} fontSize={"16px"}/>

            <div className={style.pos}>
                <BlockInput gridName={"A"} type={'text'} text={"Адрес подачи"} placeholder={"Барнаул..."} require={true} />

                <BlockInput gridName={"B"} type={'date'} text={"Дата подачи"} placeholder={"Комментарий к заявке"} require={false} />
                <BlockInput gridName={"C"} type={'time'} text={"Время подачи"} placeholder={"Комментарий к заявке"} require={false} />
                <BlockInput gridName={"D"} type={'time'} text={"Время ожидания"} placeholder={"Комментарий к заявке"} require={false} />
                <BlockInput gridName={"E"} type={'checkbox'} text={"Выбрать день автоматически"} require={false} />
            </div>
        </div>
    )
}