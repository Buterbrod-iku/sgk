'use client'

import style from "./mainInfoRequest.module.scss";
import InfoBlock from "@/app/requests/[id]/infoBlock/infoBlock";
import {useEffect, useState, Fragment} from "react";
import {onChangeDefault, onListChange} from "@/app/requests/utils/formUtils";
import {phoneFormatter} from "@/app/requests/utils/formUtils";

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

    // Скопировано из infoBlock.tsx // TODO: Прибраться
    const addZero = (dateTime, type) => {
        if(type === 'date'){
            return dateTime.getUTCDate() < 10 ? '0' + dateTime.getUTCDate() : dateTime.getUTCDate()
        } else if(type === 'month'){
            return dateTime.getUTCMonth() < 10 ? '0' + dateTime.getUTCMonth() : dateTime.getUTCMonth()
        } else {
            return '00'
        }
    }
    const getDate = (_date) => {
        const dateTime = new Date(_date * 1000);
        let date = addZero(dateTime, 'date') + '.' + addZero(dateTime, 'month') + '.' + dateTime.getUTCFullYear();
        let dateInput = dateTime.getUTCFullYear() + '-' +  addZero(dateTime, 'month') + '-' + addZero(dateTime, 'date') ;
        return dateInput;
    }
    const getTime = (_date) => {
        const dateTime = new Date(_date * 1000);
        let time = (dateTime.getUTCHours() < 10 ? '0' + dateTime.getUTCHours() : dateTime.getUTCHours()) + ":" + (dateTime.getUTCMinutes() < 10 ? '0' + dateTime.getUTCMinutes() : dateTime.getUTCMinutes());
        return time;
    }
    const Waiting = (time) => {
        if(time < 60){
            return time
        } else {
            let hours = Math.floor(time / 60)
            return (hours < 10 ? '0' + hours : hours).toString() + ':' +  ((time - hours * 60) < 10 ? '0' + (time - hours * 60) : (time - hours * 60)).toString()
        }
    }
    
    


    const [firstCreated, setFirstCreated] = useState(true);
    if (firstCreated) {
        setFirstCreated(false);
       
        props.setValFunc({
            destinationPoints: {},
            passengersInfo: {},
            devisionName: props.allInfo?.orders[0].order.devisionName,
            carStartPoint_address: props.allInfo?.orders[0].route.loadingAddress.address,
            carStartPoint_dateTime_date: getDate(props.allInfo?.orders[0].date.loadingTime),
            carStartPoint_dateTime_time: getTime(props.allInfo?.orders[0].date.loadingTime),
            cargoWeight: props.allInfo?.route.cargoInRoute,
            passengersAmount: props.allInfo?.route.passengersInRoute
        });

        props.allInfo?.orders.map((order, index) => (
            props.setValFunc(prev => {
                return {...prev,
                    destinationPoints: {...prev.destinationPoints,
                        ["dest_" + index]: {
                            "destinationPoint_address": order.route.unloadingAddress.address,
                            "destinationPoint_date": getDate(order.date.unloadingTime),
                            "destinationPoint_time": getTime(order.date.unloadingTime),
                            "destinationPoint_waitingTime": Waiting(order.date.unloadingWaiting)
                        },
                    },
                }
            })))




        props.allInfo?.orders[0].order.passengers.map((passenger, index) => (
            props.setValFunc(prev => {
                return {...prev,
                    passengersInfo: {...prev.passengersInfo,
                        ["passenger_" + index]: {
                            "passengersInfo_fullName": passenger.fullName,
                            "passengersInfo_phoneNumber": phoneFormatter(passenger.phoneNumber)
                        },
                    },
                }
            })))
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