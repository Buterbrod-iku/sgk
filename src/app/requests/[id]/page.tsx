'use client'

import style from './openRequest.module.scss'
import NewPath from "@/app/requests/[id]/newPath/newPath";
import {useEffect, useState} from "react";
import MainInfoRequest from "@/app/requests/[id]/mainInfoRequest/mainInfoRequest";
import RoutePoint from "@/app/requests/[id]/routePoint/routePoint";
import ModalConfirm from "@/app/requests/[id]/modalConfirm/modalConfirm";
import {useParams, usePathname, useRouter} from "next/navigation";
import {useFetching} from "@/components/utils/hooks/useFetching";
import PostService from "@/app/API/postService";
import Loading from "@/app/requests/loading/loading";
import {Change} from "@/app/requests/[id]/change/change";
import {testRequest, testRequestMerged} from "@/app/requests/[id]/test";
import trash from '../../../assets/images/mdi_trash.svg'
import {ReversRoutePoint} from "@/components/utils/refactorUtil/ReversRoutePoint";
import NoneRequests from "@/components/utils/refactorUtil/NoneRequests/NoneRequests";

export default function OpenRequest (props) {
    // стэйт для основной заявки, которая будет выводиться
    let [newRequest, setPost] = useState({})

    // хук для запроса на сервер
    const [fetchRouteById, isLoadingRouteById, errorPostById] = useFetching(async (id) => {
        const response = await PostService.getById(id)

        setPost(response)
    })
    const [fetchOrderById, isLoadingOrderById, errorOrderById] = useFetching(async (id) => {
        const response = await PostService.getByIdOrder(id)

        setPost(response)
    })


    const router = useParams()
    let routerId = router.id

    useEffect(() => {
        // тк мы можем посмотреть подходящую заявку, при нажатии на кнопку
        // в newPath пропсом в этот компонент передаётся id если пропс есть, то он прогонит его
        fetchRouteById(routerId)

        if(props.route){
            if(props.pathId){
                routerId = props.pathId
                fetchRouteById(routerId)
            }
            else {
                fetchRouteById(routerId)
            }
        } else {
            if(props.pathId){
                routerId = props.pathId
                fetchOrderById(routerId)
            }
            else {
                fetchOrderById(routerId)
            }
        }
        fetchNewPath(routerId)
        console.log("newPath")
        console.log("newPath")

        console.log(newPath)
        console.log(newRequest)
    }, [])

    // массив похожих заявок. Тут будет только id и маршрут
    const [newPath, setNewPath] = useState([])

    const [fetchNewPath, isLoadingNewPath, errorNewPath] = useFetching(async (id) => {
        const response = await PostService.getNewPath(id)

        setNewPath(response)
    })

    const [title, setTitle] = useState('')

    useEffect(() => {
        const renameTitle = async () => {
            await setTitle(ReversRoutePoint(newRequest))
        }
        renameTitle()
    }, [newRequest])

    const [openInfo, setOpenInfo] = useState(true);
    const [map, setMap] = useState(false);
    const [edit, setEdit] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const [values, setValues] = useState({
        destinationPoints: {},
        passengersInfo: {},
    });

    const openConfirm = (e) => {
        e.preventDefault()
        setConfirm(!confirm)
    }

    let object = Object.assign(newRequest)

    const startEdit = (e) => {
        e.preventDefault()
        setEdit(!edit)
        if (edit) {
            //console.log("Data Save Object: ", {a: 1, b: 2, c: 3});
        }
    }

    let link = useRouter()

    const createEdit = async (e) => {
        e.preventDefault()

        const response = await PostService.switchRoute(routerId, Change(values, object))

        await link.push(`/requests/${response.data.route._id}`)

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
                isLoadingRouteById
                    ? (<Loading style={{width: '80vw', height: '80vh'}}/>)
                    :
                    (<>
                        {
                            confirm ? <ModalConfirm setConfirm={openConfirm} routeId={newRequest.id} orders={newRequest.orders}/> : ""
                        }
                        <div className={style.block} style={props.addStyle}>
                            {
                                !props.buttonEdit
                                    ? (<button onClick={openConfirm} className={style.cancelButton}>
                                        <img src={trash.src} style={{
                                            width: '30px'
                                        }}/>
                                    </button>)
                                    : ''
                            }


                            {/*надо пофиксить при просмотре предложенных заявок. Роутинг*/}
                            <h4 className={style.title}>
                                {newRequest.orders?.isSingle ? (<div className={style.locked}></div>) : ''}

                                {
                                    title.length > 90
                                        ? title.slice(0, 90) + '...'
                                        : title
                                }
                            </h4>

                            {
                                props.close ? <p onClick={props.fun} className={style.close}>+</p> : ""
                            }

                            <div className={style.posInfo}>
                                <div className={style.info}>
                                    <div className={style.buttonBlock}>
                                        <button onClick={swichInfo} disabled={openInfo} style={openInfo ? {backgroundColor: "rgb(0, 120, 168)", color: "white"} : {backgroundColor: "#ececec", color: "black"}}>Основное</button>
                                        <button onClick={swichInfo} disabled={!openInfo} style={openInfo ? {backgroundColor: "#ececec", color: "black"} : {backgroundColor: "rgb(0, 120, 168)", color: "white"}}>Перевозчик</button>
                                    </div>

                                    <MainInfoRequest setValFunc={setValues} values={values} edit={edit} openInfo={openInfo} allInfo={newRequest}/>
                                </div>

                                <div className={style.path}>
                                    <div className={style.buttonBlock}>
                                        <button onClick={swichMap} disabled={!map} style={map ? {backgroundColor: "#ececec", color: "black"} : {backgroundColor: "rgb(0, 120, 168)", color: "white"}}>Маршрут</button>
                                        <button onClick={swichMap} disabled={map} style={map ? {backgroundColor: "rgb(0, 120, 168)", color: "white"} : {backgroundColor: "#ececec", color: "black"}}>Карта</button>
                                    </div>

                                    <div className={style.map} style={map ? {display: "block"} : {display: "none"}}>
                                        <div className={style.mapBlock}>
                                            {/*<iframe className={style.mapFrame} src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1196030.6502760502!2d82.12100431823762!3d54.16241036132776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x42dfe5e190cc4d97%3A0x9b3a0673e1d3e985!2z0J3QvtCy0L7RgdC40LHQuNGA0YHQuiwg0KDQvtGB0YHQuNGP!3m2!1d54.983269299999996!2d82.8963831!4m5!1s0x42dda1e8c72eeeab%3A0xb0e7bbef8d87b503!2z0JHQsNGA0L3QsNGD0LssINCQ0LvRgtCw0LnRgdC60LjQuSDQutGA0LDQuSwg0KDQvtGB0YHQuNGP!3m2!1d53.3497499!2d83.78357369999999!5e0!3m2!1sru!2suk!4v1689234669026!5m2!1sru!2suk" width="600" height="450" loading="lazy"></iframe>*/}
                                            <Loading />
                                        </div>
                                    </div>

                                    <div className={style.route} style={map ? {display: "none"} : {display: "block"}}>
                                        {/*промежуточные точки*/}
                                        {
                                            newRequest.waypoints.points.map((item, index) => (
                                                <RoutePoint key={index} point={item.address}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            {
                                props.buttonEdit ? "" : (
                                    <div className={style.editRequestPosition}>

                                        {
                                            edit ? (
                                                    <>
                                                        <button onClick={createEdit} className={style.editRequestButton} style={{background: "#0b626c", marginLeft: "20px"}}>Сохранить</button>
                                                        <button onClick={startEdit} className={style.editRequestButton} style={{background: "#5b5757", marginLeft: "20px"}}>Отменa</button>
                                                    </>
                                                )
                                                : (
                                                    <button onClick={startEdit} className={style.editRequestButton} style={{background: "rgb(0, 120, 168)"}}>Изменить заявку</button>
                                                )
                                        }
                                    </div>)
                            }


                            {
                                newRequest.orders.isSingle ?
                                    ""
                                    :
                                    props.newPath ? "" : (
                                        <div className={style.newPath}>
                                            <div className={style.absolutTitle}>
                                                <p>Доступные маршруты</p>
                                            </div>
                                            {
                                                isLoadingNewPath ?
                                                    <Loading />
                                                    :
                                                    newPath.length > 0
                                                        ? newPath.map(item => (
                                                            <NewPath key={item.id} title={ReversRoutePoint(item.route)} routeId={item.id} mainRouteId={routerId}/>
                                                        ))
                                                        : (<NoneRequests />)
                                            }
                                        </div>)
                            }

                        </div>
                    </>)
            }
        </div>
    )
}

