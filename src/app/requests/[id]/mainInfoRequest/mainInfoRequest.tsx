'use client'

import style from "./mainInfoRequest.module.scss";
import InfoBlock from "@/app/requests/[id]/infoBlock/infoBlock";
import {useEffect, useState, Fragment} from "react";
import {onChangeDefault, onListChange} from "@/components/utils/formUtils";

export default function MainInfoRequest({allInfo, ...props}) {
    const [fullPassenger, setFullPassenger] = useState(false);
    const [fullPoint, setFullPoint] = useState(false);
    const [fullCargo, setFullCargo] = useState(false);
    
    
    useEffect(() =>{
        if(props.edit){
            setFullPassenger(true);
            setFullPoint(true);
            setFullCargo(true);
        } else {
            setFullPassenger(false);
            setFullPoint(false);
            setFullCargo(false);
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

    // const [firstCreated, setFirstCreated] = useState(true);
    // if (firstCreated) {
    //     setFirstCreated(false);
    //
    //     props.setValFunc({
    //         destinationPoints: {},
    //         passengersInfo: {},
    //         devisionName: props.allInfo?.orders[0]?.order?.devisionName,
    //         carStartPoint_address: props.allInfo?.orders[0].route.loadingAddress.address,
    //         carStartPoint_dateTime_date: getDate(props.allInfo?.orders[0].date.loadingTime),
    //         carStartPoint_dateTime_time: getTime(props.allInfo?.orders[0].date.loadingTime),
    //         cargoWeight: props.allInfo?.route.cargoInRoute,
    //         passengersAmount: props.allInfo?.route.passengersInRoute
    //     });
    //
    //     props.allInfo?.orders.map((order, index) => (
    //         props.setValFunc(prev => {
    //             return {...prev,
    //                 destinationPoints: {...prev.destinationPoints,
    //                     ["dest_" + index]: {
    //                         "destinationPoint_address": order.route.unloadingAddress.address,
    //                         "destinationPoint_date": getDate(order.date.unloadingTime),
    //                         "destinationPoint_time": getTime(order.date.unloadingTime),
    //                         "destinationPoint_waitingTime": Waiting(order.date.unloadingWaiting)
    //                     },
    //                 },
    //             }
    //         })))
    //
    //     props.allInfo?.orders[0].order.passengers.map((passenger, index) => (
    //         props.setValFunc(prev => {
    //             return {...prev,
    //                 passengersInfo: {...prev.passengersInfo,
    //                     ["passenger_" + index]: {
    //                         "passengersInfo_fullName": passenger.fullName,
    //                         "passengersInfo_phoneNumber": phoneFormatter(passenger.phoneNumber)
    //                     },
    //                 },
    //             }
    //         })))
    // }

    // пережиток плохого кода
    const from = (index) => {
        switch (index){
            case 0:
                return "Новосибирск"
            case 1:
                return "Тальменка"
            case 2:
                return "Барнаул"
            case 3:
                return "Тальменка"
            case 4:
                return "Тальменка"
        }
    }

    const to = (index) => {
        switch (index){
            case 0:
                return "Бийск"
            case 1:
                return "Бийск"
            case 2:
                return "Бийск"
            case 3:
                return "Новоалтайск"
            case 4:
                return "Новоалтайск"
        }
    }

    return (
        <>
            <div className={style.infoBlock} style={props.openInfo ? {display: "block"} : {display: "none"}}>
                <InfoBlock title="Структурное подразделение" name="devisionName" onChange={(e) => oCD(e)} info={allInfo.vanger} edit={props.edit}/>
                <InfoBlock title="Адрес подачи авто" name="carStartPoint_address" onChange={(e) => oCD(e)} info={allInfo.waypoints.points[0].address} edit={props.edit}/>
                {/*превести из unix time*/}
                <InfoBlock title="Подача авто" name="carStartPoint_dateTime" onChange={(e) => oCD(e)} dataTime={allInfo.time.beginDate} edit={props.edit}/>

                <InfoBlock title="Остановки" close={true} bool={fullPoint} setBool={setFullPoint} edit={props.edit}/>

                {
                    allInfo.waypoints.points.map((order, index) => (
                        <div key={index} style={fullPoint ? {display: "block"} : {display: "none"}}>
                            <div className={style.openInfo} data-section-id={"destination_" + index}>
                                <InfoBlock title="Адрес назначения авто" name="destinationPoint_address" dataSectionID={"dest_" + index} info={order.address} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "destinationPoints", props.setValFunc)}/>
                                {/*TODO: Тут надо не забыть поменять время*/}
                                <InfoBlock title="Прибытие авто" name="destinationPoint" dataSectionID={"dest_" + index} dataTime={1} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "destinationPoints", props.setValFunc)}/>
                                <InfoBlock title="Время ожидания" name="destinationPoint_waitingTime" dataSectionID={"dest_" + index} waiting={true} info={1} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "destinationPoints", props.setValFunc)}/>
                            </div>
                            {
                                index === allInfo.orders.length ? '' : <hr className={style.hr}/>
                            }
                        </div>))
                }

                <InfoBlock title="НЕТ ИНФЫ ПО ПАССАЖИРАМ" close={true} bool={fullPassenger} setBool={setFullPassenger} edit={props.edit}/>
                {/*{*/}
                {/*    allInfo.orders[0].order.passengers.map((passenger, index) => (*/}
                {/*        <div key={index} className={style.openInfo} data-section-id={"passenger_" + index}  style={fullPassenger ? {display: "block"} : {display: "none"}}>*/}
                {/*            <InfoBlock title="ФИО сотрудника" name="passengersInfo_fullName" dataSectionID={"passenger_" + index} info={passenger.fullName} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>*/}
                {/*            <InfoBlock title="Телефон для оповещения" name="passengersInfo_phoneNumber" dataSectionID={"passenger_" + index} phone={true} info={passenger.phoneNumber} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>*/}
                {/*            <InfoBlock title="Откуда едет" name="passengersInfo_fullName" dataSectionID={"passenger_" + index} info={from(index)} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>*/}
                {/*            <InfoBlock title="Куда едет" name="jkfjkdj" dataSectionID={"passenger_" + index} info={to(index)} noBorder={true} edit={props.edit}/>*/}
                {/*        </div>))*/}
                {/*}*/}


                <InfoBlock title="НЕТ ИНФЫ ПО ГРУЗУ" close={true} bool={fullCargo} setBool={setFullCargo} edit={props.edit}/>
                {/*{*/}
                {/*    allInfo.orders[0].order.cargo.map((cargo, index) => (*/}
                {/*    <div key={index} className={style.openInfo} data-section-id={"cargo_" + index}  style={fullCargo ? {display: "block"} : {display: "none"}}>*/}
                {/*    <InfoBlock title="Характер груза" name="cargo_volumeCargo" dataSectionID={"cargo_" + index} phone={true} info={cargo.nameCargo} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>*/}
                {/*    <InfoBlock title="Вес груза" name="cargo_weightCargo" dataSectionID={"cargo_" + index} info={cargo.weightCargo} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>*/}
                {/*    <InfoBlock title="Объём груза" name="cargo_volumeCargo" dataSectionID={"cargo_" + index} phone={true} info={cargo.volumeCargo} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>*/}
                {/*    <InfoBlock title="Откуда едет" name="passengersInfo_fullName" dataSectionID={"passenger_" + index} info={from(index)} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>*/}
                {/*    <InfoBlock title="Куда едет" name="jkfjkdj" dataSectionID={"passenger_" + index} info={to(index)} noBorder={true} edit={props.edit}/>*/}
                {/*    </div>))*/}
                {/*}*/}


            </div>

            <div className={style.infoBlock} style={props.openInfo ? {display: "none"} : {display: "block"}}>
                <InfoBlock title="Тип перевозки" onChange={(e) => oCD(e)} name="cargoWeight" info={"Пока нет"}/>
                <InfoBlock title="Номер автомобиля" onChange={(e) => oCD(e)} name="cargoWeight" info={"Пока нет"}/>
                <InfoBlock title="Грузоподъемность" onChange={(e) => oCD(e)} name="cargoWeight" info={"Пока нет"}/>
                <InfoBlock title="Количество посадочных мест" onChange={(e) => oCD(e)} name="cargoWeight" info={"Пока нет"}/>

                <InfoBlock title="ФИО водителя" onChange={(e) => oCD(e)} name="cargoWeight" info={"Пока нет"} edit={props.edit}/>
                <InfoBlock title="Номер телефона" onChange={(e) => oCD(e)} name="cargoWeight" info={"Пока нет"} edit={props.edit}/>
                <InfoBlock title="Почта водителя" onChange={(e) => oCD(e)} name="cargoWeight" info={"Пока нет"} edit={props.edit}/>
                <InfoBlock title="Комментарий" onChange={(e) => oCD(e)} name="comment" info={allInfo.orders[0].cargo.description} edit={props.edit}/>
            </div>
        </>
    )
}