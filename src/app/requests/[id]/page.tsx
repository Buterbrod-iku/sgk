'use client'

import style from './openRequest.module.scss'
import NewPath from "@/app/requests/[id]/newPath/newPath";
import InfoBlock from "@/app/requests/[id]/infoBlock/infoBlock";
import {use, useEffect, useState} from "react";
import MainInfoRequest from "@/app/requests/[id]/mainInfoRequest/mainInfoRequest";
import InputEdit from "@/app/requests/[id]/inputEdit/inputEdit";
import RoutePoint from "@/app/requests/[id]/routePoint/routePoint";
import ModalConfirm from "@/app/requests/[id]/modalConfirm/modalConfirm";
import axios, {all} from "axios";
import {useParams, usePathname, useRouter} from "next/navigation";
import {useFetching} from "@/app/hooks/useFetching";
import PostService from "@/app/API/postService";
import Loading from "@/app/requests/loading/loading";
import {Change} from "@/app/requests/[id]/change/change";


const ReversRoutePoint = (request) => {
    let result = request.orders[0].route.loadingAddress.address

    request.orders.map(item => (
        result += ' - ' + item.route.unloadingAddress.address
    ))

    return result
}

const findNewPath = async (allRoutes, newPath, setNewPath ,routerId) => {
    if(allRoutes.length > 1){
         await allRoutes.map(item => {
            if((item.route._id !== routerId) && (item.route.status !== 'merged') && (item.route.status !== 'built')){
                console.log(newPath)
                setNewPath((res) => [
                    ...res,
                    {
                        routeId: item.route._id,
                        path: ReversRoutePoint(item)
                    }
                ])
            }
        })
    }
}

export default function OpenRequest (props) {
    const router = useParams()
    let routerId = router.id

    useEffect(() => {
        // тк мы можем посмотреть подходящую заявку, при нажатии на кнопку
        // в newPath пропсом в этот компонент передаётся id если пропс есть, то он прогонит его
        if(props.pathId){
            routerId = props.pathId
            fetchPostById(routerId)
        } else {
            fetchPostById(routerId)
        }
    }, [])

    // стэйт для основной заявки, которая будет выводиться
    const [newRequest, setPost] = useState({})

    // ответ с сервера (приходит массив). Первый объект - сама заявка, остальные - похожие
    const [allRoutes, setAllRoutes] = useState([])

    // массив похожих заявок. Тут будет только id и маршрут
    const [newPath, setNewPath] = useState([])
    const [title, setTitle] = useState('')
    // хук для запроса на сервер
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)

        setAllRoutes(response.data)

        response.data.map(item => {
            if(item.route._id === routerId){
                setPost(item)
            }
        })
    })


    useEffect(() => {
        // если есть похожие заявки, то проходим по ним и достаём id и маршрут
        findNewPath(allRoutes, newPath, setNewPath ,routerId)

    }, [allRoutes])

    useEffect(() => {
        const renameTitle = async () => {
            await setTitle(ReversRoutePoint(newRequest))
        }
        renameTitle()
    }, [newRequest])

    // хз почему, но после запроса может случится такое, что в массиве orders будет null последним элементом
    // в постмене такого нет, но когда получем объект, то он появляется.
    // если null есть, то удаляем его
    newRequest.orders?.map((item, index) => item === null ? delete newRequest.orders[index] : '')

    const [openInfo, setOpenInfo] = useState(true);
    const [map, setMap] = useState(true);
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
            console.log("Data Save Object: ", {a: 1, b: 2, c: 3});
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
                isLoading
                    ? (<Loading style={{width: '80vw', height: '80vh'}}/>)
                    :
                    (<>
                        {
                            confirm ? <ModalConfirm setConfirm={openConfirm} routeId={newRequest?.route?._id} orders={newRequest?.route?.route.orders}/> : ""
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
                                        <button onClick={swichInfo} disabled={!openInfo} style={openInfo ? {backgroundColor: "#ececec", color: "black"} : {backgroundColor: "rgb(0, 120, 168)", color: "white"}}>Груз</button>
                                    </div>

                                    <MainInfoRequest setValFunc={setValues} values={values} edit={edit} openInfo={openInfo} allInfo={newRequest}/>
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
                                            newRequest?.orders?.map((item, index) => (
                                                <RoutePoint key={index} point={item.route.unloadingAddress.address}/>
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
                                                    <button onClick={startEdit} className={style.editRequestButton} style={{background: "#3ea19d"}}>Изменить заявку</button>
                                                )
                                        }
                                    </div>)
                            }


                            {
                                newRequest?.route?.isSingle ?
                                    ""
                                    :
                                    props.newPath ? "" : (
                                        <div className={style.newPath}>
                                            <div className={style.absolutTitle}>
                                                <p>Доступные маршруты</p>
                                            </div>
                                            {
                                                // TODO: если доступных маршрутов нет, то надо вывести надпись
                                                newPath
                                                    ? newPath.map(item => (
                                                        <NewPath key={item.routeId} title={item.path} routeId={item.routeId} mainRouteId={routerId}/>
                                                    ))
                                                    : ''

                                            }
                                        </div>)
                            }

                        </div>
                    </>)
            }
        </div>
    )
}

