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
import {useParams, usePathname} from "next/navigation";
import {useFetching} from "@/app/hooks/useFetching";
import PostService from "@/app/API/postService";
import Loading from "@/app/requests/loading/loading";

const ReversRoutePoint = (request) => {
    let result = request.orders[0].route.loadingAddress.address

    request.orders.map(item => (
        result += ' - ' + item.route.unloadingAddress.address
    ))

    return result
}


export default function OpenRequest (props) {
    const router = useParams()
    const routerId = router.id
    const [newRequest, setPost] = useState({})

    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data[0])
    })

    useEffect(() => {
        fetchPostById(routerId)
    }, [])

    newRequest.orders?.map((item, index) => item === null ? delete newRequest.orders[index] : '')

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
                isLoading
                    ? (<Loading style={{width: '80vw', height: '80vh'}}/>)
                    :
                    (<>
                        {
                            confirm ? <ModalConfirm setConfirm={openConfirm}/> : ""
                        }
                        <div className={style.block} style={props.addStyle}>
                            {
                                !props.buttonEdit
                                    ? (<button onClick={openConfirm} className={style.cancelButton}>Отменить заявку</button>)
                                    : ''
                            }


                            {/*надо пофиксить при просмотре предложенных заявок. Роутинг*/}
                            <h4 className={style.title}>
                                {newRequest?.route?.isSingle ? (<div className={style.locked}></div>) : ''}

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
                                        <RoutePoint point={newRequest?.orders[0].route.loadingAddress.address}/>
                                        {
                                            newRequest?.orders.map((item, index) => (
                                                <RoutePoint key={index} point={item.route.unloadingAddress.address}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            {
                                props.buttonEdit ? "" : (
                                    <div className={style.editRequestPosition}>
                                        <button onClick={startEdit} className={style.editRequestButton} style={edit ? {background: "#0b626c"} : {background: "#3ea19d"}}>{edit ? "Сохранить" : "Изменить заявку"}</button>
                                    </div>)
                            }


                            {
                                newRequest?.route.isSingle ?
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
                    </>)
            }
        </div>
    )
}

