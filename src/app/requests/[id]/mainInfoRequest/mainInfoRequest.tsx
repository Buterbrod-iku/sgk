'use client'

import style from "./mainInfoRequest.module.scss";
import InfoBlock from "@/app/requests/[id]/infoBlock/infoBlock";
import {useState} from "react";

export default function MainInfoRequest(props) {
    const [fullPassenger, setFullPassenger] = useState(false);
    const [fullPoint, setFullPoint] = useState(false);

    return (
        <>
            <div className={style.infoBlock} style={props.openInfo ? {display: "block"} : {display: "none"}}>
                <InfoBlock title="Структурное подразделение" info={props.allInfo.orders[0].order.devisionName}/>
                <InfoBlock title="Адрес подачи авто" info={props.allInfo.orders[0].route.loadingAddress.address}/>
                {/*превести из unix time*/}
                <InfoBlock title="Подача авто" dataTime={props.allInfo.orders[0].date.loadingTime}/>

                <InfoBlock title="Остановки" close={true} bool={fullPoint} setBool={setFullPoint}/>

                {
                    fullPoint ? props.allInfo.orders.map((order, index) => (
                        <div key={index} className={style.openInfo}>
                            <InfoBlock title="Адрес назначения авто" info={order.route.unloadingAddress.address} noBorder={true}/>
                            <InfoBlock title="Прибытие авто" dataTime={order.date.unloadingTime} noBorder={true}/>
                            <InfoBlock title="Время ожидания" waiting={true} info={order.date.unloadingWaiting} noBorder={true}/>
                        </div>)) : ''
                }

                <InfoBlock title="Пассажиры" close={true} bool={fullPassenger} setBool={setFullPassenger}/>
                {
                    fullPassenger ? props.allInfo.orders[0].order.passengers.map((passenger, index) => (
                        <div key={index} className={style.openInfo}>
                            <InfoBlock title="ФИО сотрудника" info={passenger.fullName} noBorder={true}/>
                            <InfoBlock title="Телефон для оповещения" info={passenger.phoneNumber} noBorder={true}/>
                            {/*{index+1 !== props.allInfo.passengersInfo.length ? <hr className={style.hr}/> : ''}*/}
                        </div>)) : ''
                }

            </div>

            <div className={style.infoBlock} style={props.openInfo ? {display: "none"} : {display: "block"}}>
                <InfoBlock title="Общий объём багажа" info={props.allInfo.route.cargoInRoute}/>
                <InfoBlock title="Количество человек" info={props.allInfo.route.passengersInRoute}/>
                <InfoBlock title="Комментарий" info={props.allInfo.route.comment}/>
            </div>
        </>
    )
}