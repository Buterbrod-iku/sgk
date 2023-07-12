'use client'

import style from './openRequest.module.scss'
import NewPath from "@/app/openRequest/newPath/newPath";
import InfoBlock from "@/app/openRequest/infoBlock/infoBlock";
import {useState} from "react";
import RoutePoint from "@/app/openRequest/routePoint/routePoint";

let state = {
    data: "10.10.2023",
    time: "15:15"
}

export default function OpenRequest() {
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
        <div className={style.main}>
            <div className={style.block}>
                <h4 className={style.title}>Барнул - Новосибирск</h4>

                <div className={style.posInfo}>
                    <div className={style.info}>
                        <div className={style.buttonBlock}>
                            <button onClick={swichInfo} disabled={openInfo} style={openInfo ? {backgroundColor: "rgb(0, 120, 168)", color: "white"} : {backgroundColor: "#ececec", color: "black"}}>Основное</button>
                            <button onClick={swichInfo} disabled={!openInfo} style={openInfo ? {backgroundColor: "#ececec", color: "black"} : {backgroundColor: "rgb(0, 120, 168)", color: "white"}}>Груз</button>
                        </div>

                        <div className={style.infoBlock} style={openInfo ? {display: "block"} : {display: "none"}}>
                            <InfoBlock title="Структурное подразделение" info="ТКТКТКТКТК"/>
                            <InfoBlock title="Структурное подразделение" info="ТКТКТКТКТК"/>
                            <InfoBlock title="Подача авто" dataTime={state}/>
                        </div>

                        <div className={style.infoBlock} style={openInfo ? {display: "none"} : {display: "block"}}>
                            <InfoBlock title="Структурное подразделение" info="ТКТКТКТКТК"/>
                            <InfoBlock title="Подача авто" dataTime={state}/>
                            <InfoBlock title="Подача авто" dataTime={state}/>
                            <InfoBlock title="Подача авто" dataTime={state}/>
                        </div>
                    </div>

                    <div className={style.path}>
                        <div className={style.buttonBlock}>
                            <button onClick={swichMap} disabled={map} style={map ? {backgroundColor: "rgb(0, 120, 168)", color: "white"} : {backgroundColor: "#ececec", color: "black"}}>Карта</button>
                            <button onClick={swichMap} disabled={!map} style={map ? {backgroundColor: "#ececec", color: "black"} : {backgroundColor: "rgb(0, 120, 168)", color: "white"}}>Маршрут</button>
                        </div>

                        <div className={style.map} style={map ? {display: "block"} : {display: "none"}}>
                            <div className={style.mapBlock}></div>
                        </div>

                        <div className={style.route} style={map ? {display: "none"} : {display: "block"}}>
                            <RoutePoint point="Барнаул" />
                            <RoutePoint point="Барнаул" />
                            <RoutePoint point="Новосибирск" />
                            <RoutePoint point="Новосибирск" />
                        </div>
                    </div>
                </div>

                <div className={style.newPath}>
                    <div className={style.absolutTitle}>
                        <p>Доступные маршруты</p>
                    </div>
                    <NewPath title="Барнуал-Бийск"/>
                    <NewPath title="Барнуал-Бийск"/>
                    <NewPath title="Барнуал-Бийск"/>
                    <NewPath title="Барнуал-Бийск"/>
                </div>
            </div>
        </div>
    )
}