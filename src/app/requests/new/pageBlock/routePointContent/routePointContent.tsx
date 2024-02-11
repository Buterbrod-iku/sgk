import style from "./routePointContent.module.scss";
import TitleBlock from "@/app/requests/new/titleBlock/titleBlock";
import BlockInput from "@/app/requests/new/blockInput/blockInput";
import {onChangeDefault, onListChange} from "@/components/utils/formUtils";
import {useEffect, useState} from "react";

export const RoutePointContent = (props) => {
    const [routePointContent, setRoutePointContent] = useState({
        "index": props.index,
        "passengers": props.passengersContent,
    });


    useEffect(() => {
        let obj = props.values
        obj.push(routePointContent)
        props.setValues(obj)
    }, [routePointContent])

    return (
        <div className={style.mainTest} style={props.style}>
            <TitleBlock text={"Сведения о пункте"} fontSize={"16px"}/>

            <div className={style.pos}>
                <BlockInput gridName={"A"} type={'text'} text={"Адрес подачи"} placeholder={"Барнаул..."} require={true} name={"address"} onChange={(e) => onChangeDefault(e, routePointContent, setRoutePointContent)}/>

                {
                    props.index === 0 ?
                        (<>
                            <BlockInput gridName={"B"} type={'date'} text={"Дата подачи"} require={false} name={"date"} onChange={(e) => onChangeDefault(e, routePointContent, setRoutePointContent)}/>
                            <BlockInput gridName={"C"} type={'time'} text={"Время подачи"} require={false} name={"time"} onChange={(e) => onChangeDefault(e, routePointContent, setRoutePointContent)}/>
                            <BlockInput gridName={"D"} type={'time'} text={"Время ожидания"} require={false} name={"wait"} onChange={(e) => onChangeDefault(e, routePointContent, setRoutePointContent)}/>
                            <BlockInput gridName={"E"} type={'checkbox'} text={"Выбрать день автоматически"} require={false} name={"check"} onChange={(e) => onChangeDefault(e, routePointContent, setRoutePointContent)}/>
                        </>)
                        : null
                }
            </div>
        </div>
    )
}