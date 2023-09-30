'use client'

import style from './openRequest.module.scss'
import NewPath from "@/app/requests/[id]/newPath/newPath";
import InfoBlock from "@/app/requests/[id]/infoBlock/infoBlock";
import {useState} from "react";
import RoutePoint from "@/app/requests/[id]/routePoint/routePoint";
import { useRouter, useSearchParams } from 'next/navigation';
import MainInfoRequest from "@/app/requests/[id]/mainInfoRequest/mainInfoRequest";

export default function OpenRequest(props) {
    const [openInfo, setOpenInfo] = useState(true);
    const [map, setMap] = useState(true);


    const swichInfo = (e) => {
        e.preventDefault()
        setOpenInfo(!openInfo);
    }
    const swichMap = (e) => {
        e.preventDefault()
        setMap(!map);
    }

    return (
        <div className={style.main} style={props.style}>

            <div className={style.block} style={props.addStyle}>
                <div style={{position: "absolute", right: '5px', top: '5px', width: "20px", height: '20px', background: 'red', zIndex: "99"}}></div>
                {/*надо пофиксить при просмотре предложенных заявок. Роутинг*/}
                <h4 className={style.title}>Барнаул - Новосибирск (id = {props.params?.id})</h4>

                {
                    props.close ? <p onClick={props.fun} className={style.close}>+</p> : ""
                }

                <div className={style.posInfo}>
                    <div className={style.info}>
                        <div className={style.buttonBlock}>
                            <button onClick={swichInfo} disabled={openInfo} style={openInfo ? {backgroundColor: "rgb(0, 120, 168)", color: "white"} : {backgroundColor: "#ececec", color: "black"}}>Основное</button>
                            <button onClick={swichInfo} disabled={!openInfo} style={openInfo ? {backgroundColor: "#ececec", color: "black"} : {backgroundColor: "rgb(0, 120, 168)", color: "white"}}>Груз</button>
                        </div>

                        <MainInfoRequest openInfo={openInfo} allInfo={newRequest}/>
                    </div>

                    <div className={style.path}>
                        <div className={style.buttonBlock}>
                            <button onClick={swichMap} disabled={map} style={map ? {backgroundColor: "rgb(0, 120, 168)", color: "white"} : {backgroundColor: "#ececec", color: "black"}}>Карта</button>
                            <button onClick={swichMap} disabled={!map} style={map ? {backgroundColor: "#ececec", color: "black"} : {backgroundColor: "rgb(0, 120, 168)", color: "white"}}>Маршрут</button>
                        </div>

                        <div className={style.map} style={map ? {display: "block"} : {display: "none"}}>
                            <div className={style.mapBlock}>
                                <iframe className={style.mapFrame} src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1196030.6502760502!2d82.12100431823762!3d54.16241036132776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x42dfe5e190cc4d97%3A0x9b3a0673e1d3e985!2z0J3QvtCy0L7RgdC40LHQuNGA0YHQuiwg0KDQvtGB0YHQuNGP!3m2!1d54.983269299999996!2d82.8963831!4m5!1s0x42dda1e8c72eeeab%3A0xb0e7bbef8d87b503!2z0JHQsNGA0L3QsNGD0LssINCQ0LvRgtCw0LnRgdC60LjQuSDQutGA0LDQuSwg0KDQvtGB0YHQuNGP!3m2!1d53.3497499!2d83.78357369999999!5e0!3m2!1sru!2suk!4v1689234669026!5m2!1sru!2suk" width="600" height="450" loading="lazy"></iframe>
                            </div>
                        </div>

                        <div className={style.route} style={map ? {display: "none"} : {display: "block"}}>
                            <RoutePoint point="Барнаул" />
                            <RoutePoint point="Барнаул" />
                            <RoutePoint point="Новосибирск" />
                            <RoutePoint point="Новосибирск" />
                        </div>
                    </div>
                </div>

                {
                    props.newPath ? "" : (<div className={style.newPath}>
                        <div className={style.absolutTitle}>
                            <p>Доступные маршруты</p>
                        </div>
                        <NewPath title="Барнаул-Бийск"/>
                        <NewPath title="Барнаул-Бийск"/>
                        <NewPath title="Барнаул-Бийск"/>
                        <NewPath title="Барнаул-Бийск"/>
                    </div>)
                }

            </div>
        </div>
    )
}

let newRequest = {
    devisionName: "Подразделение 1",
    isPrivate: false,
    carStartPoint: {
        address: "656062, г. Барнаул, ул. Шукшина д. 15",
        startDateTime: {
            data: "10.10.2023",
            time: "15:15"
        },
        waiting: "2332"
    },
    destinationPoints: [
        {
            id: 0,
            address: "656062, г. Барнаул, ул. Шукшина д. 15",
            endDateTime: {
                data: "10.10.2023",
                time: "15:15"
            },
            waiting: "2345"
        },
        {
            id: 0,
            address: "656062, г. Барнаул, ул. Шукшина д. 15",
            endDateTime: {
                data: "10.10.2023",
                time: "15:15"
            },
            waiting: "2345"
        },
        {
            id: 0,
            address: "656062, г. Барнаул, ул. Шукшина д. 15",
            endDateTime: {
                data: "10.10.2023",
                time: "15:15"
            },
            waiting: "2345"
        },
    ],
    passengersInfo: [
        {
            id: 1,
            fullname: "Шипугин Никита Олегович",
            phoneNumber: "+7 999 999 99 99"
        },
        {
            id: 2,
            fullname: "Шипугин Никита Олегович",
            phoneNumber: "+7 999 999 99 99"
        },
        {
            id: 3,
            fullname: "Шипугин Никита Олегович",
            phoneNumber: "+7 999 999 99 99"
        },
    ],
    cargoWeight: 1555,
    passengersAmount: 3,
    comment: " dolore doloribus eligendi error esse et harum illo ipsam laborum magni, maiores minus modi mollitia officia pariatur porro quis quod quos repellat repudiandae similique sit soluta suscipit totam ut vel vitae voluptate voluptatem. Adipisci culpa earum, ex explicabo harum ipsa nostrum odio perspiciatis saepe suscipit."
}