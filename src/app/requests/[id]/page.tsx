'use client'

import style from './openRequest.module.scss'
import NewPath from "@/app/requests/[id]/newPath/newPath";
import InfoBlock from "@/app/requests/[id]/infoBlock/infoBlock";
import {useEffect, useState} from "react";
import MainInfoRequest from "@/app/requests/[id]/mainInfoRequest/mainInfoRequest";
import InputEdit from "@/app/requests/[id]/inputEdit/inputEdit";
import RoutePoint from "@/app/requests/[id]/routePoint/routePoint";
import ModalConfirm from "@/app/requests/[id]/modalConfirm/modalConfirm";
import axios from "axios";
import {usePathname} from "next/navigation";

const ReversRoutePoint = (request) => {
    let result = request.orders[0].route.loadingAddress.address

    request.orders.map(item => (
        result += ' - ' + item.route.unloadingAddress.address
    ))

    return result
}

export default function OpenRequest(props) {

    const router = usePathname()
    let fullURL = router.split('/')
    let routeId = fullURL[fullURL.length - 1]

    const [request, setRequest] = useState()

    useEffect(() => {
        axios('http://localhost:5000/routes/complex/652285b5051487ef3ceaf652').then(res => setRequest(res.data[0]))
    }, [setRequest])

    console.log(request)


    const [openInfo, setOpenInfo] = useState(true);
    const [map, setMap] = useState(true);
    const [edit, setEdit] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const openConfirm = (e) => {
        e.preventDefault()
        setConfirm(!confirm)
    }

    const startEdit = (e) => {
        e.preventDefault()
        setEdit(!edit)
    }

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
            {
                confirm ? <ModalConfirm setConfirm={openConfirm}/> : ""
            }
            <div className={style.block} style={props.addStyle}>
                <button onClick={openConfirm} className={style.cancelButton}>Отменить заявку</button>

                {/*надо пофиксить при просмотре предложенных заявок. Роутинг*/}
                <h4 className={style.title}>
                    {newRequest.route.isSingle ? (<div className={style.locked}></div>) : ''}

                    {ReversRoutePoint(newRequest)}
                </h4>

                {
                    props.close ? <p onClick={props.fun} className={style.close}>+</p> : ""
                }

                <div className={style.posInfo}>
                    <div className={style.info}>
                        <div className={style.buttonBlock}>
                            <button onClick={swichInfo} disabled={openInfo} style={openInfo ? {backgroundColor: "rgb(0, 120, 168)", color: "white"} : {backgroundColor: "#ececec", color: "black"}}>Основное</button>
                            <button onClick={swichInfo} disabled={!openInfo} style={openInfo ? {backgroundColor: "#ececec", color: "black"} : {backgroundColor: "rgb(0, 120, 168)", color: "white"}}>Груз</button>
                        </div>

                        <MainInfoRequest edit={edit} openInfo={openInfo} allInfo={newRequest}/>
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
                            {/*промежуточные точки*/}
                            <RoutePoint point={newRequest.orders[0].route.loadingAddress.address}/>
                            {
                                newRequest.orders.map((item, index) => (
                                    <RoutePoint key={index} point={item.route.unloadingAddress.address}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
                {
                    props.buttonEdit ? "" : (
                        <div className={style.editRequestPosition}>
                            <button onClick={startEdit} className={style.editRequestButton} style={edit ? {backgroundColor: "#f8fa13"} : {backgroundColor: "#f6ebae"}}>{edit ? "Сохранить" : "Изменить заявку"}</button>
                        </div>)
                }


                {
                    newRequest.route.isSingle ?
                        ""
                        :
                        props.newPath ? "" : (
                        <div className={style.newPath}>
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

let newRequest =
    {
        "route": {
            "route": {
                "orders": [
                    "652295d9be2edcb754beeaa5"
                ],
                "boxes": [
                    "0c5Cp7vM",
                    "0c5YD.N0",
                    "0c6aM53m",
                    "0c6cbErf",
                    "0c6rWJxE",
                    "0c95k3eL",
                    "0c954OGE"
                ]
            },
            "car": {
                "tsNumber": "a123bc",
                "specialMarks": "Lada Vesta",
                "driver": "Ivanov Ivan Ivanovich",
                "loadCapacity": 510,
                "numberOfSeats": 4
            },
            "_id": "652295dabe2edcb754beeaae",
            "date": 1696723202,
            "isSingle": false,
            "cargoInRoute": 100,
            "passengersInRoute": 3,
            "comment": "что-то написано",
            "__v": 0
        },
        "orders": [
            {
                "date": {
                    "createdAt": 1696765401.903,
                    "loadingTime": 1696723202,
                    "unloadingTime": 1696282080,
                    "loadingWaiting": 20,
                    "unloadingWaiting": 65
                },
                "route": {
                    "loadingAddress": {
                        "address": "Бердск",
                        "latitude": "54.8464",
                        "longitude": "83.0646"
                    },
                    "unloadingAddress": {
                        "address": "Тальменка",
                        "latitude": "53.943",
                        "longitude": "83.436"
                    }
                },
                "order": {
                    "typeOfTransportation": "all",
                    "devisionName": "qweqweqweqwe",
                    "client": "Сотрудник Петров",
                    "passengers": [
                        {
                            "fullName": "Мелков Илья",
                            "phoneNumber": "+79095079956",
                            "_id": "65228aacc5818d554bda38a9"
                        },
                        {
                            "fullName": "Никита",
                            "phoneNumber": "+72322322165",
                            "_id": "65228aacc5818d554bda38aa"
                        },
                        {
                            "fullName": "Антон",
                            "phoneNumber": "+72222222222",
                            "_id": "65228aacc5818d554bda38ab"
                        }
                    ]
                },
                "_id": "652295d9be2edcb754beeaa5",
                "__v": 0
            }
        ]
    }
