'use client'

import style from "./mainInfoRequest.module.scss";
import InfoBlock from "@/app/requests/[id]/infoBlock/infoBlock";
import {useEffect, useState, Fragment} from "react";
import {onChangeDefault, onListChange} from "@/app/requests/utils/formUtils";

export default function MainInfoRequest(props) {
    const [fullPassenger, setFullPassenger] = useState(false);
    const [fullPoint, setFullPoint] = useState(false);
    
    
    useEffect(() =>{
        if(props.edit){
            setFullPassenger(true);
            setFullPoint(true);
        } else {
            setFullPassenger(false);
            setFullPoint(false);
        }
    }, [props.edit])

    
    // Вывод измененных значений
    useEffect(() =>{
        console.log(props.values);
    }, [props.values])

    // Short onChangeDefault()
    const oCD = (e) => {
        onChangeDefault(e, props.values, props.setValFunc);
    }

    return (
        <>
            <div className={style.infoBlock} style={props.openInfo ? {display: "block"} : {display: "none"}}>
                <InfoBlock title="Структурное подразделение" name="devisionName" onChange={(e) => oCD(e)} info={props.allInfo?.orders[0].order.devisionName} edit={props.edit}/>
                <InfoBlock title="Адрес подачи авто" name="carStartPoint_address" onChange={(e) => oCD(e)} info={props.allInfo?.orders[0].route.loadingAddress.address} edit={props.edit}/>
                {/*превести из unix time*/}
                <InfoBlock title="Подача авто" name="carStartPoint_dateTime" onChange={(e) => oCD(e)} dataTime={props.allInfo?.orders[0].date.loadingTime} edit={props.edit}/>

                <InfoBlock title="Остановки" close={true} bool={fullPoint} setBool={setFullPoint} edit={props.edit}/>

                {
                    props.allInfo?.orders.map((order, index) => (
                        <div key={index} style={fullPoint ? {display: "block"} : {display: "none"}}>
                            <div className={style.openInfo} data-section-id={"destination_" + index}>
                                <InfoBlock title="Адрес назначения авто" name="destinationPoint_address" dataSectionID={"dest_" + index} info={order.route.unloadingAddress.address} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "destinationPoints", props.setValFunc)}/>
                                <InfoBlock title="Прибытие авто" name="destinationPoint" dataSectionID={"dest_" + index} dataTime={order.date.unloadingTime} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "destinationPoints", props.setValFunc)}/>
                                <InfoBlock title="Время ожидания" name="destinationPoint_waitingTime" dataSectionID={"dest_" + index} waiting={true} info={order.date.unloadingWaiting} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "destinationPoints", props.setValFunc)}/>
                            </div>
                            {
                                index === props.allInfo?.orders.length ? '' : <hr className={style.hr}/>
                            }
                        </div>))
                }

                <InfoBlock title="Пассажиры" close={true} bool={fullPassenger} setBool={setFullPassenger} edit={props.edit}/>
                {
                    props.allInfo?.orders[0].order.passengers.map((passenger, index) => (
                        <div key={index} className={style.openInfo} data-section-id={"passenger_" + index}  style={fullPassenger ? {display: "block"} : {display: "none"}}>
                            <InfoBlock title="ФИО сотрудника" name="passengersInfo_fullName" dataSectionID={"passenger_" + index} info={passenger.fullName} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>
                            <InfoBlock title="Телефон для оповещения" name="passengersInfo_phoneNumber" dataSectionID={"passenger_" + index} phone={true} info={passenger.phoneNumber} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>
                        </div>))
                }

            </div>

            <div className={style.infoBlock} style={props.openInfo ? {display: "none"} : {display: "block"}}>
                <InfoBlock title="Общий объём багажа" onChange={(e) => oCD(e)} name="cargoWeight" info={props.allInfo?.route.cargoInRoute} edit={props.edit}/>
                <InfoBlock title="Количество человек" onChange={(e) => oCD(e)} name="passengersAmount" info={props.allInfo?.route.passengersInRoute} edit={props.edit}/>
                <InfoBlock title="Комментарий" onChange={(e) => oCD(e)} name="comment" info={props.allInfo?.route.comment} edit={props.edit}/>
            </div>
        </>
    )
}