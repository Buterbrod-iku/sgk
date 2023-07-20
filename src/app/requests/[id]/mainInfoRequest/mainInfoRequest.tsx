'use client'

import style from "./mainInfoRequest.module.scss";
import InfoBlock from "@/app/requests/[id]/infoBlock/infoBlock";
import {useState} from "react";

const formatTime = (time) => {
    let result = "";
    if (time.length === 4){
        result = time[0] + time[1] + ":" + time[2] + time[3]
    }

    return result;
}

export default function MainInfoRequest(props) {
    // поправить
    const [fullPassenger, setFullPassenger] = useState(false);
    const [fullPoint, setFullPoint] = useState(false);

    let time = formatTime(props.allInfo.destinationPoints[0].waiting);

    return (
        <>
            <div className={style.infoBlock} style={props.openInfo ? {display: "block"} : {display: "none"}}>
                <InfoBlock title="Структурное подразделение" info={props.allInfo.devisionName}/>
                <InfoBlock title="Адрес подачи авто" info={props.allInfo.carStartPoint.address}/>
                <InfoBlock title="Подача авто" dataTime={props.allInfo.carStartPoint.startDateTime}/>

                <InfoBlock title="Остановки" close={true} bool={fullPoint} setBool={setFullPoint}/>

                {
                    fullPoint ? props.allInfo.destinationPoints.map((point) => (
                        <div>
                            <InfoBlock title="Адрес назначения авто" info={point.address} noBorder={true}/>
                            <InfoBlock title="Прибытие авто" dataTime={point.endDateTime} noBorder={true}/>
                            <InfoBlock title="Время ожидания" info={point.waiting} noBorder={true}/>
                            <hr className={style.hr}/>
                        </div>)) : ''
                }

                <InfoBlock title="Пассажиры" close={true} bool={fullPassenger} setBool={setFullPassenger}/>
                {
                    fullPassenger ? props.allInfo.passengersInfo.map((passenger, index) => (
                        <div>
                            <InfoBlock title="ФИО сотрудника" info={passenger.fullname} noBorder={true}/>
                            <InfoBlock title="Телефон для оповещения" info={passenger.phoneNumber} noBorder={true}/>
                            {index+1 !== props.allInfo.passengersInfo.length ? <hr className={style.hr}/> : ''}
                        </div>)) : ''
                }

            </div>

            <div className={style.infoBlock} style={props.openInfo ? {display: "none"} : {display: "block"}}>
                <InfoBlock title="Общий объём багажа" info={props.allInfo.cargoWeight}/>
                <InfoBlock title="Количество человек" info={props.allInfo.passengersAmount}/>
                <InfoBlock title="Комментарий" info={props.allInfo.comment}/>
            </div>
        </>
    )
}